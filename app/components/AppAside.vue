<template>
  <aside>
    <!-- title -->
    <div class="leading-6 flex items-center justify-between">
      <span class="text-md font-bold">불카누스 가이드</span>
      <button class="p-2 size-8 bg-[#eff0f6] hover:bg-abd-active rounded-full relative">
        <Icon name="svg:close-arrow-right" class="w-3 absolute -translate-1/2" />
      </button>
    </div>
    <!-- toc -->
    <ul class="leading-5.5 mt-1.5 text-sm text-tcl-dimmed">
      <li><a href="#" class="text-primary font-medium">불카누스 소개</a></li>
      <li class="mt-2 font-medium">
        <a href="#">게임 프레임워크와 게임 템플릿</a>
      </li>
      <li class="mt-2 font-medium">
        <a href="#">게임 프레임워크에서 제공되는 것</a>
      </li>
      <li class="mt-2 font-medium">
        <a href="#">게임프레임워크의 구조</a>
      </li>

      <ul class="font-normal mt-1 pl-1">
        <li class="border-l-1 border-l-abd-base py-1 hover:border-l-primary">
          <a class="pl-4" href="#">파티 게임 프레임워크</a>
        </li>
        <li class="border-l-1 border-l-abd-base py-1 hover:border-l-primary">
          <a class="pl-4" href="#">게임 템플릿</a>
        </li>
        <li class="border-l-1 border-l-abd-base py-1 hover:border-l-primary">
          <a class="pl-4" href="#">스테이지</a>
        </li>
        <li class="border-l-1 border-l-abd-base py-1 hover:border-l-primary">
          <a class="pl-4" href="#">장치 시스템</a>
        </li>
        <li class="border-l-1 border-l-abd-base py-1 hover:border-l-primary">
          <a class="pl-4" href="#">게임 테스트</a>
        </li>
        <li class="border-l-1 border-l-abd-base py-1 hover:border-l-primary">
          <a class="pl-4" href="#">게임 출판</a>
        </li>
      </ul>
    </ul>
  </aside>
</template>
