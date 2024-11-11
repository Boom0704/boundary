<template>
  <div class="photo-uploader-container">
    <!-- 사진 리스트 -->
    <div class="photo-list-container">
      <div class="photo-list">
        <div
          v-for="(photo, index) in photos"
          :key="index"
          :class="[
            'photo-item',
            { 'active-photo': currentPhotoIndex === index },
          ]"
          @click="setCurrentPhoto(index)"
          @mouseover="hoveredPhotoIndex = index"
          @mouseleave="hoveredPhotoIndex = null"
        >
          <img
            v-if="photo"
            :src="getPhotoUrl(photo)"
            :alt="'Photo ' + (index + 1)"
            class="photo"
          />
          <!-- X 아이콘: 호버 시만 표시 -->
          <div
            v-if="hoveredPhotoIndex === index"
            class="delete-icon"
            @click.stop="confirmDelete(index)"
          >
            X
          </div>
        </div>
      </div>
    </div>

    <!-- 사진 추가 버튼 -->
    <div class="add-photo-button">
      <label for="file-upload" class="custom-file-upload">
        <PlusIcon class="plus-icon" />
      </label>
      <input
        id="file-upload"
        type="file"
        accept="image/*"
        multiple
        @change="handleFileUpload"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from "vuex";
import { computed, ref } from "vue";
import { PlusIcon } from "@heroicons/vue/24/outline";

export default {
  name: "PhotoListAndUploader",
  components: {
    PlusIcon,
  },
  setup() {
    const store = useStore();
    const photos = computed(() => store.state.photo.photos); // 'photo' 네임스페이스로 변경
    const currentPhotoIndex = computed(
      () => store.state.photo.currentPhotoIndex
    ); // 'photo' 네임스페이스로 변경
    const hoveredPhotoIndex = ref<number | null>(null);

    const handleFileUpload = (event: Event) => {
      const input = event.target as HTMLInputElement;
      if (input.files) {
        const files = Array.from(input.files);
        files.forEach((file) => {
          store.commit("photo/addPhoto", file); // 'photo' 네임스페이스로 변경
        });
      }
    };

    const setCurrentPhoto = (index: number) => {
      store.commit("photo/setCurrentPhoto", index); // 'photo' 네임스페이스로 변경
    };

    const getPhotoUrl = (photo: File | Blob) => {
      return URL.createObjectURL(photo);
    };

    const confirmDelete = (index: number) => {
      if (confirm("사진을 삭제하시겠습니까?")) {
        store.commit("photo/deletePhoto", index); // 'photo' 네임스페이스로 변경
      }
    };

    return {
      photos,
      currentPhotoIndex,
      hoveredPhotoIndex,
      handleFileUpload,
      setCurrentPhoto,
      getPhotoUrl,
      confirmDelete,
    };
  },
};
</script>

<style scoped>
.photo-uploader-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 150px;
}

.photo-list-container {
  flex-grow: 1;
  overflow-x: auto;
  overflow-y: hidden;
  padding-bottom: 10px;
}

.photo-list {
  display: flex;
  gap: 12px;
  white-space: nowrap;
}

.photo-item {
  position: relative;
  width: 110px;
  height: 110px;
  background-color: #f0f0f0;
  cursor: pointer;
  border: 2px solid transparent;
  border-radius: 80px;
  transition: border-color 0.3s, border-radius 0.3s;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.photo-item.active-photo {
  border-color: #60d360;
  border-radius: 10px;
}

.photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.add-photo-button {
  flex-shrink: 0;
  margin-left: 20px;
  position: relative;
}

.custom-file-upload {
  font-size: 60px;
  color: #60d360;
  cursor: pointer;
}

.plus-icon {
  width: 60px;
  height: 60px;
  color: #60d360;
}

input[type="file"] {
  display: none;
}

/* X 아이콘 (사진 삭제 버튼) */
.delete-icon {
  position: absolute;
  top: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  opacity: 0.5;
  cursor: pointer;
}

.delete-icon:hover {
  opacity: 1;
}

/* 반응형 디자인 */
@media (max-width: 640px) {
  .photo-item {
    width: 80px;
    height: 80px;
  }

  .add-photo-button {
    font-size: 50px;
  }
}

@media (min-width: 1024px) {
  .photo-item {
    width: 130px;
    height: 130px;
  }

  .add-photo-button {
    font-size: 70px;
  }
}
</style>
