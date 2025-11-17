import type { DurationObjectUnits, DurationUnits } from 'luxon';
import { DateTime, Duration, IANAZone, Settings } from 'luxon';

// import { Nullable } from '@/types/utils';
// import { DateTimeInput, LocalizationOptions, localizationOptionsWithUnit } from './types';

/** 지역, 타임존 옵션 */
export type LocalizationOptions = {
  zoneName?: string;
  locale?: string;
};

/** 지역, 타임존, duration unit  */
export interface localizationOptionsWithUnit extends LocalizationOptions {
  unit?: DurationUnits;
}

/** DateTime 객체로 변환 허용 타입 */
export type DateTimeInput = string | Date | DateTime;

/**
 * Nullable 타입: T | null 유니온 타입입니다.
 * 제네릭 타입 T에 대해 T 또는 null을 포함하는 유니온 타입을 생성합니다.
 */
export type Nullable<T> = T | null;

/**
 * 날짜 제어 유틸리티 클래스입니다.
 * 이 클래스는 싱글톤 패턴을 사용하며, `DateUtil.getInstance()`를 통해 인스턴스에 접근할 수 있습니다.
 */
export class DateUtil {
  /** 싱글톤 인스턴스 저장 */
  // eslint-disable-next-line no-use-before-define
  private static instance: DateUtil;

  /**
   * 생성자 함수입니다.
   * 이 생성자 함수는 기본 locale, ZoneName 을 설정하며,
   * 설정된 값은 각 메서드의 옵션 값으로 locale, zoneName이 전달되지 않은 경우 기본값으로 사용됩니다.
   * @returns {DateUtil} DateUtil 인스턴스
   */
  private constructor() {
    if (DateUtil.instance) {
      return DateUtil.instance;
    }
    this.defaultLocale = 'ko-KR';
    this.defaultZoneName = 'Asia/Seoul';
    DateUtil.instance = this;
  }

  /** 기본 locale */
  public get defaultLocale(): string {
    return Settings.defaultLocale;
  }

  /**
   * 기본 locale 설정
   * @param {string} locale - 언어코드
   */
  public set defaultLocale(locale: string) {
    Settings.defaultLocale = locale;
  }

  /** 기본 ZoneName */
  public get defaultZoneName(): string {
    return Settings.defaultZone.name;
  }

  /**
   * 기본 ZoneName 설정
   * @param {string} zoneName - IANA 타임존 이름
   */
  public set defaultZoneName(zoneName: string) {
    this.validateTimeZone(zoneName);

    Settings.defaultZone = zoneName;
  }

  /**
   * 유효한 IANA 타임존인지 확인합니다.
   * @param {string} zoneName - 확인할 IANA 타임존 이름
   * @throws {Error} 유효하지 않은 IANA 타임존인 경우 예외를 발생시킵니다.
   */
  public validateTimeZone = (zoneName: string): void => {
    if (!IANAZone.isValidZone(zoneName)) {
      throw new Error(`${zoneName} is an invalid IANA time zone.`);
    }
  };

  /**
   * 입력 받은 날짜 정보를 DateTime 객체로 변환합니다.
   * @param {DateTimeInput} inputDate - DateTime 객체, 자바스크립트 Date 객체 또는 ISO 8601 형식의 문자열
   * @param {LocalizationOptions} options - locale과 timezone을 설정할 옵션
   * @throws {Error} DateTime으로 파싱 될 수 없는 inputData가 전달되는 경우 예외를 발생시킵니다.
   * @returns {DateTime} 변환된 DateTime 객체
   */
  public parseToDateTime(inputDate: DateTimeInput, options: LocalizationOptions = {}): DateTime {
    const { zoneName = this.defaultZoneName, locale = this.defaultLocale } = options;

    this.validateTimeZone(zoneName);

    let result: DateTime;
    if (typeof inputDate === 'string') {
      result = DateTime.fromISO(inputDate).toLocal();
    } else if (inputDate instanceof Date) {
      result = DateTime.fromJSDate(inputDate);
    } else {
      result = inputDate;
    }

    if (result.invalidReason) {
      throw new Error(`${inputDate} cannot be converted to a "luxon DateTime" object.`);
    }

    return result.setZone(zoneName).setLocale(locale);
  }

