<template>
  <div class="error-page">
    <div class="error-content">
      <h1>{{ errorCode }}</h1>
      <p v-html="formattedErrorMessage"></p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "ErrorPage",
  props: {
    errorCode: {
      type: Number as PropType<number>,
      required: true,
    },
    errorMessage: {
      type: String as PropType<string>,
      default: "An unexpected error occurred. Please try again.",
    },
  },
  computed: {
    formattedErrorMessage(this: { errorMessage: string }): string {
      return this.errorMessage.replace(/\n/g, "<br>");
    },
  },
});
</script>

<style scoped>
.error-page {
  height: 100vh;
  background-image: url("@/assets/error2.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.9;
  padding-top: 30px;
  position: relative;
}

.error-content {
  text-align: center;
  background-color: rgba(255, 255, 255, 0);
  padding: 30px;
  border-radius: 10px;
}

h1 {
  font-size: 80px;
  color: #ff1900;
  margin: 0px;
  padding: 0px;
}

p {
  font-size: 16px;
  color: #363636;
  font-weight: bolder;
  margin: 0px;
  padding: 0px;
}
</style>
