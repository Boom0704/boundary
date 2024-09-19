<template>
  <div class="add-page">
    <!-- 프로그레스 바 -->
    <ProgressBar :step="currentStep" />

    <!-- 사진 추가, 글 추가 및 업로드 처리 -->
    <div class="content-area">
      <AddPicture v-if="currentStep === 1" @next="goToNextStep" />
      <AddContent
        v-if="currentStep === 2"
        @next="goToNextStep"
        @previous="goToPreviousStep"
      />
      <UploadPage v-if="currentStep === 3" />
    </div>

    <!-- Previous & Next 버튼 -->
    <div class="button-container" v-if="currentStep !== 3">
      <button
        class="prev-button"
        :disabled="currentStep === 1"
        @click="goToPreviousStep"
      >
        <ChevronDoubleLeftIcon class="icon-left" />
        <span class="button-text">PREVIOUS</span>
      </button>
      <button
        v-if="currentStep !== 3"
        class="next-button"
        @click="goToNextStep"
      >
        <span class="button-text">NEXT</span>
        <ChevronDoubleRightIcon class="icon-right" />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import ProgressBar from "@/components/ProgressBar.vue";
import AddPicture from "@/components/AddPicture.vue";
import AddContent from "@/components/AddContent.vue";
import UploadPage from "@/components/UploadPage.vue";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/vue/24/outline";

export default {
  name: "AddPage",
  components: {
    ProgressBar,
    AddPicture,
    AddContent,
    UploadPage,
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon,
  },
  setup() {
    const currentStep = ref(1);

    const goToNextStep = () => {
      if (currentStep.value < 3) {
        currentStep.value += 1;
      }
    };

    const goToPreviousStep = () => {
      if (currentStep.value > 1) {
        currentStep.value -= 1;
      }
    };

    return {
      currentStep,
      goToNextStep,
      goToPreviousStep,
    };
  },
};
</script>

<style lang="scss" scoped>
/* 브레이크포인트 변수 */
$breakpoint-mobile: 640px;
$breakpoint-tablet: 1024px;

.add-page {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  padding: 0;
  box-sizing: border-box;
}

/* 프로그레스 바 */
.content-area {
  height: calc(100vh - 10vh); /* vh에서 프로그레스 바의 10vh를 뺀 나머지 */
  overflow-y: auto;
}

.button-container {
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
}

.prev-button,
.next-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  font-size: 18px;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

/* Previous 비활성화 상태 (회색) */
.prev-button:disabled {
  background-color: #ccc; /* 회색 */
  color: #666;
  cursor: not-allowed;
}

/* Previous 활성화 상태 (붉은색) */
.prev-button {
  background-color: rgb(249, 84, 84); /* 기본 붉은색 */
  color: white;
}

/* Previous 활성화 상태에서 호버 (더 진한 붉은색) */
.prev-button:hover:not(:disabled) {
  background-color: rgba(206, 69, 69, 0.9); /* 더 진한 붉은색 */
}

/* Next 버튼 스타일 (초록색) */
.next-button {
  background-color: #60d360;
  color: white;
}

/* Next 버튼 호버 (더 진한 초록색) */
.next-button:hover {
  background-color: rgba(96, 211, 96, 0.9);
}

/* 아이콘과 텍스트의 세로 정렬 */
.icon-left,
.icon-right {
  width: 20px;
  height: 20px;
  margin: 0 5px;
  vertical-align: middle;
}

.button-text {
  vertical-align: middle;
}

/* 반응형 디자인 */

/* 모바일 뷰 */
@media (max-width: $breakpoint-mobile) {
  .button-container {
    padding: 5px 10px;
  }

  .prev-button,
  .next-button {
    padding: 10px 20px;
    font-size: 16px;
  }

  .icon-left,
  .icon-right {
    width: 16px;
    height: 16px;
  }
  .add-page {
    height: 85vh;
  }
}

/* 태블릿 뷰 */
@media (min-width: $breakpoint-tablet) {
  .prev-button,
  .next-button {
    padding: 12px 22px;
    font-size: 17px;
  }

  .icon-left,
  .icon-right {
    width: 18px;
    height: 18px;
  }
}
</style>
