<!--<template>-->
<!--  <div class="profile-container">-->
<!--    &lt;!&ndash; 데이터부 &ndash;&gt;-->
<!--    <div class="data-section">-->
<!--      <div class="profile-picture">-->
<!--        <img :src="user.profilePictureUrl" alt="Profile Picture" />-->
<!--      </div>-->
<!--      <div class="user-info">-->
<!--        <h2>{{ user.username }} ({{ user.age }}세)</h2>-->
<!--        <p class="bio">{{ user.bio }}</p>-->
<!--        &lt;!&ndash; 프로필 공개 상태 표시 &ndash;&gt;-->
<!--        <p class="visibility">Profile visibility: {{ visibilityLabel }}</p>-->
<!--        <div class="tags">-->
<!--          <span v-for="tag in user.hashtags" :key="tag.tag" class="tag-item">-->
<!--            {{ tag.tag }} ({{ tag.count }})-->
<!--          </span>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->

<!--    &lt;!&ndash; 게시물부 &ndash;&gt;-->
<!--    <div class="post-section">-->
<!--      &lt;!&ndash; 세팅파트 &ndash;&gt;-->
<!--      <div class="settings">-->
<!--        <input type="range" v-model="gridCount" min="1" :max="maxGridCount" />-->
<!--      </div>-->

<!--      &lt;!&ndash; 선택파트 &ndash;&gt;-->
<!--      <div class="selection">-->
<!--        <button-->
<!--          @click="currentView = 'posts'"-->
<!--          :class="{ active: currentView === 'posts' }"-->
<!--        >-->
<!--          Posts-->
<!--        </button>-->
<!--        <button-->
<!--          @click="currentView = 'friends'"-->
<!--          :class="{ active: currentView === 'friends' }"-->
<!--        >-->
<!--          Friends-->
<!--        </button>-->
<!--        <button-->
<!--          @click="currentView = 'hashtags'"-->
<!--          :class="{ active: currentView === 'hashtags' }"-->
<!--        >-->
<!--          Hashtags-->
<!--        </button>-->
<!--      </div>-->

<!--      &lt;!&ndash; 선택한 파트 하단 블록 &ndash;&gt;-->
<!--      <div-->
<!--        class="selection-indicator"-->
<!--        :style="{ left: currentViewPosition + '%' }"-->
<!--      ></div>-->

<!--      &lt;!&ndash; 보여주는 파트 &ndash;&gt;-->
<!--      <div-->
<!--        v-if="currentView === 'posts'"-->
<!--        class="grid"-->
<!--        :style="{ gridTemplateColumns: `repeat(${gridCount}, 1fr)` }"-->
<!--      >-->
<!--        <div v-for="post in user.posts" :key="post.id" class="grid-item">-->
<!--          <img :src="post.imageUrls[0]" alt="Post Image" />-->
<!--        </div>-->
<!--      </div>-->

<!--      <div-->
<!--        v-else-if="currentView === 'friends'"-->
<!--        class="grid"-->
<!--        :style="{ gridTemplateColumns: `repeat(${gridCount}, 1fr)` }"-->
<!--      >-->
<!--        <div-->
<!--          v-for="follower in user.friends"-->
<!--          :key="follower.id"-->
<!--          class="grid-item"-->
<!--        >-->
<!--          <img :src="follower.profilePictureUrl" alt="Follower Profile" />-->
<!--        </div>-->
<!--      </div>-->

<!--      <div-->
<!--        v-else-if="currentView === 'hashtags'"-->
<!--        class="grid"-->
<!--        :style="{ gridTemplateColumns: `repeat(${gridCount}, 1fr)` }"-->
<!--      >-->
<!--        <div-->
<!--          v-for="hashtag in user.hashtags"-->
<!--          :key="hashtag.tag"-->
<!--          class="grid-item"-->
<!--        >-->
<!--          <HashTag-->
<!--            :tag="hashtag.tag"-->
<!--            :count="hashtag.count"-->
<!--            :line="gridCount"-->
<!--          />-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script lang="ts">-->
<!--import { defineComponent, ref, computed, onMounted } from "vue";-->
<!--import { ProfileVisibility } from "@/interface/IModels";-->
<!--import HashTag from "@/components/HashTag.vue";-->

<!--export default defineComponent({-->
<!--  name: "ProfileView",-->
<!--  components: {-->
<!--    HashTag,-->
<!--  },-->
<!--  setup() {-->
<!--    onMounted(() => {-->
<!--      window.scrollTo(0, 0);-->
<!--    });-->
<!--    const user = ref(user1);-->
<!--    const gridCount = ref(3);-->
<!--    const maxGridCount = ref(4);-->
<!--    const currentView = ref("posts");-->

<!--    const currentViewPosition = computed(() => {-->
<!--      if (currentView.value === "posts") return 0;-->
<!--      if (currentView.value === "friends") return 33.33;-->
<!--      return 66.66;-->
<!--    });-->

<!--    const visibilityLabel = computed(() => {-->
<!--      return user.value.visibility;-->
<!--    });-->

<!--    return {-->
<!--      user,-->
<!--      gridCount,-->
<!--      maxGridCount,-->
<!--      currentView,-->
<!--      currentViewPosition,-->
<!--      visibilityLabel,-->
<!--    };-->
<!--  },-->
<!--});-->
<!--</script>-->

