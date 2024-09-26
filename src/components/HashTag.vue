<template>
  <div class="hashtag-container" :style="{ backgroundColor: computedColor }">
    <span class="hashtag-text">
      <span class="hashtag-symbol">#</span>{{ tag.slice(1) }}
    </span>
    <span class="hashtag-count">({{ count }})</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "HashTag",
  props: {
    tag: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
      required: true,
    },
    line: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const computedColor = computed(() => {
      let hash = 0;
      for (let i = 0; i < props.tag.length; i++) {
        hash = props.tag.charCodeAt(i) + ((hash << 5) - hash);
      }
      let color = `#${(hash & 0xffffff).toString(16).padStart(6, "0")}`;

      const getLuminance = (hex: string) => {
        const rgb = hex.match(/\w\w/g)?.map((x) => parseInt(x, 16) / 255) || [];
        const a = rgb.map((v) =>
          v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
        );
        return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
      };

      const luminance = getLuminance(color);
      if (luminance > 0.8) {
        color = `#${(((hash >> 16) & 0x7f7f7f) | 0x303030).toString(16)}`;
      }

      return color;
    });

    const computedFontSize = computed(() => {
      const length = props.tag.length;
      const maxFontSize = 60 / props.line;
      const minFontSize = 3;
      return `${Math.max(maxFontSize / length, minFontSize)}vw`;
    });

    const computedFontFoot = computed(() => {
      return `${12 / props.line}vw`;
    });

    return {
      computedColor,
      computedFontSize,
      computedFontFoot,
    };
  },
});
</script>

<style scoped>
.hashtag-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 10px;
  border-radius: 10px;
  box-sizing: border-box;
}

.hashtag-text {
  display: inline-block;
  max-width: 100%;
  font-size: v-bind(computedFontSize); /* 글자 수에 따라 크기 조정 */
  font-weight: bold;
  text-align: center;
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; /* 텍스트 넘칠 경우 ...으로 표시 */
}

.hashtag-symbol {
  opacity: 0.8; /* # 기호만 50% 투명도 */
}

.hashtag-container:hover .hashtag-text {
  white-space: normal; /* 호버 시 줄바꿈 허용 */
}

.hashtag-count {
  position: absolute;
  right: 10px;
  bottom: 10px;
  font-size: v-bind(computedFontFoot);
  font-weight: bold;
  color: white;
  opacity: 0.8;
}
</style>
