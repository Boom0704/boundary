<template>
  <div class="home">
    <div class="centered-box">
      <h1 v-for="n in 100" :key="n">
        My PageMy PageMy PageMy PageMy Page {{ n }}
      </h1>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HomeView",
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
/* SCSS 변수 선언 */
$breakpoint-mobile: 640px;
$breakpoint-tablet: 1024px;

/* 기본적으로 모든 여백 및 패딩을 제거 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* 기본 레이아웃 설정 */
.home {
  display: flex;
  justify-content: center; /* 기본적으로는 가운데 배치 */
  height: 100vh; /* 뷰포트 높이에 맞춤 */
  padding: 0;
}

/* 500px 기본 크기, 작은 화면에서는 비율 조정 */
.centered-box {
  width: 100%;
  max-width: 500px;
  min-width: 300px;
  background-color: #e7efe7;
  padding: 0px;
  box-sizing: border-box;
}

/* Tablet 이상에서 가운데가 아닌 살짝 왼쪽으로 배치 */
@media (min-width: $breakpoint-tablet) {
  .home {
    justify-content: flex-start; /* 왼쪽에 배치 */
    // padding-left: calc(100vw * 0.2); /* 왼쪽 마진: 20% */
    padding-right: calc(100vw * 0.3); /* 오른쪽 마진: 30% */
  }
}
</style>