<!--<style lang="scss" scoped>-->
<!--$breakpoint-mobile: 640px;-->
<!--$breakpoint-tablet: 1024px;-->

<!--.profile-container {-->
<!--  padding: 20px;-->
<!--  border-bottom: 1px solid #d3d3d3;-->
<!--  margin: 5% 0;-->
<!--}-->

<!--/* 데이터부 */-->
<!--.data-section {-->
<!--  display: flex;-->
<!--  align-items: center;-->
<!--  justify-content: space-between;-->
<!--  @media (max-width: $breakpoint-mobile) {-->
<!--    flex-direction: column;-->
<!--  }-->
<!--}-->

<!--.profile-picture img {-->
<!--  border-radius: 50%;-->
<!--  max-width: 500px;-->
<!--  height: 440px;-->
<!--  @media (max-width: $breakpoint-tablet) {-->
<!--    min-width: 320px;-->
<!--    height: auto;-->
<!--  }-->
<!--  @media (max-width: $breakpoint-mobile) {-->
<!--    min-width: 400px;-->
<!--    height: auto;-->
<!--  }-->
<!--}-->

<!--.user-info {-->
<!--  margin-right: 7%;-->
<!--  margin-left: 20px;-->
<!--  @media (max-width: $breakpoint-tablet) {-->
<!--    margin-left: 0;-->
<!--  }-->
<!--  @media (max-width: $breakpoint-mobile) {-->
<!--    margin-left: 0;-->
<!--    margin-right: 0;-->
<!--    margin-top: 20px;-->
<!--    text-align: center;-->
<!--  }-->
<!--}-->

<!--.bio {-->
<!--  margin-top: 30px;-->
<!--}-->

<!--.tags {-->
<!--  display: flex;-->
<!--  flex-wrap: wrap;-->
<!--  gap: 10px; /* 태그 간의 간격 */-->
<!--}-->

<!--.tag-item {-->
<!--  padding: 5px 10px;-->
<!--  background-color: white;-->
<!--  border: 2px solid #60d360; /* 2px 두께의 초록색 선 */-->
<!--  color: black;-->
<!--  border-radius: 20px;-->
<!--  display: flex;-->
<!--  align-items: center;-->
<!--  font-weight: bolder;-->
<!--  gap: 5px;-->
<!--  transition: background-color 0.3s ease; /* 배경색 전환 효과 */-->
<!--}-->

<!--.tag-item:hover {-->
<!--  background-color: #60d360; /* 호버 시 초록색 배경 */-->
<!--  color: white; /* 호버 시 글자 색을 흰색으로 변경 */-->
<!--}-->
<!--.visibility {-->
<!--  font-size: 14px;-->
<!--  color: #666;-->
<!--  margin-top: 10px;-->
<!--}-->

<!--/* 게시물부 */-->
<!--.post-section {-->
<!--  margin-top: 30px;-->
<!--  border-top: 1px solid #d3d3d3;-->
<!--  padding-top: 10px;-->
<!--}-->

<!--.settings {-->
<!--  display: flex;-->
<!--  justify-content: flex-end;-->
<!--  margin-bottom: 20px;-->
<!--}-->

<!--input[type="range"] {-->
<!--  accent-color: #4caf50;-->
<!--}-->

<!--.selection {-->
<!--  display: flex;-->
<!--  justify-content: space-around;-->
<!--}-->

<!--.selection button {-->
<!--  flex: 1;-->
<!--  font-size: 18px;-->
<!--  background-color: transparent;-->
<!--  border: none;-->
<!--  cursor: pointer;-->
<!--}-->

<!--.selection button.active {-->
<!--  font-weight: bold;-->
<!--  color: #000;-->
<!--}-->

<!--.selection-indicator {-->
<!--  width: 33.33%;-->
<!--  height: 4px;-->
<!--  background-color: #000;-->
<!--  transition: left 0.3s ease;-->
<!--  position: relative;-->
<!--  top: 5px;-->
<!--}-->

<!--/* 그리드 */-->
<!--.grid {-->
<!--  display: grid;-->
<!--  gap: 10px;-->
<!--  margin-top: 20px;-->
<!--}-->

<!--.grid-item img {-->
<!--  width: 100%;-->
<!--  height: 100%;-->
<!--  object-fit: cover;-->
<!--  display: block;-->
<!--}-->

<!--.grid-item {-->
<!--  position: relative;-->
<!--  padding-top: 100%;-->
<!--}-->

<!--.grid-item img {-->
<!--  position: absolute;-->
<!--  top: 0;-->
<!--  left: 0;-->
<!--  width: 100%;-->
<!--  height: 100%;-->
<!--  object-fit: cover;-->
<!--}-->
<!--</style>-->
<template>
  <div>안녕하세요, Vue!</div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
/* 스타일은 필요에 따라 추가하세요 */
</style>
