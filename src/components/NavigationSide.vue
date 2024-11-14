<template>
  <nav class="sidebar" :class="{ mobile: isMobile, tablet: isTablet }">
    <!-- 로고 섹션 -->
    <div
      class="logo-container"
      @mouseover="!isMobile && (showTooltip = false)"
      @click="toggleTooltip"
    >
      <img src="@/assets/logo.png" alt="Logo" class="logo" />
      <h1 class="title" :class="{ hidden: isTablet || isMobile }">Boundary</h1>

      <!-- 툴팁 섹션: 모바일에서만 보임 -->
      <transition name="slide-fade">
        <div v-show="showTooltip && isMobile" class="tooltip">
          <router-link
            v-for="route in routes"
            :key="route.path"
            :to="route.path"
            class="tooltip-link"
          >
            <component :is="route.icon" class="icon" />
            <span>{{ route.name }}</span>
          </router-link>
        </div>
      </transition>
    </div>

    <!-- 사이드바 네비게이션 -->
    <div class="nav-links" :class="{ hidden: isMobile }">
      <router-link
        v-for="route in routes"
        :key="route.path"
        :to="route.path"
        class="nav-link"
      >
        <component :is="route.icon" class="icon" />
        <span class="link-text" :class="{ hidden: isTablet }">{{
          route.name
        }}</span>
      </router-link>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from "vue";
import { ROUTES } from "@/utils/constants"; // ROUTES 상수 임포트
import { BREAKPOINT_MOBILE, BREAKPOINT_TABLET } from "@/utils/breakpoints"; // 임계값 임포트
import {
  HomeIcon,
  LinkIcon,
  UserIcon,
  PlusCircleIcon,
  QueueListIcon,
} from "@heroicons/vue/24/outline";

export default defineComponent({
  name: "NavigationSide",
  components: {
    HomeIcon,
    LinkIcon,
    UserIcon,
    PlusCircleIcon,
    QueueListIcon,
  },
  setup() {
    const isTablet = ref(false);
    const isMobile = ref(false);
    const showTooltip = ref(false);

    const toggleTooltip = () => {
      if (isMobile.value) {
        showTooltip.value = !showTooltip.value;
      }
    };

    const routes = [
      { path: ROUTES.HOME.path, name: ROUTES.HOME.name, icon: HomeIcon },
      {
        path: ROUTES.REQUEST.path,
        name: ROUTES.REQUEST.name,
        icon: QueueListIcon,
      },
      // {
      //   path: ROUTES.CONNECTION.path,
      //   name: ROUTES.CONNECTION.name,
      //   icon: LinkIcon,
      // },
      {
        path: ROUTES.ADDPAGE.path,
        name: ROUTES.ADDPAGE.name,
        icon: PlusCircleIcon,
      },
      { path: ROUTES.MYPAGE.path, name: ROUTES.MYPAGE.name, icon: UserIcon },
    ];

    const checkScreenSize = () => {
      if (window.innerWidth <= BREAKPOINT_MOBILE) {
        isMobile.value = true;
        isTablet.value = false;
      } else if (window.innerWidth <= BREAKPOINT_TABLET) {
        isMobile.value = false;
        isTablet.value = true;
      } else {
        isMobile.value = false;
        isTablet.value = false;
      }
    };

    onMounted(() => {
      checkScreenSize();
      window.addEventListener("resize", checkScreenSize);
    });

    onUnmounted(() => {
      window.removeEventListener("resize", checkScreenSize);
    });

    return {
      routes,
      isTablet,
      isMobile,
      showTooltip,
      toggleTooltip,
    };
  },
});
</script>

<style lang="scss" scoped>
$breakpoint-mobile: 640px;
$breakpoint-tablet: 1024px;

.sidebar {
  height: 100%;
  background-color: #e7efe7;
  padding: 20px;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
}

.logo-container {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  position: relative; /* 툴팁을 위한 부모 요소의 위치 지정 */
}

.logo {
  width: 60px;
  height: 60px;
  object-fit: contain;
}

.title {
  font-size: 35px;
  margin-left: 10px;
  font-weight: bold;
  color: #2c3e50;
}

/* 툴팁 스타일 */
.tooltip {
  position: absolute;
  top: 80px; /* 부모 아래쪽에 표시 */
  left: 0;
  background-color: rgb(255, 255, 255);
  border-radius: 8px;
  // padding: 10px 20px; /* padding을 늘려서 여유 공간 확보 */
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  min-width: 200px; /* 최소 너비 설정 */
  max-width: 100%; /* 최대 너비는 컨테이너의 100%로 제한 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center; /* 텍스트 가운데 정렬 */
  white-space: nowrap; /* 텍스트 줄바꿈 방지 */
  overflow: hidden; /* 텍스트가 넘칠 경우 숨김 */
  z-index: 100;
}

.tooltip-link {
  text-decoration: none;
  color: #2c3e50;
  font-size: 24px;
  width: 90%;
  font-weight: bold;
  padding: 5px;
  margin: 5px 0;
  border-radius: 8px;
  display: flex;
  align-items: center;
  transition: background-color 0.5s, color 0.5s; /* 애니메이션 추가 */

  /* 호버 시 색상 변화 */
  &:hover {
    color: #9ab661; /* 연한 색상 */
    background-color: #f0f0f0; /* 아주 옅은 회색 배경 */
  }

  /* 선택된 상태에 대한 배경색 */
  &.router-link-exact-active {
    background-color: #e0e0e0; /* 선택된 링크에 대해 더 짙은 회색 배경 */
  }
}

.tooltip-link .icon {
  width: 28px;
  height: 28px;
  margin-right: 10px;
}

.nav-links {
  display: flex;
  flex-direction: column;
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 10px 0;
  color: #2c3e50;
  text-decoration: none;
  font-weight: bold;
  font-size: 25px;
}

.icon {
  width: 35px;
  height: 35px;
  margin-right: 10px;
}

.router-link-exact-active {
  color: #42b983;
}

.hidden {
  display: none;
}

/* 슬라이드 애니메이션 */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

@media (max-width: $breakpoint-tablet) {
  .sidebar {
    width: 70px;
    padding: 20px 10px;
  }

  .logo-container {
    justify-content: center;
    margin-right: 0;
  }

  .nav-link {
    justify-content: center;
  }

  .icon {
    margin-right: 0;
  }

  .link-text {
    display: none;
  }
}

@media (max-width: $breakpoint-mobile) {
  .sidebar {
    height: 80px;
    width: 100%;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 0 20px;
  }

  .logo-container {
    margin-bottom: 0;
  }

  .nav-link {
    padding: 10px;
  }
}
</style>
