<script setup lang="ts">
defineProps<{ title: string, description: string, banner: string, link: string, link_desc: string, direction: string }>()
</script>

<template>
  <div v-bind:class="'project ' + direction">
    <img v-bind:src="'/' + banner" class="banner" alt="Project banner" />
    <h1 v-bind:class="'title text-' + direction">{{ title }}</h1>
    <p v-bind:class="'description text-' + direction">{{ description || "Placeholder" }}</p>
    <a v-bind:href="'text-' + direction + ' ' + link" class="link">{{ link_desc || "Link" }}</a>
  </div>
</template>

<style scoped>
.project {
  height: auto;

  margin-bottom: 8px;
  margin-top: 8px;
  display: flex;

  flex-direction: column;

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
  padding: 16px;
  padding-top: 0px;
  padding-inline: 24px;
}

.project>* {
  z-index: 2;
  text-shadow: 0px 0px 12px rgba(0, 0, 0, 0.8);
}

.description {
  width: 80%;
}

.text-left {
  text-align: left;
}

.text-right {
  text-align: right;
}

.left {
  align-items: flex-start;
  z-index: 2;
}

.right {
  align-items: flex-end;
  z-index: 2;
}

.banner {
  width: 100%;
  height: 100%;
  position: absolute;
  object-fit: cover;
  z-index: 1 !important;
  transform: scale(1.2);
  filter: brightness(40%) blur(12px);

  user-drag: none;
  -webkit-user-drag: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}
</style>
