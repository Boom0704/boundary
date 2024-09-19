<template>
  <div class="progress-bar">
    <div class="progress-bar__step" :class="{ active: step >= 1 }">
      1. 사진 추가
    </div>
    <div class="progress-bar__step" :class="{ active: step >= 2 }">
      2. 글 추가
    </div>
    <div class="progress-bar__step" :class="{ active: step === 3 }">
      3. 제출
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "ProgressBar",
  props: {
    step: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style scoped>
.progress-bar {
  display: flex;
  justify-content: space-between;
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 10px;
}

.progress-bar__step {
  flex: 1;
  text-align: center;
  font-weight: bold;
  padding: 10px;
  background-color: #ddd;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.progress-bar__step.active {
  background-color: #60d360;
  color: white;
}
</style>
