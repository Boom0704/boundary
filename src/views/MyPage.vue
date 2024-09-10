<template>
  <div>
    <h1 v-for="n in 100" :key="n">My Page {{ n }}</h1>
    <p>This is My Page component!</p>
  </div>
</template>

<script>
export default {
  name: "MyPage",
};
</script>

<style scoped>
h1 {
  color: blue;
}
</style>
