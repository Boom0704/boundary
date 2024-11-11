<template>
  <div v-if="post" class="post-container">
    <!-- 사진 파트 -->
    <div
      class="photo-section"
      :style="{
        backgroundImage: `url(${post.imageUrls?.[currentPhotoIndex] || ''})`,
      }"
      v-if="post.imageUrls && post.imageUrls.length"
      @mouseover="showNavigation = true"
      @mouseleave="showNavigation = false"
      @touchstart="showNavigation = true"
    >
      <div class="photo-header">
        <div class="user-info">
          <ProfileView
            :username="post.author.username"
            :size="80"
            class="user-icon"
          />
          <span class="user-name">{{ post.author.username }}</span>
        </div>
        `
        <div class="photo-actions">
          <EllipsisHorizontalIcon class="action-btn info" @click="openModal" />
        </div>
        `

        <!-- 모달 컴포넌트 -->
        <ActionModal :isVisible="isModalVisible" @close="closeModal" />
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
        <HeartIcon
          class="like-icon"
          :class="{ active: isLiked }"
          @click="toggleLike"
        />
        {{ post.likes ? post.likes.length : 0 }}
        <ChatBubbleBottomCenterTextIcon class="chat-icon" @click="toggleChat" />
        {{ post.comments ? post.comments.length : 0 }}
        <PaperAirplaneIcon class="share-icon" @click="toggleShare" />
      </div>

      <div class="post-caption">
        {{ post.caption }}
      </div>

      <div class="comments-summary">
        댓글 {{ post.comments ? post.comments.length : 0 }}개
        <span class="more-comments" @click="loadMoreComments">더보기</span>
      </div>
      <div class="comments-list">
        <div
          v-for="comment in post.comments || []"
          :key="comment.id"
          class="comment-item"
        >
          <span class="comment-user">{{ comment.author.username }}:</span>
          <span class="comment-text">{{ comment.content }}</span>
        </div>
      </div>

      <div class="post-date-and-comment">
        <input
          type="text"
          class="comment-input"
          placeholder="댓글을 입력하세요"
          v-model="commentInput"
          @keypress.enter="submitComment"
        />
        <ChatBubbleBottomCenterTextIcon
          v-if="isCommentNotEmpty"
          class="submit-icon"
          @click="submitComment"
        />
        <span class="post-date">{{ formatDate(post.createdAt) }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, watch } from "vue";
import { IPost } from "@/interface/IModels";
import ActionModal from "@/components/modal/ActionModal.vue";
import {
  HeartIcon,
  ChatBubbleBottomCenterTextIcon,
  PaperAirplaneIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/vue/24/outline";
import ProfileView from "@/components/common/ProfileView.vue";

export default defineComponent({
  name: "PostItem",
  props: {
    post: {
      type: Object as PropType<IPost>,
      required: true,
    },
  },
  setup(props) {
    const isLiked = ref(false);
    const isModalVisible = ref(false);
    const currentPhotoIndex = ref(0);
    const showNavigation = ref(false);
    const commentInput = ref("");
    const isCommentNotEmpty = ref(false);

    const loadMoreComments = () => {
      console.log("loadMoreComments");
    };

    const toggleShare = () => {
      console.log("쉐어클릭");
    };

    const toggleChat = () => {
      console.log("챗클릭");
      const inputElement = document.querySelector(
        ".comment-input"
      ) as HTMLInputElement;

      if (inputElement) {
        inputElement.focus();
        inputElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    };

    const toggleLike = () => {
      isLiked.value = !isLiked.value;
      console.log("하트 클릭");
    };

    const openModal = () => {
      isModalVisible.value = true;
    };

    const closeModal = () => {
      isModalVisible.value = false;
    };

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

    watch(commentInput, (newVal) => {
      isCommentNotEmpty.value = newVal.trim().length > 0;
    });

    const submitComment = () => {
      if (isCommentNotEmpty.value) {
        console.log("댓글: " + commentInput.value);
        commentInput.value = ""; // 입력 필드 초기화
        isCommentNotEmpty.value = false; // 버튼 비활성화
      }
    };

    return {
      currentPhotoIndex,
      showNavigation,
      nextPhoto,
      previousPhoto,
      formatDate,
      isModalVisible,
      openModal,
      closeModal,
      isLiked,
      toggleLike,
      toggleChat,
      toggleShare,
      submitComment,
      commentInput,
      isCommentNotEmpty,
      loadMoreComments,
    };
  },
  components: {
    HeartIcon,
    ChatBubbleBottomCenterTextIcon,
    PaperAirplaneIcon,
    EllipsisHorizontalIcon,
    ProfileView,
    ActionModal,
  },
});
</script>

<style lang="scss" scoped>
$breakpoint-mobile: 640px;
$breakpoint-tablet: 1024px;
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
  margin-right: 10px;
}

.user-name {
  color: white;
  font-weight: bold;
}

.photo-actions {
  display: flex;
  align-items: center;
  margin-left: auto;
  padding-right: 10px; /* 우측 여백 추가 */
}

.photo-actions .action-btn.info {
  width: 80px; /* 아이콘 크기 설정 */
  height: 80px;
  margin-right: 5px;
  color: rgb(164, 164, 164); /* 색상 설정 */
  cursor: pointer;
}

.action-btn.info:hover {
  color: #ddd;
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
  padding-bottom: 0px;
}

.action-buttons {
  display: flex;
  gap: 10px;
  align-items: center;
}

.share-icon {
  width: 24px;
  height: 24px;
  fill: #dddddd00;
}

.share-icon:hover {
  width: 25px;
  color: rgb(65, 176, 255);
}

.chat-icon {
  width: 24px;
  height: 24px;
  fill: #dddddd00;
}

.chat-icon:hover {
  width: 25px;
  color: rgb(52, 203, 32);
}

.like-icon {
  width: 24px;
  height: 24px;
}

.like-icon.active {
  fill: rgb(253, 53, 53);
}

.like-icon:hover {
  width: 25px;
  color: rgb(212, 90, 163);
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

.more-comments {
  color: #c0c0c0;
  cursor: pointer;
  margin-left: 10px;
  font-size: 14px;
}

.more-comments:hover {
  color: #808080;
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

.post-date-and-comment {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
}

.comment-input {
  width: 70%;
  border: none;
  padding: 8px;
  outline: none;
  font-size: large;
}

.submit-icon {
  cursor: pointer;
  width: 24px;
  height: 24px;
  margin-left: 10px;
  color: rgb(52, 203, 32);
  transition: color 0.3s ease;
}

.submit-icon:hover {
  fill: rgb(177, 255, 167);
}

.post-date {
  margin-left: auto;
  font-size: 12px;
  color: gray;
}

/* 태블릿 대응 */
@media (max-width: $breakpoint-tablet) {
  .photo-header {
    padding: 8px;
  }

  .photo-actions .action-btn.info {
    width: 60px;
    height: 60px;
  }

  .share-icon,
  .chat-icon,
  .like-icon {
    width: 22px;
    height: 22px;
  }
}

/* 모바일 대응 */
@media (max-width: $breakpoint-mobile) {
  .photo-header {
    padding: 5px;
  }

  .photo-actions .action-btn.info {
    width: 60px;
    height: 60px;
  }

  .share-icon,
  .chat-icon,
  .like-icon {
    width: 20px;
    height: 20px;
  }
}
</style>
