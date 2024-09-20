<template>
  <div class="add-picture-container">
    <!-- 선택된 사진 또는 사진 추가 안내 -->
    <div class="camera-view">
      <CameraIcon v-if="photos.length === 0" class="camera-icon" />
      <div v-else class="selected-photo-container">
        <!-- 사진 번호 -->
        <div class="photo-index">
          {{ currentPhotoIndex + 1 }} / {{ photos.length }}
        </div>
        <img
          v-if="currentPhotoIndex !== null && photos[currentPhotoIndex]"
          :src="getPhotoUrl(photos[currentPhotoIndex])"
          :alt="'Selected Photo ' + (currentPhotoIndex + 1)"
          class="selected-photo"
        />
      </div>
    </div>

    <!-- 사진 리스트 및 추가 버튼 -->
    <PhotoListAndUploader />
  </div>
</template>

<script lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import { CameraIcon } from "@heroicons/vue/24/outline";
import PhotoListAndUploader from "@/components/PhotoListAndUploader.vue";

export default {
  name: "AddPicture",
  components: {
    CameraIcon,
    PhotoListAndUploader,
  },
  setup() {
    const store = useStore();
    const photos = computed(() => store.state.photos);
    const currentPhotoIndex = computed(() => store.state.currentPhotoIndex);

    const getPhotoUrl = (photo: File | Blob) => {
      return URL.createObjectURL(photo);
    };

    return {
      photos,
      currentPhotoIndex,
      getPhotoUrl,
    };
  },
};
</script>

<style lang="scss" scoped>
/* SCSS 변수 선언 */
$breakpoint-mobile: 640px;
$breakpoint-tablet: 1024px;

.add-picture-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 80vh;
  padding: 20px;
  box-sizing: border-box;
}

.camera-view {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e7efe7;
  width: 100%;
  height: 70%;
  border: 2px dashed #ccc;
  text-align: center;
}

.selected-photo-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.photo-index {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 18px;
}

.selected-photo {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  display: block;
  margin: 0 auto;
}

.camera-icon {
  max-width: 500px;
  max-height: 500px;
  width: 100%;
  height: auto;
  color: #aaa;
}
@media (max-width: $breakpoint-mobile) {
  .add-picture-container {
    height: 70vh;
  }

  .camera-icon {
    max-width: 300px;
  }
}
</style>
