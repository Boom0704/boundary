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
import { useToast } from "vue-toastification"; // vue-toastification 임포트

export default defineComponent({
  name: "ActionModal",
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
    postId: {
      type: Number,
      required: true,
    },
    authorName: {
      type: String,
      required: true,
    },
  },
  emits: ["close"],
  methods: {
    closeModal() {
      this.$emit("close");
    },
    handleItemClick(item: string) {
      console.log(`${item} 버튼 클릭됨`); // 클릭된 버튼 확인
      switch (item) {
        case "보기":
          this.viewAction();
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
    viewAction() {
      this.toast.success("게시물로 이동!"); // 성공 시 토스트 메시지 띄우기
      const fullLink = `/detail/${this.postId}`;
      this.$router.push(fullLink).finally(() => {
        this.closeModal();
      });
    },
    copyLinkAction() {
      const fullLink = `${process.env.VUE_APP_BASE_URL}/detail/${this.postId}`;

      // 클립보드에 링크 복사
      navigator.clipboard
        .writeText(fullLink)
        .then(() => {
          this.toast.success("링크복사 완료!"); // 성공 시 토스트 메시지 띄우기
        })
        .catch((err) => {
          console.error("링크 복사 실패", err);
          this.toast.error("링크 복사 실패!"); // 실패 시 토스트 메시지 띄우기
        })
        .finally(() => {
          // 추가적인 작업이 필요하면 이곳에 작성
          this.closeModal();
          console.log("클립보드 복사 작업 완료");
        });
    },
    accountInfoAction() {
      this.toast.success(`${this.authorName}의 페이지로 이동!`); // 성공 시 토스트 메시지 띄우기
      const profileLink = `/profile/${this.authorName}`;
      this.$router.push(profileLink).finally(() => {
        this.closeModal();
      });
    },
  },
  data() {
    return {
      modalItems: ["보기", "링크복사", "계정정보", "취소"],
    };
  },
  setup() {
    // vue-toastification의 useToast 훅을 사용하여 toast 메서드를 가져옵니다.
    const toast = useToast();
    return { toast };
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

.toast {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #333;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  z-index: 1000;
}
</style>
