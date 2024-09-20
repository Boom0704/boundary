<template>
  <div class="upload-page">
    <h1>업로드 중입니다...</h1>

    <!-- 처리 중인 로딩 애니메이션 -->
    <div class="loading-spinner"></div>
  </div>
</template>

<script lang="ts">
import { useStore } from "vuex";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "UploadPage",
  setup() {
    const store = useStore();
    const router = useRouter();

    const simulateUploadProcess = async () => {
      // 2초 대기하는 비동기 함수 (서버 요청 대체)
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Vuex의 photos 상태를 비움
      store.commit("clearDatas");

      // 업로드가 완료되면 홈으로 리디렉션
      router.push({ name: "home" });
    };

    onMounted(() => {
      simulateUploadProcess();
    });

    return {};
  },
};
</script>

<style lang="scss" scoped>
/* SCSS 변수 선언 */
$breakpoint-mobile: 640px;
$breakpoint-tablet: 1024px;

.upload-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 85vh;
  text-align: center;
  background-color: #f9f9f9;
  font-family: "Arial", sans-serif;
}

h1 {
  font-size: 28px;
  color: #333;
  margin-bottom: 20px;
  font-weight: bold;
}

.loading-spinner {
  border: 6px solid #f0f0f0;
  border-top: 6px solid #60d360;
  border-radius: 50%;
  width: 70px;
  height: 70px;
  animation: spin 1.2s linear infinite;
  margin-bottom: 25px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@media (max-width: $breakpoint-mobile) {
  .upload-page {
    height: 70vh;
  }
}
</style>
