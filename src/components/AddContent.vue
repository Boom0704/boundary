<template>
  <div class="add-content-container">
    <!-- 사진 업로드 컴포넌트 -->
    <PhotoListAndUploader />

    <!-- 텍스트 입력 구간 -->
    <div class="content-input-container">
      <textarea
        v-model="contentText"
        class="content-textarea"
        placeholder=""
        @input="updateContentText"
        maxlength="2000"
      ></textarea>
      <div class="text-counter">{{ contentText.length }} / 2000</div>
    </div>

    <!-- 태그 입력 및 리스트 -->
    <div class="tags-container">
      <input
        v-model="tagInput"
        class="tag-input"
        placeholder="Add Tag..."
        @keyup.enter="addTag"
      />
      <div class="tag-list">
        <div v-for="(tag, index) in hashtags" :key="index" class="tag-item">
          {{ tag }} <span class="delete-tag" @click="removeTag(index)">X</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed } from "vue";
import { useStore } from "vuex";
import PhotoListAndUploader from "@/components/PhotoListAndUploader.vue";

export default {
  name: "AddContent",
  components: {
    PhotoListAndUploader,
  },
  setup() {
    const store = useStore();
    const contentText = computed(() => store.state.photo.contentText);
    const hashtags = computed(() => store.state.photo.hashtags);
    const tagInput = ref("");

    const updateContentText = (event: Event) => {
      const text = (event.target as HTMLTextAreaElement).value;
      store.commit("photo/setContentText", text); // 'photo' 모듈 사용
    };

    const addTag = () => {
      if (
        tagInput.value.trim() !== "" &&
        !hashtags.value.includes(tagInput.value.trim())
      ) {
        store.commit("photo/setHashtags", [
          ...hashtags.value,
          tagInput.value.trim(),
        ]); // 'photo' 모듈 사용
        tagInput.value = ""; // 태그 추가 후 입력 필드 초기화
      }
    };

    const removeTag = (index: number) => {
      const updatedTags = [...hashtags.value];
      updatedTags.splice(index, 1);
      store.commit("photo/setHashtags", updatedTags); // 'photo' 모듈 사용
    };

    return {
      contentText,
      tagInput,
      hashtags,
      updateContentText,
      addTag,
      removeTag,
    };
  },
};
</script>

<style scoped>
.add-content-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  box-sizing: border-box;
}

/* 텍스트 입력 구간 */
.content-input-container {
  position: relative;
}

.content-textarea {
  width: 100%;
  height: 150px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 20px;
  resize: none;
  box-sizing: border-box;
}

.text-counter {
  position: absolute;
  bottom: 10px;
  right: 10px;
  font-size: 12px;
  color: #999;
}

/* 태그 입력 및 리스트 구간 */
.tags-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.tag-input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tag-item {
  padding: 5px 10px;
  background-color: white;
  border: 2px solid #60d360; /* 1px 두께의 초록색 선 */
  color: black;
  border-radius: 20px;
  display: flex;
  align-items: center;
  font-weight: bolder;
  gap: 5px;
}

.delete-tag {
  cursor: pointer;
  background-color: #bcbcbc;
  padding: 3px;
  border-radius: 50%; /* 완벽한 원을 만듭니다 */
  color: white;
  font-size: 10px;
  width: 10px; /* 너비와 높이를 설정하여 원 모양을 보장 */
  height: 10px;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
}

@media (max-width: 640px) {
  .add-content-container {
    padding: 10px;
  }

  .content-textarea {
    height: 120px;
  }
}
</style>
