<template>
  <div v-if="isVisible" class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <!-- 버튼들 리스트 -->
      <button
        class="modal-btn"
        v-for="(item, index) in modalItems"
        :key="index"
        @click="handleItemClick(item)"
        :class="{
          'first-btn': index === 0,
          'last-btn': index === modalItems.length - 1,
        }"
      >
        {{ item }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ActionModal",
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["close"],
  methods: {
    closeModal() {
      this.$emit("close");
    },
    handleItemClick(item: string) {
      switch (item) {
        case "신고":
          this.reportAction();
          break;
        case "보기":
          this.viewAction();
          break;
        case "공유":
          this.shareAction();
          break;
        case "링크복사":
          this.copyLinkAction();
          break;
        case "계정정보":
          this.accountInfoAction();
          break;
        case "취소":
          this.closeModal();
          break;
        default:
          break;
      }
    },
    reportAction() {
      console.log("신고 버튼 눌림");
    },
    viewAction() {
      console.log("보기 버튼 눌림");
    },
    shareAction() {
      console.log("공유 버튼 눌림");
    },
    copyLinkAction() {
      console.log("링크복사 버튼 눌림");
    },
    accountInfoAction() {
      console.log("계정정보 버튼 눌림");
    },
  },
  data() {
    return {
      modalItems: ["신고", "보기", "공유", "링크복사", "계정정보", "취소"],
    };
  },
});
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal-content {
  background: white;
  border-radius: 40px;
  max-width: 400px;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.modal-btn {
  width: 100%;
  height: 60px;
  font-size: 18px;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-btn:hover {
  background-color: #d3d3d3;
}

.first-btn {
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
}

.last-btn {
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
  border-bottom: none;
}

.close-btn {
  margin-top: 20px;
  padding: 8px 16px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.close-btn:hover {
  background-color: #e53935;
}
</style>
