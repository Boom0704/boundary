<template>
  <div class="comment-item">
    <!-- 댓글 내용과 좋아요 섹션 -->
    <div class="comment-content">
      <span class="comment-user">{{ comment.author.username }}: </span>
      <span class="comment-text">{{ comment.content }}</span>
      <div class="like-section">
        <HeartIcon
          class="like-icon"
          :class="{ active: isLiked }"
          @click="toggleLike"
        />
        <span class="like-count">{{ comment.likes.length }}</span>
      </div>
    </div>

    <!-- 하단 수정 여부와 날짜 -->
    <div class="bottom-block">
      <span class="edited-text" v-if="comment.createdAt !== comment.updatedAt">
        (수정됨)
      </span>
      <span class="comment-date">{{ formatDate(comment.updatedAt) }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { IComment } from "@/interface/IModels"; // IComment 인터페이스 가져오기
import { HeartIcon } from "@heroicons/vue/24/outline";

export default defineComponent({
  name: "CommentsModel",
  props: {
    comment: {
      type: Object as () => IComment,
      required: true,
    },
  },
  setup(props) {
    const isLiked = ref(false);

    const toggleLike = () => {
      isLiked.value = !isLiked.value;
    };

    const formatDate = (date: Date) => {
      return new Date(date).toLocaleDateString();
    };

    return {
      isLiked,
      toggleLike,
      formatDate,
    };
  },
  components: {
    HeartIcon,
  },
});
</script>

<style scoped>
.comment-item {
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
}

.comment-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
}

.comment-user {
  font-weight: bold;
  margin-right: 5px;
}

.comment-text {
  flex-grow: 1;
}

.like-section {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-left: 10px;
}

.like-icon {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.like-icon.active {
  fill: rgb(253, 53, 53);
}

.like-count {
  font-size: 12px;
}

.bottom-block {
  display: flex;
  justify-content: flex-end; /* 우측 정렬 */
  align-items: center;
  gap: 5px; /* 수정됨과 날짜 사이의 간격 */
}

.comment-date {
  font-size: 10px;
  color: gray;
}

.edited-text {
  font-size: 10px;
  color: gray;
}
</style>
