<template>
  <div class="connection-view">
    <div class="centered-box">
      <!-- 더미 데이터를 이용한 ConnectionItem 렌더링 -->
      <ConnectionItem
        v-for="connection in dummyConnections"
        :key="connection.id"
        :user="connection"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { user1, user2 } from "@/data/dubbyModel"; // dubbyModel에서 유저 데이터를 임포트
import ConnectionItem from "@/components/ConnectionItem.vue"; // ConnectionItem 컴포넌트 임포트

export default defineComponent({
  name: "ConnectionView",
  components: {
    ConnectionItem,
  },
  setup() {
    const dummyConnections = [user1, user2]; // dubbyModel의 유저 데이터 사용
    return {
      dummyConnections,
    };
  },
});
</script>

<style lang="scss" scoped>
/* SCSS 변수 선언 */
$breakpoint-mobile: 640px;
$breakpoint-tablet: 1024px;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.connection-view {
  display: flex;
  justify-content: center;
  height: auto;
  min-height: 100vh;
  padding: 0;
}

.centered-box {
  width: 100%;
  max-width: 540px;
  min-width: 300px;
  padding: 0px;
  box-sizing: border-box;
}

@media (min-width: $breakpoint-tablet) {
  .connection-view {
    justify-content: flex-start;
  }
  .centered-box {
    max-width: 540px;
    min-width: 500px;
    margin-right: calc(100vw * 0.2); /* 오른쪽 마진 */
  }
}
</style>
