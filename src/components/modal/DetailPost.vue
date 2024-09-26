<template>
  <div class="detail-post-modal">
    <!-- 좌측: 사진 및 기타 정보 -->
    <div class="left-section">
      <!-- 사진 파트 -->
      <div
        class="photo-section"
        :style="{
          backgroundImage: `url(${post.imageUrls[currentPhotoIndex]})`,
        }"
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
          <div class="photo-actions">
            <EllipsisHorizontalIcon
              class="action-btn info"
              @click="openModal"
            />
          </div>

          <!-- 모달 컴포넌트 -->
          <ActionModal :isVisible="isModalVisible" @close="closeModal" />
        </div>

        <!-- 좌우 클릭 영역 -->
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
          {{ post.likes.length }}
          <ChatBubbleBottomCenterTextIcon
            class="chat-icon"
            @click="toggleChat"
          />
          {{ post.comments.length }}
          <PaperAirplaneIcon class="share-icon" @click="toggleShare" />
        </div>

        <div class="post-caption">
          {{ post.caption }}
        </div>
      </div>
    </div>

    <!-- 우측: 댓글 파트 -->
    <div class="right-section">
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

      <!-- 댓글 입력 -->
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
  name: "DetailPost",
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

    const nextPhoto = () => {
      currentPhotoIndex.value =
        (currentPhotoIndex.value + 1) % props.post.imageUrls.length;
    };

    const previousPhoto = () => {
      currentPhotoIndex.value =
        (currentPhotoIndex.value - 1 + props.post.imageUrls.length) %
        props.post.imageUrls.length;
    };

    const toggleLike = () => {
      isLiked.value = !isLiked.value;
    };

    const toggleChat = () => {
      const inputElement = document.querySelector(
        ".comment-input"
      ) as HTMLInputElement;

      if (inputElement) {
        inputElement.focus();
        inputElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    };

    const toggleShare = () => {
      console.log("공유 클릭");
    };

    const openModal = () => {
      isModalVisible.value = true;
    };

    const closeModal = () => {
      isModalVisible.value = false;
    };

    const submitComment = () => {
      if (isCommentNotEmpty.value) {
        console.log("댓글 입력: ", commentInput.value);
        commentInput.value = ""; // 입력 필드 초기화
        isCommentNotEmpty.value = false; // 버튼 비활성화
      }
    };

    watch(commentInput, (newVal) => {
      isCommentNotEmpty.value = newVal.trim().length > 0;
    });

    return {
      currentPhotoIndex,
      showNavigation,
      nextPhoto,
      previousPhoto,
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

<style scoped>
.detail-post-modal {
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 1200px; /* 가로 길이 두 배로 늘리기 */
  margin: 20px auto;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
}

/* 좌측: 사진 및 기타 정보 */
.left-section {
  width: 70%; /* 좌측에 70% 차지 */
  padding-right: 10px;
  border-right: 1px solid #ddd;
}

/* 우측: 댓글 */
.right-section {
  width: 30%; /* 우측에 30% 차지 */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.photo-section {
  position: relative;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  min-height: 700px;
  background-color: black;
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
}

.navigation {
  position: absolute;
  top: 50%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  transform: translateY(-50%);
}

.nav-btn {
  background: rgba(0, 0, 0, 0.3);
  color: white;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 10px;
}

.text-section {
  padding: 15px;
}

.action-buttons {
  display: flex;
  gap: 10px;
  align-items: center;
}

.post-caption {
  margin-top: 10px;
  font-size: 16px;
  line-height: 1.4;
}

.right-section .comments-list {
  padding: 15px;
  overflow-y: auto;
  max-height: 500px;
}

.right-section .comment-item {
  margin-bottom: 10px;
}

.comment-user {
  font-weight: bold;
}

.comment-text {
  margin-left: 5px;
}

.post-date-and-comment {
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.comment-input {
  width: 70%;
  border: none;
  padding: 8px;
  outline: none;
}

.submit-icon {
  cursor: pointer;
  width: 24px;
  height: 24px;
  color: rgb(52, 203, 32);
}
</style>
