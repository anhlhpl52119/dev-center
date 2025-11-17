<template>
  <nav class="footer-nav">
    <a :href="COMPANY_HOME_PAGE" target="_blank"> {{ t('footer.linkTitle.companyIntroduction') }} </a>
    <a :href="SUPPORT_TERMS_TERMS_URL" target="_blank"> {{ t('footer.linkTitle.termsConditions') }} </a>
    <a :href="SUPPORT_TERMS_PRIVACY_URL" target="_blank" class="highlight">
      <strong> {{ t('footer.linkTitle.privacyPolicy') }} </strong>
    </a>
    <a :href="SUPPORT_TERMS_YOUTH_URL" target="_blank">
      {{ t('footer.linkTitle.youthProtectionPolicy') }}
    </a>
    <a :href="SUPPORT_TERMS_POLICY_URL" target="_blank"> {{ t('footer.linkTitle.operationPolicy') }} </a>
    <a :href="GAME_TIME_SELECTION_URL" target="_blank">
      {{ t('footer.linkTitle.gameTimeSelectionSystem') }}
    </a>
    <a :href="HELP_DESK_PAGE_URL_LINK" target="_blank"> {{ t('footer.linkTitle.customerService') }} </a>
  </nav>

  <div class="footer-address">
    <p>
      <span> {{ t('footer.company.title') }} </span>
      <span> {{ t('footer.company.ceoTitle') }}:&nbsp;{{ t('footer.company.ceoName') }} </span>
      <span class="group-footer-address">
        <span>{{ t('footer.company.addressTitle') }}:&nbsp;</span>
        <span>{{ t('footer.company.address') }}</span>
      </span>
    </p>
    <p>
      <span> {{ t('footer.company.businessNumberTitle') }}:&nbsp;{{ t('footer.company.businessNumber') }} </span>
      <span> {{ t('footer.company.reportNumberTitle') }}{{ t('footer.company.reportNumber') }} </span>
      <a class="bizinfo" :href="COMPANY_REGISTERED_LINK" target="_blank" :title="t('footer.company.businessLicenseInformationCheck')">
        {{ t('footer.company.businessLicenseInformationCheck') }}
      </a>
    </p>
    <p>
      <span>
        {{ t('footer.company.representativeNumberTitle') }}:&nbsp;
        <a :href="`tel:${t('footer.company.representativeNumber')}`">
          {{ t('footer.company.representativeNumber') }}
        </a>
      </span>
      <span>
        {{ t('footer.company.faxNumberTitle') }} :
        <a :href="`tel:${t('footer.company.faxNumber')}`">
          {{ t('footer.company.faxNumber') }}
        </a>
      </span>
      <span>
        {{ t('footer.company.emailTitle') }} :
        <a :href="`mailto:${COMPANY_EMAIL}`">
          {{ COMPANY_EMAIL }}
        </a>
      </span>
    </p>
  </div>
</template>

<script lang="ts" setup>
const COMPANY_HOME_PAGE = ref('https://www.smilegate.com');
const SUPPORT_TERMS_TERMS_URL = ref('https://clause.onstove.com/terms');
const SUPPORT_TERMS_PRIVACY_URL = ref('https://clause.onstove.com/terms?category=privacy');
const SUPPORT_TERMS_YOUTH_URL = ref('https://clause.onstove.com/terms?category=youth');
const SUPPORT_TERMS_POLICY_URL = ref('https://clause.onstove.com/terms?category=oppolicy');
const GAME_TIME_SELECTION_URL = ref('https://member.onstove.com/game/block');
const HELP_DESK_PAGE_URL_LINK = ref('https://help.onstove.com');
const COMPANY_REGISTERED_LINK = ref('https://www.ftc.go.kr/bizCommPop.do?wrkr_no=1328160298');
const COMPANY_EMAIL = ref('stove@smilegate.com');

const { t } = useI18n();
</script>
