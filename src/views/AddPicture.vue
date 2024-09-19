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
          v-if="currentPhotoIndex !== null"
          :src="photos[currentPhotoIndex]"
          :alt="'Selected Photo ' + (currentPhotoIndex + 1)"
          class="selected-photo"
        />
      </div>
    </div>

    <!-- 하단 사진 리스트와 사진 추가 버튼 -->
    <div class="bottom-bar">
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
          >
            <img :src="photo" :alt="'Photo ' + (index + 1)" class="photo" />
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
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { CameraIcon, PlusIcon } from "@heroicons/vue/24/outline"; // PlusIcon 추가

export default {
  name: "AddPicture",
  components: {
    CameraIcon,
    PlusIcon, // PlusIcon 등록
  },
  setup() {
    const photos = ref<string[]>([]);
    const currentPhotoIndex = ref<number>(0); // 기본값 0으로 설정

    // 파일 선택 시 사진 추가
    const handleFileUpload = (event: Event) => {
      const input = event.target as HTMLInputElement;
      if (input.files) {
        const files = Array.from(input.files);
        if (photos.value.length + files.length > 10) {
          alert("최대 10개의 사진만 추가할 수 있습니다.");
          return;
        }

        files.forEach((file) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            if (e.target?.result && photos.value.length < 10) {
              photos.value.push(e.target.result as string);
              setCurrentPhoto(photos.value.length - 1); // 방금 추가된 사진으로 이동
            }
          };
          reader.readAsDataURL(file);
        });
      }
    };

    const setCurrentPhoto = (index: number) => {
      currentPhotoIndex.value = index; // 클릭된 사진을 현재 선택된 사진으로 설정
    };

    return {
      photos,
      currentPhotoIndex,
      handleFileUpload,
      setCurrentPhoto,
    };
  },
};
</script>

<style lang="scss" scoped>
/* 브레이크포인트 변수 */
$breakpoint-mobile: 640px;
$breakpoint-tablet: 1024px;

.add-picture-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  padding: 20px;
  box-sizing: border-box;
}

/* 선택된 사진 또는 카메라 뷰 */
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

/* 선택된 사진 컨테이너 */
.selected-photo-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 사진 번호 표시 */
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
  max-width: 700px;
  max-height: 700px;
  width: 100%;
  height: auto;
  color: #aaa;
}

/* 하단 바 - 사진 리스트와 추가 버튼 */
.bottom-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 150px;
}

/* 사진 리스트 컨테이너 */
.photo-list-container {
  flex-grow: 1;
  overflow-x: auto;
  overflow-y: hidden; /* 세로 스크롤은 방지 */
  padding-bottom: 10px; /* 스크롤바와 겹치지 않게 */
}

/* 사진 리스트 */
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
  flex-shrink: 0; /* 사진이 작아지지 않도록 */
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
  object-fit: cover; /* 사진을 정사각형 비율로 맞춤 */
}

/* 사진 추가 버튼 */
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
  width: 60px; /* 아이콘 크기 */
  height: 60px;
  color: #60d360; /* 색상 설정 */
}

input[type="file"] {
  display: none;
}

/* 반응형 디자인 */
@media (max-width: $breakpoint-mobile) {
  .photo-item {
    width: 80px;
    height: 80px;
  }

  .add-photo-button {
    font-size: 50px;
  }

  .add-picture-container {
    height: 85vh;
  }
}

@media (min-width: $breakpoint-tablet) {
  .photo-item {
    width: 130px;
    height: 130px;
  }

  .add-photo-button {
    font-size: 70px;
  }
}
</style>
