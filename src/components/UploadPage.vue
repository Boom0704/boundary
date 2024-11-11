<template>
  <div class="upload-page">
    <h1>업로드 중입니다...</h1>
    <div class="loading-spinner"></div>
  </div>
</template>

<script lang="ts">
import { useStore } from "vuex";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { createPost, uploadMultipleFiles } from "@/utils/api";
import { useToast } from "vue-toastification";

export default {
  name: "UploadPage",
  setup() {
    const store = useStore();
    const router = useRouter();
    const toast = useToast();

    const simulateUploadProcess = async () => {
      const timeout = setTimeout(() => {
        toast.error("업로드 실패! 시간이 너무 오래 걸립니다.");
        router.push({ name: "home" });
      }, 5000);

      try {
        const photos = store.state.photo.photos;
        const contentText = store.state.photo.contentText;
        const hashtagsProxy = store.state.photo.hashtags;
        const user = store.state.user.user;

        // 파일 업로드
        const imageUrls = await uploadMultipleFiles(photos);

        if (!imageUrls || imageUrls.length === 0) {
          throw new Error("이미지 업로드 중 오류 발생");
        }

        // 프록시 해제하여 hashtags를 배열로 변환
        const hashtags = [...hashtagsProxy];

        // 게시물 데이터 생성
        const postPayload = {
          authorId: user ? user.id : 0, // 기본값 설정
          imageUrls: imageUrls,
          caption: contentText,
          hashtags: hashtags,
        };

        await createPost(postPayload);

        clearTimeout(timeout);
        store.commit("photo/clearDatas");
        toast.success("업로드 완료!");
        router.push({ name: "home" });
      } catch (error) {
        console.error("업로드 실패:", error);
        clearTimeout(timeout);
        toast.error("업로드 실패. 다시 시도해주세요.");
        router.push({ name: "home" });
      }
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
