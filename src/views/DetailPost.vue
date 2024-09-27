<template>
  <div class="post-container">
    <!-- 사진과 글 파트 -->
    <div class="main-section">
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
              :size="100"
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

        <!-- 좌우 클릭 영역: showNavigation이 true일 때만 표시 -->
        <div class="navigation" v-if="showNavigation">
          <button class="nav-btn left" @click="previousPhoto">◀</button>
          <button class="nav-btn right" @click="nextPhoto">▶</button>
        </div>
      </div>
    </div>

    <!-- 댓글 파트 -->
    <div class="comments-section">
      <div class="action-buttons">
        <HeartIcon
          class="like-icon"
          :class="{ active: isLiked }"
          @click="toggleLike"
        />
        {{ post.likes.length }}
        <ChatBubbleBottomCenterTextIcon class="chat-icon" @click="toggleChat" />
        {{ post.comments.length }}
        <PaperAirplaneIcon class="share-icon" @click="toggleShare" />
      </div>

      <div class="post-caption">
        {{ post.caption }}
      </div>

      <div class="post-date">
        <span>{{ formatDate(post.createdAt) }}</span>
      </div>
      <div class="comments-header">댓글 {{ post.comments.length }}개</div>
      <div class="comments-list">
        <CommentsModel
          v-for="comment in post.comments"
          :key="comment.id"
          :comment="comment"
        />
      </div>
    </div>

    <!-- 댓글 입력 파트: 최하단 고정 -->
    <div class="comment-input-section fixed-comment-input">
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
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { IPost } from "@/interface/IModels";
import { postByUser1 } from "@/data/dubbyModel"; // 더미 데이터 import
import ActionModal from "@/components/modal/ActionModal.vue";
import CommentsModel from "@/components/CommentsModel.vue";
import {
  HeartIcon,
  PaperAirplaneIcon,
  EllipsisHorizontalIcon,
  ChatBubbleBottomCenterTextIcon,
} from "@heroicons/vue/24/outline";
import ProfileView from "@/components/common/ProfileView.vue";
export default defineComponent({
  name: "DetailPost",
  setup() {
    const post = ref<IPost>(postByUser1); // 더미 데이터로 초기화
    const isLiked = ref(false);
    const isModalVisible = ref(false);
    const currentPhotoIndex = ref(0);
    const showNavigation = ref(false);
    const commentInput = ref("");
    const isCommentNotEmpty = ref(false);

    const toggleShare = () => {
      console.log("쉐어클릭");
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

    const toggleLike = () => {
      isLiked.value = !isLiked.value;
    };

    const openModal = () => {
      isModalVisible.value = true;
    };

    const closeModal = () => {
      isModalVisible.value = false;
    };

    const nextPhoto = () => {
      currentPhotoIndex.value =
        (currentPhotoIndex.value + 1) % post.value.imageUrls.length;
    };

    const previousPhoto = () => {
      currentPhotoIndex.value =
        (currentPhotoIndex.value - 1 + post.value.imageUrls.length) %
        post.value.imageUrls.length;
    };

    const formatDate = (date: Date) => {
      return new Date(date).toLocaleDateString();
    };

    watch(commentInput, (newVal) => {
      isCommentNotEmpty.value = newVal.trim().length > 0;
    });

    const submitComment = () => {
      if (isCommentNotEmpty.value) {
        commentInput.value = ""; // 입력 필드 초기화
        isCommentNotEmpty.value = false; // 버튼 비활성화
      }
    };

    return {
      post,
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
    };
  },
  components: {
    HeartIcon,
    ChatBubbleBottomCenterTextIcon,
    PaperAirplaneIcon,
    EllipsisHorizontalIcon,
    ProfileView,
    ActionModal,
    CommentsModel,
  },
});
</script>

<style lang="scss" scoped>
.post-container {
  display: flex;
  max-width: 1200px;
  margin: 10vh auto;
  height: calc(100vh - 80px); /* 화면 전체 높이를 가득 채우기 위해 수정 */
  background-color: #fafafa;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  position: relative;
}

.main-section {
  display: flex;
  flex-direction: column;
  width: 70%;
  height: 100%;
  background-color: white;
}

.comments-section {
  display: flex;
  flex-direction: column;
  width: 30%;
  background-color: #ffffff;
  border-left: 1px solid #ddd;
  overflow-y: auto;
  padding: 20px;
}

.photo-section {
  position: relative;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  height: 100%;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
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
  box-sizing: border-box;
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

.photo-actions .action-btn.info {
  width: 60px;
  height: 60px;
  color: #fff;
  cursor: pointer;
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
  flex-grow: 1;
  padding: 15px;
  position: relative;
  overflow-y: auto; /* 글 파트가 길어질 때 스크롤 */
}

.comments-header {
  margin-top: 12px;
  font-weight: 500;
  font-weight: bold;
}

.comments-list {
  margin-top: 10px;
}

.post-caption {
  margin-top: 10px;
}

.post-date {
  position: absolute;
  right: 15px;
  bottom: 10px;
  font-size: 20px;
  color: gray;
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

/* 댓글 입력창을 고정하고 좌우 마진 추가 */
.fixed-comment-input {
  position: fixed;
  bottom: 0;
  width: calc(100% - 20px);
  background-color: white;
  display: flex;
  align-items: center;
  padding: 10px;
  margin: 0 10px;
  box-shadow: 0 -1px 5px rgba(0, 0, 0, 0.1);
}

.comment-input {
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.submit-icon {
  margin-left: 10px;
  cursor: pointer;
  width: 24px;
  height: 24px;
  color: rgb(52, 203, 32);
}

/* 모바일 대응 */
@media (max-width: 768px) {
  .post-container {
    flex-direction: column;
    height: auto;
  }
  .main-section,
  .comments-section {
    width: 100%;
  }
  .comments-section {
    height: auto;
    max-height: 300px;
  }
}
</style>
