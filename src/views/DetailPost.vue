<template>
  <div v-if="post" class="detail-post-modal">
    <!-- 좌측: 사진 및 기타 정보 -->
    <div class="left-section">
      <!-- 사진 파트 -->
      <div
        class="photo-section"
        :style="{
          backgroundImage: `url(${post.imageUrls[currentPhotoIndex]})`,
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
            <EllipsisHorizontalIcon
              class="action-btn info"
              @click="openModal"
            />
          </div>
          <!-- 모달 컴포넌트 -->
          <ActionModal
            :isVisible="isModalVisible"
            @close="closeModal"
            :postId="post.id"
            :authorName="post.author.username"
          />
        </div>

        <!-- 좌우 클릭 영역: showNavigation이 true일 때만 표시 -->
        <div class="navigation" v-if="showNavigation">
          <button class="nav-btn left" @click="previousPhoto">◀</button>
          <button class="nav-btn right" @click="nextPhoto">▶</button>
        </div>
      </div>
    </div>

    <!-- 우측: 댓글 -->
    <div class="right-section">
      <div class="text-section">
        <div class="action-buttons">
          <HeartIcon
            class="like-icon"
            :class="{ active: isLiked }"
            @click="toggleLike"
          />
          {{ post.likeCount }}
          <ChatBubbleBottomCenterTextIcon
            class="chat-icon"
            @click="toggleChat"
          />
          {{ post.activeCommentsCount }}
          <PaperAirplaneIcon class="share-icon" @click="toggleShare" />
        </div>

        <div class="post-caption">
          {{ post.caption }}
        </div>

        <div class="comments-summary">
          댓글 {{ post.activeCommentsCount }}개
          <span class="more-comments" @click="loadMoreComments">더보기</span>
        </div>
        <div class="comments-list">
          <div
            v-for="comment in post.comments"
            :key="comment.id"
            class="comment-item"
          >
            <span class="comment-user">{{ comment.author }}:</span>
            <span class="comment-text">{{ comment.content }}</span>
            <span class="comment-time">{{
              formatDate(comment.createdAt)
            }}</span>
          </div>
        </div>

        <div class="tag-list">
          <div
            v-for="(tag, index) in post.hashtags"
            :key="index"
            class="tag-item"
          >
            #{{ tag }}
          </div>
        </div>

        <div class="post-date-and-comment">
          <input
            type="text"
            class="comment-input"
            placeholder="댓글을 입력하세요"
            v-model="commentInput"
            @keypress.enter="submitComment"
            :id="'comment-input'"
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
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, onMounted, watch } from "vue";
import { IPost } from "@/interface/IModels";
import ActionModal from "@/components/modal/ActionModal.vue";
import {
  getPostById,
  createCommentDetail,
  updateLikeStatus,
} from "@/utils/api"; // API 호출 함수 import
import { useRouter } from "vue-router";
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
  setup() {
    const router = useRouter();
    const toast = useToast();
    const store = useStore(); // Vuex store 접근
    const currentUser = store.state.user; // 현재 로그인된 유저 정보 가져오기
    const isLiked = ref(false); // 좋아요 상태 (true/false)
    const likeCount = ref(0); // 좋아요 수
    const post = ref<IPost | null>(null); // 포스트 데이터
    const isModalVisible = ref(false);
    const currentPhotoIndex = ref(0);
    const showNavigation = ref(false);
    const commentInput = ref("");
    const isCommentNotEmpty = ref(false);

    const postId = ref<number | null>(null); // URL로부터 postId를 받아오기

    const loadPostData = async () => {
      try {
        const response = await getPostById(postId.value!); // API 호출
        post.value = response; // 응답 데이터를 포스트에 저장
        isLiked.value = post.value?.likedByCurrentUser || false;
      } catch (error) {
        console.error("게시글을 가져오는 데 실패했습니다.", error);
      }
    };

    watch(commentInput, (newVal) => {
      isCommentNotEmpty.value = newVal.trim().length > 0;
    });

    onMounted(() => {
      postId.value = Number(router.currentRoute.value.params.id); // URL에서 postId 추출
      loadPostData(); // 페이지 로드 시 데이터 불러오기
    });

    const toggleLike = async () => {
      try {
        // 포스트 ID가 undefined인 경우 처리
        if (!post.value?.id) {
          toast.error("포스트 ID가 없습니다.");
          return;
        }

        // 좋아요 상태 업데이트 API 호출
        const response = await updateLikeStatus(
          post.value.id,
          currentUser.user.id
        );

        // 서버에서 받은 응답으로 좋아요 상태와 수 업데이트
        isLiked.value = response.liked;
        likeCount.value = response.totalLikes;

        // 포스트 객체에 값 업데이트
        post.value.likeCount = likeCount.value;
        post.value.likedByCurrentUser = isLiked.value;

        // 좋아요 상태에 따라 토스트 메시지 표시
        if (isLiked.value) {
          toast.success("좋아요 추가!");
        } else {
          toast.info("좋아요 취소!");
        }

        console.log("Like toggled:", isLiked.value ? "Liked" : "Unliked");
      } catch (error) {
        console.error("Error toggling like:", error);
        toast.error("좋아요 상태 변경 중 오류가 발생했습니다.");
      }
    };

    const toggleShare = () => {
      console.log("쉐어클릭");
    };

    const toggleChat = () => {
      const inputElement = document.querySelector(
        `#comment-input`
      ) as HTMLInputElement;

      if (inputElement) {
        inputElement.focus();
        inputElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    };

    const openModal = () => {
      isModalVisible.value = true;
    };

    const closeModal = () => {
      isModalVisible.value = false;
    };

    const nextPhoto = () => {
      if (post.value) {
        currentPhotoIndex.value =
          (currentPhotoIndex.value + 1) % post.value.imageUrls.length;
      }
    };

    const previousPhoto = () => {
      if (post.value) {
        currentPhotoIndex.value =
          (currentPhotoIndex.value - 1 + post.value.imageUrls.length) %
          post.value.imageUrls.length;
      }
    };

    const formatDate = (date: Date) => {
      return new Date(date).toLocaleString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
    };

    const loadMoreComments = () => {
      toast.success("게시물 상세보기"); // 성공 시 토스트 메시지 띄우기
      const fullLink = `/detail/${post.value?.id}`; // postId를 props에서 가져오기
      router.push(fullLink); // Vue Router로 이동
    };

    const submitComment = async () => {
      if (
        isCommentNotEmpty.value &&
        currentUser &&
        post.value &&
        post.value.id !== undefined
      ) {
        try {
          const commentData = {
            authorId: currentUser.user.id,
            postId: post.value.id,
            content: commentInput.value,
          };

          const response = await createCommentDetail(commentData); // 댓글 생성

          // 댓글 목록을 새로 받아서 업데이트
          post.value.comments = response.comments;

          // 댓글 수를 갱신 (commentCount 변경)
          post.value.activeCommentsCount = response.activeCommentsCount;

          // 입력 필드 초기화 및 버튼 비활성화
          commentInput.value = "";
          isCommentNotEmpty.value = false;

          // 댓글 작성 완료 토스트 메시지 표시
          toast.success("댓글 작성 완료!");
        } catch (error) {
          console.error("Error creating comment:", error);
        }
      } else {
        console.log(currentUser.user.id, post.value?.id, commentInput.value);
        console.error("Cannot submit comment: Missing user, post, or content");
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
      loadMoreComments,
      commentInput,
      isCommentNotEmpty,
      toggleChat,
      toggleShare,
      submitComment,
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

.detail-post-modal {
  display: flex;
  flex-direction: row;
  width: 90%;
  height: 90%;
  max-width: 1200px;
  margin: 20px 0;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
}

.left-section {
  width: 60%;
  border-right: 1px solid #ddd;
}

.right-section {
  width: 40%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
}

.photo-section {
  position: relative;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  min-height: 800px;
  height: 100%;
  background-color: black;
}

.photo-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
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
  padding: 15px 15px 0;
  height: 100%;
}

.chat-icon {
  width: 30px;
  height: 30px;
  fill: #dddddd00;
}

.chat-icon:hover {
  width: 25px;
  color: rgb(52, 203, 32);
}

.like-icon {
  width: 30px;
  height: 30px;
}

.like-icon.active {
  fill: rgb(253, 53, 53);
}

.like-icon:hover {
  width: 25px;
  color: rgb(212, 90, 163);
}

.share-icon {
  width: 30px;
  height: 30px;
  fill: #dddddd00;
}

.share-icon:hover {
  width: 25px;
  color: rgb(65, 176, 255);
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
  position: absolute;
  bottom: 10px;
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
  width: 30px;
  height: 30px;
  color: rgb(52, 203, 32);
}

.submit-icon:hover {
  fill: rgb(177, 255, 167);
}

.post-date {
  margin-left: auto;
  font-size: 12px;
  color: gray;
}

.tag-list {
  display: flex;
  flex-wrap: wrap; /* 태그가 넘칠 경우 다음 줄로 이동하도록 설정 */
  gap: 5px; /* 태그들 간의 간격 */
  max-height: 150px; /* 최대 높이 설정 (3줄 기준, 필요에 따라 조정) */
  overflow-y: auto; /* 세로 스크롤이 생기도록 설정 */
  margin-top: 10px;
  margin-bottom: 50px; /* 리스트에 바텀 마진 추가 */
}

.tag-item {
  padding: 4px 8px;
  background-color: white;
  width: fit-content; /* 내용에 맞게 너비 조정 */
  border: 2px solid #9dbd9d; /* 초록색 선 */
  color: #7c7b7b;
  border-radius: 15px;
  display: flex;
  align-items: center;
  font-weight: bolder;
}

.comments-summary {
  margin-top: 10px;
  font-weight: bold;
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
  .detail-post-modal {
    margin-top: 0;
    width: 100%;
    height: auto;
    min-height: 300px; /* 최소 높이 설정, 필요에 따라 조정 */
    display: flex;
    flex-direction: column; /* 자식 요소들을 세로로 배치 */
    justify-content: flex-start; /* 세로 정렬: 요소가 상단부터 정렬되도록 설정 */
    align-items: center; /* 가로 중앙 정렬 */
  }

  /* 레프트, 라이트 섹션을 위아래로 배치 */
  .left-section,
  .right-section {
    width: 100%;
    display: flex;
    flex-direction: column; /* 세로 정렬 */
  }

  .left-section {
    border-bottom: 1px solid #ddd; /* 구분선 추가 */
  }

  .right-section {
    display: flex;
    flex-direction: column; /* 세로로 배치 */
    justify-content: flex-start; /* 요소들이 위에서부터 배치되도록 설정 */
    height: auto; /* height를 auto로 설정하여 동적으로 크기 조정 */
  }

  .photo-header {
    padding: 5px;
  }

  .photo-actions .action-btn.info {
    width: 60px;
    height: 60px;
  }

  .photo-section {
    position: relative;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    width: 100%;
    min-height: 800px;
    height: 100%;
    background-color: black;
  }

  .share-icon,
  .chat-icon,
  .like-icon {
    width: 20px;
    height: 20px;
  }
}
</style>
