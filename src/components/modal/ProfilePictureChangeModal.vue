<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <h3>프로필 사진 변경</h3>
      <div class="image-preview-container">
        <img
          v-if="previewImage"
          :src="previewImage"
          alt="Preview"
          class="preview-image"
        />
        <span v-else class="placeholder-text">
          선택한 이미지가 여기에 표시됩니다.
        </span>
      </div>
      <input
        type="file"
        ref="fileInput"
        @change="onFileChange"
        accept="image/*"
        class="file-input"
      />
      <div class="modal-actions">
        <button class="action-btn select-btn" @click="selectFile">
          선택하기
        </button>
        <button class="action-btn cancel-btn" @click="close">취소</button>
        <button
          class="action-btn change-btn"
          @click="confirmChange"
          :disabled="!selectedFile"
        >
          변경하기
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useToast } from "vue-toastification";

export default defineComponent({
  props: {
    onConfirm: {
      type: Function,
      required: true,
    },
    onClose: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const previewImage = ref<string | null>(null);
    const selectedFile = ref<File | null>(null);
    const toast = useToast();

    const onFileChange = (event: Event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        selectedFile.value = file;
        previewImage.value = URL.createObjectURL(file);
      } else {
        toast.error("파일을 선택하세요.");
      }
    };

    const selectFile = () => {
      const fileInputElement = document.querySelector(
        ".file-input"
      ) as HTMLInputElement;
      fileInputElement?.click(); // 클릭 이벤트 실행
    };

    const confirmChange = async () => {
      if (selectedFile.value) {
        const isSuccess = await props.onConfirm(selectedFile.value);
        if (isSuccess) {
          toast.success("프로필 사진이 성공적으로 업데이트되었습니다.");
        } else {
          toast.error(
            "프로필 사진 업데이트에 실패했습니다. 다시 시도해 주세요."
          );
        }
        close();
      }
    };

    const close = () => {
      previewImage.value = null;
      selectedFile.value = null;
      props.onClose();
    };

    return {
      previewImage,
      selectFile,
      confirmChange,
      close,
      onFileChange,
      selectedFile,
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
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-content {
  background: white;
  padding: 25px;
  border-radius: 15px;
  width: 350px;
  text-align: center;
}
.image-preview-container {
  width: 100%;
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ccc;
  margin: 15px 0;
}
.preview-image {
  max-width: 100%;
  max-height: 100%;
  border-radius: 10px;
}
.placeholder-text {
  font-size: 16px;
  color: #999;
}
.file-input {
  display: none;
}
.modal-actions {
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
}
.action-btn {
  padding: 12px 20px;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}
.select-btn {
  background-color: #42b983;
  color: white;
}
.select-btn:hover {
  background-color: #379d6f;
  transform: scale(1.05);
}
.cancel-btn {
  background-color: #ccc;
}
.cancel-btn:hover {
  background-color: #999;
  transform: scale(1.05);
}
.change-btn {
  background-color: #4a90e2;
  color: white;
}
.change-btn:hover {
  background-color: #357abd;
  transform: scale(1.05);
}
.change-btn:disabled {
  background-color: #ddd;
  cursor: not-allowed;
}
</style>
