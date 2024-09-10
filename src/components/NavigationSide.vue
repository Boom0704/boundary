<template>
  <nav>
    <router-link :to="ROUTES.HOME.path">Home</router-link>
    <router-link :to="ROUTES.ABOUT.path">About</router-link>
    <router-link :to="ROUTES.MYPAGE.path">My Page</router-link>
  </nav>
</template>

<script>
import { ROUTES } from "../utils/constants";

export default {
  name: "NavigationSide",
  data() {
    return {
      ROUTES,
    };
  },
};
</script>

<style scoped>
nav {
  padding: 30px;
}

a {
  font-weight: bold;
  color: #2c3e50;
}

a.router-link-exact-active {
  color: #42b983;
}
</style>
