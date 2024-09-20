<template>
  <nav class="sidebar" :class="{ mobile: isMobile, tablet: isTablet }">
    <div class="logo-container">
      <img src="@/assets/logo.png" alt="Logo" class="logo" />
      <h1 class="title" :class="{ hidden: isTablet || isMobile }">Boundary</h1>
    </div>
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
} from "@heroicons/vue/24/outline";

export default defineComponent({
  name: "NavigationSide",
  components: {
    HomeIcon,
    LinkIcon,
    UserIcon,
    PlusCircleIcon,
  },
  setup() {
    const isTablet = ref(false);
    const isMobile = ref(false);

    const routes = [
      { path: ROUTES.HOME.path, name: ROUTES.HOME.name, icon: HomeIcon },
      {
        path: ROUTES.ABOUT.path,
        name: ROUTES.ABOUT.name,
        icon: LinkIcon,
      },
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

.tablet {
  width: 70px;
  padding: 20px 10px;
}

.tablet .logo-container {
  justify-content: center;
  margin-right: 0;
}

.tablet .nav-link {
  justify-content: center;
}

.tablet .icon {
  margin-right: 0;
}

.mobile {
  width: 100%;
  height: 80px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 0 20px;
}

.mobile .logo-container {
  margin-bottom: 0;
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
