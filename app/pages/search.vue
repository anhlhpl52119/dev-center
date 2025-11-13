<script lang="ts" setup>
const searchedContent = [
  {
    title: '불카누스 가이드',
    matched:
      '<span class="text-primary">불카누스</span> 연동에 도움이 되는 가이드, 참고 자료 등을 제공합니다.',
  },
  {
    title: '불카누스 메뉴2',
    matched:
      '<span class="text-primary">불카누스</span> 메뉴2 Your content here',
  },
  {
    title: 'ReqCreateZone',
    matched:
      'ct.ReqCreateZone ¶ Parameter 형식 파라미터 설명 string UgcID UGCID bool IsPrivate 비공개방 여부 bool ResultCode 매칭 시도할 때 매칭 가능한 존에 있는 확인하는지 여부 ,샌드박스영역에서는 테이블로 매칭 가능 존 정의 <span class="text-primary">불카누스</span> 는 펭귄광장에서 false 로 보내야 함.',
  },
  {
    title: 'UgcType',
    matched:
      '¶ UgcType ¶ 설명 UGC 타입에 대한 Enum입니다. ¶ 선언 USGFramework.Runtime.Contents.APIDataStruct.UgcType ¶ Parameter 형식 파라미터 설명 Enum UserMod <span class="text-primary">불카누스</span> 에서 제작한 모드 Enum InAppMod 공식 모드 (인앱)',
  },
  {
    title: '게임 설정',
    matched:
      '게임 설정은 <span class="text-primary">불카누스</span> 에디터에 진입한 사용자가 인게임 밖에서 우선 세팅해야 하는 데이터를 설정할 수 있는 공간입니다. 게임 설정에 있는 기능을 이용하여 게임의 기본 설정, 플레이어 및 캐릭터, 라운드, 스테이지, 데이터에 대한 내용을 설정할 수 있습니다.',
  },
  {
    title: '앱 업데이트',
    matched:
      '<span class="text-primary">불카누스</span> 불카누스 컴패니언 앱은 항상 최신 버전으로 유지되며, 최신 버전이 아닌 경우엔 업데이트 후에 정상적으로 기능을 사용할 수 있습니다. 불카누스 컴패니언 앱은 다음의 경우에 새 버전을 체크합니다.',
  },
  {
    title: '커뮤니티',
    matched:
      '<span class="text-primary">불카누스</span> 컴패니언 앱 내에서 커뮤니티 활동 내역을 확인할 수 있게 계획중입니다. 커뮤니티 메뉴는 XK5 개발자 센터로 연결되는 통로가 될 것입니다.',
  },
];
</script>

<template>
  <main>
    <div class="mt-20 text-center">
      <h1 class="text-title font-bold">
        🔍 검색 결과
      </h1>
      <input
        type="text"
        class="border-abd-base bg-abg-base mt-6 w-150 rounded-full border py-4 pr-18 pl-5"
        placeholder="검색어를 입력하세요."
      >
    </div>

    <div class="mx-auto mt-10 grid max-w-330 gap-4">
      <template v-for="(item, index) in searchedContent" :key="index">
        <div
          class="bg-abg-base outline-abd-base rounded-4xl p-7.5 transition hover:shadow-sm hover:outline"
        >
          <h2 class="text-2xl font-bold">
            {{ item.title }}
          </h2>
          <p class="text-tcl-dimmed" v-html="item.matched" />
        </div>
      </template>
    </div>

    <div class="mb-17 flex py-8">
      <AppPagination class="mx-auto block" />
    </div>
  </main>
</template>
