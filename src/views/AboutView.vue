<template>
  <div class="about">
    <h1>This is an about page</h1>

    <!-- 테스트용 ProfileView 컴포넌트 불러오기 -->
    <ProfileView
      username="testtesttesttesttesttesttesttesttesttesttesttest"
      :size="100"
    />
    <ProfileView username="test" :size="200" />
    <ProfileView username="test" :size="400" />
    <ProfileView username="test" :size="800" />
  </div>
</template>

<script lang="ts">
import ProfileView from "@/components/common/ProfileView.vue";

export default {
  name: "AboutPage",
  components: {
    ProfileView,
  },
};
</script>

<style scoped>
.about {
  text-align: center;
}

h1 {
  margin-bottom: 20px;
}
</style>
