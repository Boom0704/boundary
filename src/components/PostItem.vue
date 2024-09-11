<template>
  <div class="post-container">
    <!-- 사진 파트 -->
    <div
      class="photo-section"
      :style="{ backgroundImage: `url(${post.imageUrls[currentPhotoIndex]})` }"
      @mouseover="showNavigation = true"
      @mouseleave="showNavigation = false"
      @touchstart="showNavigation = true"
    >
      <div class="photo-header">
        <div class="user-info">
          <img
            :src="post.author.profilePictureUrl"
            alt="User Icon"
            class="user-icon"
          />
          <span class="user-name">{{ post.author.username }}</span>
        </div>
        <div class="photo-actions">
          <button class="action-btn text">버튼</button>
          <!-- Heroicons에서 가져온 더보기 아이콘 적용 -->
          <EllipsisHorizontalIcon class="action-btn info" />
        </div>
      </div>

      <!-- 좌우 클릭 영역: showNavigation이 true일 때만 표시 -->
      <div class="navigation" v-if="showNavigation">
        <button class="nav-btn left" @click="previousPhoto">◀</button>
        <button class="nav-btn right" @click="nextPhoto">▶</button>
      </div>
    </div>

    <!-- 글 파트 -->
    <div class="text-section">
      <div class="action-buttons">
        <HeartIcon class="icon" /> {{ post.likes.length }}
        <ChatBubbleBottomCenterTextIcon class="icon" />
        {{ post.comments.length }}
        <PaperAirplaneIcon class="icon" />
      </div>

      <div class="post-caption">
        {{ post.caption }}
      </div>

      <div class="comments-summary">댓글 {{ post.comments.length }}개</div>

      <div class="comments-list">
        <div
          v-for="comment in post.comments"
          :key="comment.id"
          class="comment-item"
        >
          <span class="comment-user">{{ comment.author.username }}:</span>
          <span class="comment-text">{{ comment.content }}</span>
        </div>
      </div>

      <div class="post-date">{{ formatDate(post.createdAt) }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from "vue";
import { IPost } from "@/interface/IModels"; // 인터페이스 IModels 사용
import {
  HeartIcon,
  ChatBubbleBottomCenterTextIcon,
  PaperAirplaneIcon,
  EllipsisHorizontalIcon, // 더보기 아이콘 가져오기
} from "@heroicons/vue/24/outline"; // Hero Icons 임포트

export default defineComponent({
  name: "PostItem",
  props: {
    post: {
      type: Object as PropType<IPost>,
      required: true,
    },
  },
  setup(props) {
    const currentPhotoIndex = ref(0);
    const showNavigation = ref(false); // 내비게이션 버튼 표시 여부

    const nextPhoto = () => {
      currentPhotoIndex.value =
        (currentPhotoIndex.value + 1) % props.post.imageUrls.length;
    };

    const previousPhoto = () => {
      currentPhotoIndex.value =
        (currentPhotoIndex.value - 1 + props.post.imageUrls.length) %
        props.post.imageUrls.length;
    };

    const formatDate = (date: Date) => {
      return new Date(date).toLocaleDateString();
    };

    return {
      currentPhotoIndex,
      showNavigation,
      nextPhoto,
      previousPhoto,
      formatDate,
    };
  },
  components: {
    HeartIcon,
    ChatBubbleBottomCenterTextIcon,
    PaperAirplaneIcon,
    EllipsisHorizontalIcon, // 컴포넌트에 더보기 아이콘 추가
  },
});
</script>

<style scoped>
.post-container {
  width: 100%;
  max-width: 600px;
  margin: 20px auto;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
}

/* 사진 파트 */
.photo-section {
  position: relative;
  background-size: contain; /* 이미지가 잘리지 않도록 contain 사용 */
  background-position: center;
  background-repeat: no-repeat; /* 이미지가 반복되지 않도록 설정 */
  width: 100%;
  max-height: 874px;
  min-height: 774px;
  background-color: black; /* 사진 위아래 검정색 여백 */
}

.photo-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  width: 100%;
  top: 0;
}

.user-info {
  display: flex;
  align-items: center;
}

.user-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 10px;
}

.user-name {
  color: white;
  font-weight: bold;
}

.photo-actions {
  margin-right: 24px;
  display: flex; /* 버튼들을 일렬로 배치 */
  align-items: center;
}

.photo-actions .action-btn {
  background: none;
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
}

.photo-actions .action-btn.text {
  width: 100px;
}

/* 사진 전환 버튼 */
.navigation {
  position: absolute;
  top: 50%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  transform: translateY(-50%);
}

.nav-btn {
  background: rgba(0, 0, 0, 0.3); /* 투명도 30% */
  color: white;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 10px;
}

.nav-btn.left {
  position: absolute;
  left: 10px;
}

.nav-btn.right {
  position: absolute;
  right: 10px;
}

/* 글 파트 */
.text-section {
  padding: 15px;
}

.action-buttons {
  display: flex;
  gap: 10px;
  align-items: center;
}

.icon {
  width: 24px;
  height: 24px;
}

.post-caption {
  margin-top: 10px;
  font-size: 16px;
  line-height: 1.4;
}

.comments-summary {
  margin-top: 10px;
  font-weight: bold;
}

.comments-list {
  margin-top: 10px;
}

.comment-item {
  margin-bottom: 5px;
}

.comment-user {
  font-weight: bold;
}

.comment-text {
  margin-left: 5px;
}

.post-date {
  text-align: right;
  font-size: 12px;
  color: gray;
  margin-top: 10px;
}
</style>
