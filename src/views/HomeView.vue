<template>
  <div class="home">
    <div class="centered-box">
      <!-- API에서 불러온 게시물 데이터를 이용한 PostItem 렌더링 -->
      <PostItem v-for="post in posts" :key="post.id" :post="post" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import PostItem from "@/components/PostItem.vue"; // PostItem 컴포넌트 임포트
import { fetchActivePosts } from "@/utils/api"; // API 함수 임포트

export default defineComponent({
  name: "HomeView",
  components: {
    PostItem,
  },
  setup() {
    const posts = ref([]); // 게시물 데이터를 담을 변수

    // 컴포넌트가 마운트되면 API 요청
    onMounted(async () => {
      try {
        posts.value = await fetchActivePosts();
      } catch (error) {
        console.error("게시물 데이터를 불러오는 중 오류 발생:", error);
      }
    });

    return {
      posts,
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
