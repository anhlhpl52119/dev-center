<template>
  <article>
    <header>
      <h1 class="text-heading mb-1 font-bold">
        불카누스 가이드
      </h1>
      <p class="text-sx text-tcl-dimmed">
        불카누스 연동에 도움이 되는 가이드, 참고 자료 등을 제공합니다.
      </p>
    </header>

    <div
      class="bg-abg-base mt-10 min-h-10 max-w-[716px] rounded-4xl p-7.5 shadow-sm"
    >
      <section class="leading-[24px]">
        <h2 class="mb-2 text-xl">
          <strong>불카누스 소개</strong>
        </h2>
        <p class="text-tcl-dimmed">
          불카누스는 모드 게임을 제작할 수 있는 게임 에디터입니다. 창작자는
          %product%가 제공하는 오피셜 모드 게임에서부터 출발하여 그 게임을 변경
          하거나 게임을 구성하는 요소를 분해하고 재조립하는 방식으로 새로운 모드
          게임을 만들 수 있습니다.
        </p>
      </section>

      <section class="mt-10 leading-[24px]">
        <h2 class="mb-2 text-xl">
          <strong>게임 프레임워크와 게임 템플릿</strong>
        </h2>
        <p class="text-tcl-dimmed">
          대부분의 게임은 몇 가지 대표적 장르로 나뉘어질 수 있습니다. 각 장르의
          게임을 구성하기 위해서는 당연히 해야 할 수많 은 일들이 있습니다.
          <br>
          %product%는 사용자가 이런 어려움을 건너 뛰고 곧바로 게임의 즐거움을
          만들어 나가는데 집중하기를 원했습니다. 그래서 %product%는 대표적
          장르를 만들기 위한 도구를 세트로 제공하고 그 장르에 해당하는 셈플 게임
          역시 제공하기 로 했습니다.
          <br>
          어떤 장르의 게임을 만들기 위한 도구 모음을 게임 프레임워크라고
          부릅니다.
          <br>
          각 게임 프레임워크에서 손쉽게 제작을 시작할 수 있도록 제공하는 셈플
          게임을 게임 템플릿 이라고 합니다.
          <br>
          창작자는 게임 템플릿을 선택하여 프로젝트를 생성하고, 이후 장치
          시스템을 활용하여 나만의 모드 게임을 제작할 수 있습 니다.
        </p>
      </section>

      <section class="mt-10 leading-[24px]">
        <h2 class="mb-2 text-xl">
          <strong>불카누스 소개</strong>
        </h2>
        <p class="text-tcl-dimmed">
          쉽고 빠른 게임 제작이 가능할 수 있도록 게임 프레임워크에서는 아래의
          내용들을 제공합니다.
        </p>
        <ol class="text-tcl-dimmed list-decimal pl-5">
          <li>
            <strong class="text-base-txt">장르별 전용 기능:</strong> 어떤 게임
            장르를 만들기 위해서는 기본적으로 갖추고 있어야 하는 기능들이
            있습니다. 서버 클라이언트 구조, 네트워크 기능, 함께 플레이할
            사람들을 기다리고 만나는 과정, 해당 장르의 게임이 가진 기본 규칙의
            구성 등이 그 예가 될 수 있습니다.
          </li>
          <li>
            <strong class="text-base-txt">개발에 필요한 리소스:</strong> 특수한
            기믹 장치, 배경 오브젝트 등 게임 제작에 필요한 리소스를 제공합니다.
            게임프레임워크 기반으로 제작되는 리소스는 전용 형식을 가질 수
            있습니다.
          </li>
          <li>
            <strong class="text-base-txt">제작 형식:</strong> %product%는
            창작자가 쉽게 게임을 제작할 수 있도록 특화된 제작 방식을 제공합니다.
          </li>
          <li>
            <strong class="text-base-txt">공통 기능:</strong> 장르와 무관하게
            필요한 기능(예: 채팅, 결제, 플랫폼 연동 등)을 미리 개발해
            제공합니다.
          </li>
        </ol>
      </section>

      <section class="mt-10 leading-[24px]">
        <h2 class="mt-10 mb-2 text-xl">
          <strong>게임프레임워크의 구조</strong>
        </h2>
        <p class="text-tcl-dimmed">
          각 게임프레임워크는 하나 이상의 템플릿을 포함하며, 템플릿 안에는 특정
          모드 게임을 만들 수 있는 재료들이 구성되어 있습니다.
        </p>
        <h3 class="my-2 text-base font-medium">
          파티 게임 프레임워크
        </h3>
        <p class="text-tcl-dimmed">
          %product%의 첫번째 게임 프레임워크는 파티 게임 프레임워크입니다.
          파티게임은 여러 명이 모여서 함께 게임을 할 무리를 이루고 이렇게 모인
          사람들이 몇 개의 연속된 스테이지로 이루어진 도전을 극복해 나가며 서로
          경쟁하는 방식의 구성을 가지고 있습니다. 함께 시작한 구성원 중 한
          스테이지를 통과한 구성원은 다음 스테이지에 도전할 자격을 획득하고
          스테이지를 모두 통과한 사람들은 통과 보상과 순위에 따른 추가 보상을
          받는 것으로 한 사이클의 게임이 끝나게 됩니다. %product%의 파티 게임
          프레임워크 역시 이 장르의 규칙을 충실히 지원하고 있습니다. 따라서 파티
          게임 프레임워크는 라운드와 스테이지를 기본 단위로 구성됩니다.
        </p>
      </section>

      <section class="mt-10 leading-[24px]">
        <h2 class="mt-10 mb-2 text-xl">
          <strong>게임프레임워크의 구조</strong>
        </h2>
        <p class="text-tcl-dimmed">
          각 게임프레임워크는 하나 이상의 템플릿을 포함하며, 템플릿 안에는 특정
          모드 게임을 만들 수 있는 재료들이 구성되어 있습니다.
        </p>
        <h3 class="my-2 text-base font-medium">
          파티 게임 프레임워크
        </h3>
        <p class="text-tcl-dimmed">
          %product%의 첫번째 게임 프레임워크는 파티 게임 프레임워크입니다.
          파티게임은 여러 명이 모여서 함께 게임을 할 무리를 이루고 이렇게 모인
          사람들이 몇 개의 연속된 스테이지로 이루어진 도전을 극복해 나가며 서로
          경쟁하는 방식의 구성을 가지고 있습니다. 함께 시작한 구성원 중 한
          스테이지를 통과한 구성원은 다음 스테이지에 도전할 자격을 획득하고
          스테이지를 모두 통과한 사람들은 통과 보상과 순위에 따른 추가 보상을
          받는 것으로 한 사이클의 게임이 끝나게 됩니다. %product%의 파티 게임
          프레임워크 역시 이 장르의 규칙을 충실히 지원하고 있습니다. 따라서 파티
          게임 프레임워크는 라운드와 스테이지를 기본 단위로 구성됩니다.
        </p>
      </section>

      <section class="mt-10 leading-[24px]">
        <h2 class="mt-10 mb-2 text-xl">
          <strong>게임프레임워크의 구조</strong>
        </h2>
        <p class="text-tcl-dimmed">
          각 게임프레임워크는 하나 이상의 템플릿을 포함하며, 템플릿 안에는 특정
          모드 게임을 만들 수 있는 재료들이 구성되어 있습니다.
        </p>
        <h3 class="my-2 text-base font-medium">
          파티 게임 프레임워크
        </h3>
        <p class="text-tcl-dimmed">
          %product%의 첫번째 게임 프레임워크는 파티 게임 프레임워크입니다.
          파티게임은 여러 명이 모여서 함께 게임을 할 무리를 이루고 이렇게 모인
          사람들이 몇 개의 연속된 스테이지로 이루어진 도전을 극복해 나가며 서로
          경쟁하는 방식의 구성을 가지고 있습니다. 함께 시작한 구성원 중 한
          스테이지를 통과한 구성원은 다음 스테이지에 도전할 자격을 획득하고
          스테이지를 모두 통과한 사람들은 통과 보상과 순위에 따른 추가 보상을
          받는 것으로 한 사이클의 게임이 끝나게 됩니다. %product%의 파티 게임
          프레임워크 역시 이 장르의 규칙을 충실히 지원하고 있습니다. 따라서 파티
          게임 프레임워크는 라운드와 스테이지를 기본 단위로 구성됩니다.
        </p>
      </section>

      <section class="mt-10 leading-[24px]">
        <h2 class="mt-10 mb-2 text-xl">
          <strong>게임프레임워크의 구조</strong>
        </h2>
        <p class="text-tcl-dimmed">
          각 게임프레임워크는 하나 이상의 템플릿을 포함하며, 템플릿 안에는 특정
          모드 게임을 만들 수 있는 재료들이 구성되어 있습니다.
        </p>
        <h3 class="my-2 text-base font-medium">
          파티 게임 프레임워크
        </h3>
        <p class="text-tcl-dimmed">
          %product%의 첫번째 게임 프레임워크는 파티 게임 프레임워크입니다.
          파티게임은 여러 명이 모여서 함께 게임을 할 무리를 이루고 이렇게 모인
          사람들이 몇 개의 연속된 스테이지로 이루어진 도전을 극복해 나가며 서로
          경쟁하는 방식의 구성을 가지고 있습니다. 함께 시작한 구성원 중 한
          스테이지를 통과한 구성원은 다음 스테이지에 도전할 자격을 획득하고
          스테이지를 모두 통과한 사람들은 통과 보상과 순위에 따른 추가 보상을
          받는 것으로 한 사이클의 게임이 끝나게 됩니다. %product%의 파티 게임
          프레임워크 역시 이 장르의 규칙을 충실히 지원하고 있습니다. 따라서 파티
          게임 프레임워크는 라운드와 스테이지를 기본 단위로 구성됩니다.
        </p>
      </section>

      <section class="mt-10 leading-[24px]">
        <h2 class="mt-10 mb-2 text-xl">
          <strong>게임프레임워크의 구조</strong>
        </h2>
        <p class="text-tcl-dimmed">
          각 게임프레임워크는 하나 이상의 템플릿을 포함하며, 템플릿 안에는 특정
          모드 게임을 만들 수 있는 재료들이 구성되어 있습니다.
        </p>
        <h3 class="my-2 text-base font-medium">
          파티 게임 프레임워크
        </h3>
        <p class="text-tcl-dimmed">
          %product%의 첫번째 게임 프레임워크는 파티 게임 프레임워크입니다.
          파티게임은 여러 명이 모여서 함께 게임을 할 무리를 이루고 이렇게 모인
          사람들이 몇 개의 연속된 스테이지로 이루어진 도전을 극복해 나가며 서로
          경쟁하는 방식의 구성을 가지고 있습니다. 함께 시작한 구성원 중 한
          스테이지를 통과한 구성원은 다음 스테이지에 도전할 자격을 획득하고
          스테이지를 모두 통과한 사람들은 통과 보상과 순위에 따른 추가 보상을
          받는 것으로 한 사이클의 게임이 끝나게 됩니다. %product%의 파티 게임
          프레임워크 역시 이 장르의 규칙을 충실히 지원하고 있습니다. 따라서 파티
          게임 프레임워크는 라운드와 스테이지를 기본 단위로 구성됩니다.
        </p>
      </section>
    </div>

    <p class="text-tcl-dimmed mt-5 text-right text-xs">
      Last Updated: 2025.09.11 오후 20:22
    </p>
  </article>
</template>