  /**
   * 입력 받은 날짜를 전달된 format 형식의 문자열로 변환합니다.
   * @param {DateTimeInput} inputDate - DateTime 객체, 자바스크립트 Date 객체 또는 ISO 8601 형식의 문자열
   * @param {string} format - 출력 형식
   * @param {LocalizationOptions} options - locale과 timezone을 설정할 옵션
   * @returns {string} 형식화된 날짜와 시간 문자열
   */
  public format(inputDate: DateTimeInput, format: string, options?: LocalizationOptions): string {
    return this.parseToDateTime(inputDate, options).toFormat(format);
  }

  /**
   * 입력된 시작, 종료 날짜 사이의 차이를 계산합니다.
   * @param {DateTimeInput} start - 시작 DateTime
   * @param {DateTimeInput} end - 끝 DateTime
   * @param {localizationOptionsWithUnit} options - 계산 단위 및 locale과 timezone을 설정할 옵션
   * @returns {DurationObjectUnits} 계산된 차이
   */
  public diff(
    start: DateTimeInput,
    end: DateTimeInput,
    options: localizationOptionsWithUnit = {}
  ): DurationObjectUnits {
    const { unit = ['years', 'months', 'days', 'hours', 'minutes', 'seconds', 'milliseconds'] } =
      options;
    const startDateTime: DateTime = this.parseToDateTime(start, options);
    const endDateTime: DateTime = this.parseToDateTime(end, options);

    return endDateTime.diff(startDateTime, unit).toObject();
  }

  /**
   * 입력 받은 날짜에 지정된 기간을 더합니다.
   * @param {DateTimeInput} inputDate - DateTime 객체, 자바스크립트 Date 객체 또는 ISO 8601 형식의 문자열
   * @param {DurationObjectUnits} durationObjectUnits - 더할 기간
   * @param {LocalizationOptions} options - locale과 timezone을 설정할 옵션
   * @returns {DateTime} 계산된 DateTime 객체
   */
  public duration(
    inputDate: DateTimeInput,
    durationObjectUnits: DurationObjectUnits,
    options?: LocalizationOptions
  ): DateTime {
    const dateTime = this.parseToDateTime(inputDate, options);
    const duration = Duration.fromObject(durationObjectUnits);

    return dateTime.plus(duration);
  }

  /**
   * 입력 받은 날짜를 ISO 문자열 형식으로 반환합니다.
   * @param {DateTimeInput} inputDate - DateTime 객체, 자바스크립트 Date 객체 또는 ISO 8601 형식의 문자열
   * @param {LocalizationOptions} options - locale과 timezone을 설정할 옵션
   * @returns {Nullable<string>} 변환된 UTC ISO 문자열
   */
  public convertToUTCISOString(
    inputDate: DateTimeInput,
    options?: LocalizationOptions
  ): Nullable<string> {
    return this.parseToDateTime(inputDate, options).toUTC().toISO();
  }

  /**
   * 주어진 시작일과 종료일 사이의 기간 목록을 반환합니다.
   * @param {DateTimeInput} start 시작일
   * @param {DateTimeInput} end  종료일
   * @param {LocalizationOptions} options - locale과 timezone을 설정할 옵션
   * @returns  {DateTime[]} 시작 종료일 사이의 기간 DateTime 목록, 각 DateTime은 해당 날짜의 00:00:00 기준
   * @throws {Error} 종료일이 시작일보다 빠른 경우 예외를 발생시킵니다.
   */
  public createDateRangeList(
    start: DateTimeInput,
    end: DateTimeInput,
    options?: LocalizationOptions
  ): DateTime[] {
    const startDateTime = this.parseToDateTime(start, options);
    const endDateTime = this.parseToDateTime(end, options);

    if (startDateTime > endDateTime) {
      const startUTCISOString = this.convertToUTCISOString(startDateTime);
      const endUTCISOString = this.convertToUTCISOString(endDateTime);
      throw new Error(
        `The end date (UTC ISO string: ${endUTCISOString}) is earlier than the start date (UTC ISO string: ${startUTCISOString}).`
      );
    }

    const result: DateTime[] = [];

    let current = startDateTime.startOf('day');
    while (current <= endDateTime) {
      result.push(current);
      current = current.plus({ days: 1 });
    }

    return result;
  }

  /**
   * 싱글톤 인스턴스 반환
   * @returns {DateUtil} DateUtil 인스턴스
   */
  static getInstance(): DateUtil {
    return new DateUtil();
  }
}

/**
 * DateUtil(날짜 제어 유틸리티) 인스턴스를 반환합니다.
 * 반환되는 인스턴스는 싱글톤으로 관리되고 있습니다.
 */
export const useDateUtil = (): DateUtil => {
  return DateUtil.getInstance();
};
