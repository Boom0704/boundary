<template>
  <div class="connection-item">
    <!-- 프로필 섹션 -->
    <div class="profile-section">
      <img
        :src="
          user.visibility === 'full' ? user.profilePictureUrl : defaultImage
        "
        :alt="`${user.username}'s profile picture`"
        class="profile-image"
      />
      <div class="profile-info">
        <h2 class="user-name">{{ user.username }} ({{ user.age }}세)</h2>
        <p class="user-bio">{{ user.bio }}</p>
      </div>
    </div>

    <!-- 팔로워/팔로잉/게시글 섹션 -->
    <div class="stats-section">
      <div class="stat-item">
        <strong>{{ user.posts.length }}</strong>
        <span>Posts</span>
      </div>
      <div class="stat-item">
        <strong>{{ user.followers.length }}</strong>
        <span>Followers</span>
      </div>
      <div class="stat-item">
        <strong>{{ user.following.length }}</strong>
        <span>Following</span>
      </div>
    </div>

    <!-- 해시태그 섹션 -->
    <div class="hashtags-section">
      <div
        v-for="(hashtag, index) in user.hashtags"
        :key="index"
        class="hashtag-item"
      >
        {{ hashtag.tag }} <span>({{ hashtag.count }})</span>
      </div>
    </div>

    <!-- 팔로워 이미지 리스트 박스 -->
    <div class="follower-box">
      <div class="follower-list">
        <div
          v-for="(follower, index) in user.followers"
          :key="index"
          class="follower-item"
        >
          <img
            :src="follower.profilePictureUrl"
            alt="Follower"
            class="follower-image"
          />
        </div>
      </div>
    </div>

    <!-- 액션 버튼 -->
    <div class="action-buttons">
      <button class="block-btn">Block</button>
      <button class="chain-btn">Chain</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { IUser } from "@/interface/IModels"; // IUser 인터페이스 가져오기

export default defineComponent({
  name: "ConnectionItem",
  props: {
    user: {
      type: Object as PropType<IUser>,
      required: true,
    },
  },
  setup(props) {
    const defaultImage =
      props.user.gender === "male"
        ? require("@/assets/man.png")
        : require("@/assets/woman.png");

    return {
      defaultImage,
    };
  },
});
</script>

<style scoped>
.connection-item {
  background-color: #e7f5e7;
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  text-align: center;
  max-width: 600px;
  margin: 0 auto; /* 가운데 정렬 */
  padding-bottom: 30px; /* 하단 여백 추가 */
}

.profile-section {
  display: flex;
  flex-direction: column; /* 사진과 정보가 세로로 배치되도록 설정 */
  align-items: center;
  margin-bottom: 30px;
}

.profile-image {
  width: 400px; /* 300x300 크기로 조정 */
  height: 400px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 20px; /* 이미지와 텍스트 사이 간격 추가 */
}

.profile-info {
  text-align: center; /* 텍스트가 중앙에 배치되도록 조정 */
}

.user-name {
  font-size: 28px;
  font-weight: bold;
  margin: 0;
}

.user-bio {
  font-size: 20px;
  color: #666;
  margin: 10px 0 0 0;
}

.stats-section {
  display: flex;
  justify-content: space-around;
  margin-bottom: 10px;
}

.stat-item {
  text-align: center;
}

.stat-item strong {
  display: block;
  font-size: 24px;
  font-weight: bold;
}

.stat-item span {
  font-size: 16px;
  color: #666;
}

.hashtags-section {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 20px;
  gap: 4px;
}

.hashtag-item {
  background-color: white;
  border: 1px solid #60d360;
  color: black;
  border-radius: 20px;
  padding: 8px 12px;
  font-size: 16px;
  display: flex;
  align-items: center;
}

.hashtag-item span {
  margin-left: 5px;
  font-size: 14px;
  color: gray;
}

.follower-box {
  max-width: 500px;
  height: auto;
  margin: 0 auto;
  background-color: white;
  border: 2px solid #60d360;
  border-radius: 30px;
  /* padding: 20px; */
  overflow-x: auto;
  display: flex;
  justify-content: center;
}

.follower-list {
  display: flex;
  gap: 15px; /* 이미지 사이 간격 */
  padding-left: 150px;
}

.follower-item {
  flex-shrink: 0; /* 이미지가 가로로 계속 늘어나게 유지 */
}

.follower-image {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
}

.action-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px; /* 버튼을 더 아래로 위치 */
}

.block-btn,
.chain-btn {
  background-color: #f56464;
  color: white;
  border: none;
  border-radius: 30px; /* 버튼을 더 둥글게 */
  padding: 15px 50px; /* 버튼을 더 크게 */
  font-size: 30px; /* 텍스트 크기 증가 */
  cursor: pointer;
}

.block-btn:hover {
  background-color: #e05353;
}

.chain-btn {
  background-color: #60d360;
}

.chain-btn:hover {
  background-color: #50c350;
}

/* 아이템 사이의 간격을 구분하기 위해 패딩 추가 */
.connection-item + .connection-item {
  margin-top: 50px; /* 아이템 간 구분을 위한 여백 */
}
</style>
