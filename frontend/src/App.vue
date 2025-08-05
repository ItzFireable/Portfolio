<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import axios from 'axios'

import HomeView from './views/HomeView.vue'
import NotFound from './views/NotFound.vue'

const routes: Record<string, any> = {
  '/': HomeView,
}

const currentPath = ref(window.location.pathname)
window.addEventListener('popstate', () => {
  currentPath.value = window.location.pathname
})

const currentView = computed(() => {
  console.log((currentPath.value as string).slice(1))
  return routes[(currentPath.value as string).slice(1) || '/'] || NotFound
})

const primary = ref("#c4217b");
const secondary = ref("#6037a1");

onMounted(() => {
  const baseUrl = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BACKUP_URL;
  const apiUrl = baseUrl +'/discord';

  axios.get(apiUrl)
    .then((response) => {
      primary.value = "#" + (response.data.user.accent_color as number).toString(16) || "#B00B69";

      document.body.style.setProperty("--primary-color", primary.value);
      document.body.style.setProperty("--secondary-color", secondary.value);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
})
</script>

<template>
  <component :is="currentView" />
</template>

<style>
body {
  --primary-color: #c4217b;
  --secondary-color: #6037a1;
  
  background: linear-gradient(-90deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  background: url("/overlay.jpg"), linear-gradient(-90deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  background-blend-mode: multiply;

  background-repeat: no-repeat;
  background-size: 100% 100%;
}
</style>