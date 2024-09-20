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
        #{{ hashtag.tag }} <span>({{ hashtag.count }})</span>
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
  border-radius: 10px;
  padding: 40px;
  margin-bottom: 40px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  text-align: center;
  max-width: 600px;
  margin: 0 auto; /* 가운데 정렬 */
}

.profile-section {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}

.profile-image {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 30px;
}

.profile-info {
  text-align: left;
}

.user-name {
  font-size: 26px;
  font-weight: bold;
  margin: 0;
}

.user-bio {
  font-size: 18px;
  color: #666;
  margin: 10px 0 0 0;
}

.stats-section {
  display: flex;
  justify-content: space-around;
  margin-bottom: 30px;
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
  margin-bottom: 30px;
}

.hashtag-item {
  background-color: white;
  border: 1px solid #60d360;
  color: black;
  border-radius: 20px;
  padding: 8px 12px;
  font-size: 16px;
  margin: 8px;
  display: flex;
  align-items: center;
}

.hashtag-item span {
  margin-left: 5px;
  font-size: 14px;
  color: gray;
}

.action-buttons {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

.block-btn {
  background-color: #f56464;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 12px 30px;
  font-size: 16px;
  cursor: pointer;
}

.block-btn:hover {
  background-color: #e05353;
}

.chain-btn {
  background-color: #60d360;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 12px 30px;
  font-size: 16px;
  cursor: pointer;
}

.chain-btn:hover {
  background-color: #50c350;
}
</style>
