<template>
  <NavigationSide />
  <router-view />
</template>

<script>
import NavigationSide from "./components/NavigationSide.vue";
export default {
  name: "App",
  components: {
    NavigationSide,
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
