<template>
  <div class="home">
    <div class="centered-box">
      <!-- 더미 데이터를 이용한 PostItem 렌더링 -->
      <PostItem v-for="post in dummyPosts" :key="post.id" :post="post" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { dummyPosts } from "@/data/dubbyModel"; // 더미 데이터 임포트
import PostItem from "@/components/PostItem.vue"; // PostItem 컴포넌트 임포트

export default defineComponent({
  name: "HomeView",
  components: {
    PostItem,
  },
  setup() {
    return {
      dummyPosts,
    };
  },
});
</script>

<style lang="scss" scoped>
/* SCSS 변수 선언 */
$breakpoint-mobile: 640px;
$breakpoint-tablet: 1024px;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.home {
  display: flex;
  justify-content: center;
  height: auto;
  min-height: 100vh;
  padding: 0;
}

.centered-box {
  width: 100%;
  max-width: 540px;
  min-width: 300px;
  padding: 0px;
  box-sizing: border-box;
}

@media (min-width: $breakpoint-tablet) {
  .home {
    justify-content: flex-start;
  }
  .centered-box {
    max-width: 540px;
    min-width: 500px;
    margin-right: calc(100vw * 0.2); /* 오른쪽 마진 */
  }
}
</style>
