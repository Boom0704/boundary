<!-- ConfirmDeleteModal.vue -->
<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <h3>계정을 삭제하시겠습니까?</h3>
      <p>계정을 삭제하면 복구할 수 없습니다.</p>
      <div class="modal-actions">
        <button class="cancel-btn" @click="close">취소</button>
        <button class="confirm-btn" @click="confirmDelete">삭제</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    onConfirm: {
      type: Function as PropType<() => void>,
      required: true,
    },
    onClose: {
      type: Function as PropType<() => void>,
      required: true,
    },
  },
  methods: {
    confirmDelete() {
      if (this.onConfirm) this.onConfirm(); // onConfirm 함수 호출
      this.close(); // 모달 닫기
    },
    close() {
      if (this.onClose) this.onClose(); // onClose 함수 호출
    },
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
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 30px;
  width: 300px;
  text-align: center;
}
.modal-actions {
  margin-top: 15px;
  display: flex;
  justify-content: space-around;
}
.cancel-btn,
.confirm-btn {
  padding: 10px 20px;
  font-weight: bold;
  border-radius: 30px;
  transition: transform 0.2s ease, background-color 0.2s ease;
}

/* 기본 버튼 스타일 */
.cancel-btn {
  background-color: #ccc;
}
.confirm-btn {
  background-color: white;
  color: #42b983;
  border: 2px solid #42b983;
}

/* 호버 효과 */
.cancel-btn:hover {
  background-color: #999;
  transform: scale(1.1); /* 크기 1.1배로 확대 */
}
.confirm-btn:hover {
  background-color: #42b983;
  color: white;
  transform: scale(1.1); /* 크기 1.1배로 확대 */
}
</style>
