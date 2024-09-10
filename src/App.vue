<template>
  <div id="app" class="app-container">
    <NavigationSide class="nav-sidebar" />
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavigationSide from "./components/NavigationSide.vue";

export default defineComponent({
  name: "App",
  components: {
    NavigationSide,
  },
});
</script>

<style lang="scss">
/* 전체 페이지의 기본 설정 */
html,
body {
  height: 100%;
  margin: 0;
  overflow: hidden; /* 전체 페이지에서 스크롤바를 제거 */
}

.app-container {
  display: flex;
  height: 100vh; /* 화면 전체에 맞게 설정 */
  overflow: hidden; /* 전체 컨테이너에서 스크롤 없앰 */
}

.nav-sidebar {
  flex-shrink: 0;
  width: 250px;
  background-color: #f4f4f4;
  height: 100vh; /* 사이드바를 고정하고, 화면 높이에 맞춤 */
  position: relative; /* 사이드바가 고정되지만, 메인 콘텐츠와 겹치지 않게 처리 */
}

.main-content {
  flex-grow: 1;
  margin-left: 250px; /* 사이드바의 너비만큼 마진을 설정 */
  overflow-y: auto; /* 세로 스크롤을 허용 */
  padding: 20px;
  height: 100vh; /* 화면 높이에 맞춰서 스크롤 허용 */
}

@media (max-width: 1023px) {
  .nav-sidebar {
    width: 80px;
  }

  .main-content {
    margin-left: 80px; /* 사이드바가 80px로 줄어들면 메인 컨텐츠도 조정 */
  }
}

@media (max-width: 639px) {
  .app-container {
    flex-direction: column;
  }

  .nav-sidebar {
    width: 100%;
    height: 60px;
    position: relative;
    top: 0;
  }

  .main-content {
    margin-left: 0; /* 사이드바가 상단에 있을 때 좌측 마진 제거 */
    margin-top: 60px; /* 사이드바가 상단에 있을 때 위쪽 마진 추가 */
    height: calc(
      100vh - 60px
    ); /* 메인 콘텐츠가 사이드바를 고려해 높이를 조정 */
  }
}
</style>
