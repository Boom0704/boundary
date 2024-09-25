<template>
  <div
    :class="['scroll-container', { 'horizontal-scroll': isHorizontal }]"
    ref="scrollContainer"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";

export default defineComponent({
  name: "ScrollComponent",
  props: {
    isHorizontal: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const scrollContainer = ref(null);

    onMounted(() => {
      const container = scrollContainer.value as unknown as HTMLElement;
      container.addEventListener("wheel", (e) => {
        if (
          container &&
          e.deltaY &&
          container.scrollWidth > container.clientWidth
        ) {
          container.scrollLeft += e.deltaY * 0.3;
          e.preventDefault();
        }
      });
    });

    return { scrollContainer };
  },
});
</script>

<style scoped>
.scroll-container {
  overflow: auto;
  scrollbar-width: thin; /* For Firefox */
  scrollbar-color: #8fd0a0 transparent; /* 초록색 스크롤바와 투명 트랙 */
}

.scroll-container::-webkit-scrollbar {
  width: 6px; /* 스크롤 바의 너비 */
  height: 6px; /* 스크롤 바의 높이 */
}

.scroll-container::-webkit-scrollbar-thumb {
  background-color: #32a852; /* 초록색 스크롤바 */
  border-radius: 50%; /* 스크롤 바를 둥글게 */
  border: 2px solid transparent; /* 바깥 경계선 투명 */
  background-clip: padding-box; /* 스크롤바 안쪽만 색상 적용 */
}

.scroll-container::-webkit-scrollbar-track {
  background-color: transparent; /* 트랙을 투명하게 설정 */
  border-radius: 12px; /* 트랙도 둥글게 */
}

/* Horizontal Scroll */
.horizontal-scroll {
  display: flex;
  flex-direction: row;
}
</style>
