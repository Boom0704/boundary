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
import {
  HomeIcon,
  InformationCircleIcon,
  UserIcon,
} from "@heroicons/vue/24/outline";

interface Route {
  path: string;
  name: string;
  icon: any;
}

export default defineComponent({
  name: "NavigationSide",
  components: {
    HomeIcon,
    InformationCircleIcon,
    UserIcon,
  },
  setup() {
    const isTablet = ref(false);
    const isMobile = ref(false);

    const routes: Route[] = [
      { path: "/", name: "Home", icon: HomeIcon },
      { path: "/about", name: "About", icon: InformationCircleIcon },
      { path: "/mypage", name: "My Page", icon: UserIcon },
    ];

    const checkScreenSize = () => {
      if (window.innerWidth <= 640) {
        isMobile.value = true;
        isTablet.value = false;
      } else if (window.innerWidth <= 1023) {
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

<style scoped>
.sidebar {
  height: 100%;
  background-color: #f8f9fa;
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
  width: 40px;
  height: 40px;
  margin-right: 10px;
  object-fit: contain;
}

.title {
  font-size: 24px;
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
}

.icon {
  width: 24px;
  height: 24px;
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
  height: 60px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 0 20px;
}

.mobile .logo-container {
  margin-bottom: 0;
}

@media (max-width: 1023px) {
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

@media (max-width: 639px) {
  .sidebar {
    height: 60px;
    width: 100%;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 0 20px;
  }

  .logo-container {
    margin-bottom: 0;
  }
}
</style>
