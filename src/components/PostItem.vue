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
          <ProfileView :username="post.author" :size="80" class="user-icon" />
          <span class="user-name">{{ post.author }}</span>
        </div>
        <div class="photo-actions">
          <EllipsisHorizontalIcon class="action-btn info" @click="openModal" />
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

    <!-- 글 파트 -->
    <div class="text-section">
      <div class="action-buttons">
        <HeartIcon
          class="like-icon"
          :class="{ active: isLiked }"
          @click="toggleLike"
        />
        {{ localPost.likeCount }}
        <!-- toggleChat 호출 시 post를 넘겨줍니다 -->
        <ChatBubbleBottomCenterTextIcon
          class="chat-icon"
          @click="toggleChat(post)"
        />
        {{ commentCount }}
        <PaperAirplaneIcon class="share-icon" @click="toggleShare" />
      </div>

      <div class="post-caption">
        {{ post.caption }}
      </div>

      <div class="comments-summary">
        댓글 {{ commentCount }}개
        <span class="more-comments" @click="loadMoreComments">더보기</span>
      </div>
      <div class="comments-list">
        <div
          v-for="comment in localPost.comments || []"
          :key="comment.id"
          class="comment-item"
        >
          <span class="comment-user">{{ comment.author }}:</span>
          <span class="comment-text">{{ comment.content }}</span>
          <span class="comment-time">{{ formatDate(comment.createdAt) }}</span>
        </div>
      </div>

      <div class="post-date-and-comment">
        <!-- input에 id를 동적으로 설정 -->
        <input
          type="text"
          class="comment-input"
          placeholder="댓글을 입력하세요"
          v-model="commentInput"
          @keypress.enter="submitComment"
          :id="'comment-input-' + post.id"
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
import { createComment, updateLikeStatus } from "@/utils/api";
import { useStore } from "vuex"; // Vuex 스토어 사용
import { useToast } from "vue-toastification";
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
    const toast = useToast();
    const store = useStore(); // Vuex 스토어 접근
    const currentUser = store.state.user; // 현재 로그인된 유저 정보 가져오기
    const isLiked = ref(false); // 좋아요 상태 (true/false)
    const likeCount = ref(0); // 좋아요 수
    const isModalVisible = ref(false);
    const currentPhotoIndex = ref(0);
    const showNavigation = ref(false);
    const commentInput = ref("");
    const isCommentNotEmpty = ref(false);
    const commentCount = ref(0);

    const localPost = ref({
      ...props.post, // props.post 값을 그대로 가져와 localPost에 저장
      comments: [...(props.post.comments || [])], // comments 배열 복사
      commentCount: props.post.activeCommentsCount || 0, // 댓글 수를 localPost에 포함
    });

    const loadLikeInfo = (post: any) => {
      // likeCount와 likedByCurrentUser 초기화
      likeCount.value = post.likeCount || 0; // `likeCount` 값을 받아와서 초기화
      isLiked.value = post.likedByCurrentUser || false; // `likedByCurrentUser` 값을 받아와서 초기화
    };

    loadLikeInfo(localPost.value); // post의 likeCount와 likedByCurrentUser를 초기화

    watch(likeCount, (newVal) => {
      localStorage.setItem("likeCount", String(newVal)); // likeCount 값 업데이트
    });

    const loadCommentCount = (post: any) => {
      // localPost에서 바로 값을 가져오고, localStorage의 값을 덮어쓰지 않음
      commentCount.value = post.activeCommentsCount || 0;
      console.log("Initial comment count:", commentCount.value); // 확인용 로그
    };

    loadCommentCount(localPost.value); // localPost의 activeCommentsCount 값을 초기화

    watch(commentCount, (newVal) => {
      localStorage.setItem("activeCommentsCount", String(newVal)); // activeCommentsCount 값 업데이트
    });

    const loadMoreComments = () => {
      console.log("loadMoreComments");
    };

    const toggleShare = () => {
      console.log("쉐어클릭");
    };

    const toggleChat = (post: any) => {
      console.log("챗클릭");

      // 해당 포스트의 댓글 입력 필드에 포커스를 주기 위해 id를 동적으로 지정
      const inputElement = document.querySelector(
        `#comment-input-${post.id}`
      ) as HTMLInputElement;

      if (inputElement) {
        inputElement.focus();
        inputElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    };

    const toggleLike = async () => {
      try {
        const response = await updateLikeStatus(
          localPost.value.id,
          currentUser.user.id,
          !isLiked.value // 좋아요 상태를 반대로 변경
        );

        // 서버 응답에서 받은 값으로 상태 업데이트
        likeCount.value = response.totalLikes; // 좋아요 수
        isLiked.value = response.liked; // 좋아요 상태

        // 화면 업데이트를 위한 상태 반영
        localPost.value.likeCount = likeCount.value;
        localPost.value.likedByCurrentUser = isLiked.value;

        console.log("Like toggled:", isLiked.value ? "Liked" : "Unliked");

        if (isLiked.value) {
          toast.success("좋아요 추가!");
        } else {
          toast.info("좋아요 취소!");
        }
      } catch (error) {
        console.error("Error toggling like:", error);
      }
    };

    const openModal = () => {
      isModalVisible.value = true;
    };

    const closeModal = () => {
      isModalVisible.value = false;
    };

    const nextPhoto = () => {
      currentPhotoIndex.value =
        (currentPhotoIndex.value + 1) % localPost.value.imageUrls.length;
    };

    const previousPhoto = () => {
      currentPhotoIndex.value =
        (currentPhotoIndex.value - 1 + localPost.value.imageUrls.length) %
        localPost.value.imageUrls.length;
    };

    const formatDate = (date: Date) => {
      return new Date(date).toLocaleDateString();
    };

    watch(commentInput, (newVal) => {
      isCommentNotEmpty.value = newVal.trim().length > 0;
    });

    watch(commentCount, (newVal) => {
      localStorage.setItem("activeCommentsCount", String(newVal)); // activeCommentsCount 값 업데이트
    });

    const submitComment = async () => {
      if (
        isCommentNotEmpty.value &&
        currentUser &&
        localPost.value &&
        localPost.value.id !== undefined
      ) {
        try {
          const commentData = {
            authorId: currentUser.user.id,
            postId: localPost.value.id,
            content: commentInput.value,
          };

          const response = await createComment(commentData); // 댓글 생성

          // 댓글 목록을 새로 받아서 업데이트
          localPost.value.comments = response.comments;

          // 댓글 수를 갱신 (commentCount 변경)
          commentCount.value = response.activeCommentsCount;

          // 입력 필드 초기화 및 버튼 비활성화
          commentInput.value = "";
          isCommentNotEmpty.value = false;

          // 댓글 작성 완료 토스트 메시지 표시
          toast.success("댓글 작성 완료!");
        } catch (error) {
          console.error("Error creating comment:", error);
        }
      } else {
        console.error("Cannot submit comment: Missing user, post, or content");
      }
    };

    return {
      localPost,
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
      commentCount,
      likeCount,
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

.comment-time {
  margin-left: 5px;
  font-size: 0.6em; /* comment-text의 반절 크기 */
  color: #aaa; /* 연한 회색 */
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
