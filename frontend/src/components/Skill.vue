<script setup lang="ts">
  defineProps<{ icon?: string, title: string }>()
</script>

<template>
  <div class="skill">
    <i v-if="icon" :class="'icon ' + `devicon-${icon}-plain`"></i>
    <p class="title">{{ title }}</p>
  </div>
</template>

<style scoped>
.skill {
  width: auto;
  height: auto;

  background: rgba(18, 18, 18, 0.6);
  backdrop-filter: blur(8px);

  margin: 0;
  margin-right: 16px;

  display: flex;

  border-radius: 16px;
  box-shadow:
    0 1px 1px hsl(0deg 0% 0% / 0.2),
    0 2px 2px hsl(0deg 0% 0% / 0.2),
    0 4px 4px hsl(0deg 0% 0% / 0.2),
    0 8px 8px hsl(0deg 0% 0% / 0.2),
    0 16px 16px hsl(0deg 0% 0% / 0.2);

  justify-content: center;
  align-items: center;

  position: relative;
  overflow: hidden;

  padding: 12px;
  text-shadow: 0px 0px 12px rgba(0, 0, 0, 0.4);

  font-size: small;
}

.icon {
  font-size: 16px;
  margin-right: 8px;
}

.title {
  font-weight: 500;
  margin-top: 0;
  margin-bottom: 0;
  margin-left: 2px;
}
</style>
