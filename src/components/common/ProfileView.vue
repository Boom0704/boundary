<template>
  <div
    class="profile-container"
    @click="goToProfile"
    @mouseover="showUsernameOnHover"
    @mouseleave="hideUsernameOnLeave"
  >
    <img
      :src="profilePictureUrl"
      :alt="`${username}'s profile picture`"
      :style="{ width: `${size}px`, height: `${size}px` }"
      class="profile-picture"
    />
    <transition name="fade">
      <span v-if="showUsername" class="username">{{ username }}</span>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "ProfileView",
  props: {
    username: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const profilePictureUrl = ref(""); // 빈 프로필 URL
    const showUsername = ref(false);
    const router = useRouter();

    // 가짜 API 요청을 통해 프로필 사진 URL을 가져오는 메소드
    const fetchProfilePicture = () => {
      console.log(`Fetching profile picture for ${props.username}`);
      // 테스트용 더미 URL을 반환
      profilePictureUrl.value =
        "https://i.namu.wiki/i/FTawFvlFB7P2h9VpxaDMM-G3p6Go158fUdf0V4wL4k7i1ZPSKndSWl-vEDBZecPOAFNXir7bZnbykltJGPXgsA.webp";
    };

    const goToProfile = () => {
      router.push(`/profile/${props.username}`);
    };

    // 마우스 호버 이벤트로 username 표시
    const showUsernameOnHover = () => {
      showUsername.value = true;
    };

    const hideUsernameOnLeave = () => {
      showUsername.value = false;
    };

    onMounted(() => {
      fetchProfilePicture(); // 컴포넌트가 로드되면 프로필 사진을 가져옴
    });

    return {
      profilePictureUrl,
      showUsername,
      goToProfile,
      showUsernameOnHover,
      hideUsernameOnLeave,
    };
  },
});
</script>

<style scoped>
.profile-container {
  position: relative;
  cursor: pointer;
  display: inline-block;
}

.profile-picture {
  border-radius: 50%;
  object-fit: cover;
  transition: opacity 0.3s ease;
}

.username {
  position: absolute;
  bottom: 5px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 5px;
  border-radius: 5px;
  font-size: 14px;
  opacity: 0.8;
  transition: opacity 0.3s ease;
  z-index: 99;

  white-space: nowrap; /* 무조건 한 줄로 표시 */
  overflow: hidden; /* 넘치는 텍스트는 숨김 */
  text-overflow: ellipsis; /* ...으로 표시 */
  max-width: 150px; /* 최대 너비를 설정 */
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
