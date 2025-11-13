<template>
  <aside>
    <!-- title -->
    <div class="flex items-center justify-between leading-6">
      <span class="text-md font-bold">불카누스 가이드</span>
      <button
        class="hover:bg-abd-active relative size-8 rounded-full bg-[#eff0f6] p-2"
      >
        <Icon
          name="svg:close-arrow-right"
          class="absolute w-3 -translate-1/2"
        />
      </button>
    </div>
    <!-- toc -->
    <ul class="text-tcl-dimmed mt-1.5 text-sm leading-5.5">
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

      <ul class="mt-1 pl-1 font-normal">
        <li class="border-l-abd-base hover:border-l-primary border-l-1 py-1">
          <a class="pl-4" href="#">파티 게임 프레임워크</a>
        </li>
        <li class="border-l-abd-base hover:border-l-primary border-l-1 py-1">
          <a class="pl-4" href="#">게임 템플릿</a>
        </li>
        <li class="border-l-abd-base hover:border-l-primary border-l-1 py-1">
          <a class="pl-4" href="#">스테이지</a>
        </li>
        <li class="border-l-abd-base hover:border-l-primary border-l-1 py-1">
          <a class="pl-4" href="#">장치 시스템</a>
        </li>
        <li class="border-l-abd-base hover:border-l-primary border-l-1 py-1">
          <a class="pl-4" href="#">게임 테스트</a>
        </li>
        <li class="border-l-abd-base hover:border-l-primary border-l-1 py-1">
          <a class="pl-4" href="#">게임 출판</a>
        </li>
      </ul>
    </ul>
  </aside>
</template>
