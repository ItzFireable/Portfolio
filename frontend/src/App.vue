<script setup lang="ts">
import Title from './components/Title.vue'
import { computed, ref } from 'vue'

import Arcade from './views/Arcade.vue'
import HomeView from './views/HomeView.vue'
import NotFound from './views/NotFound.vue'

const routes: Record<string, any> = {
  '/': HomeView,
  'arcade': Arcade,
}

const routeNames: Record<string, string> = {
  '/': 'Home',
  'arcade': 'Arcade',
}

const currentPath = ref(window.location.pathname)
window.addEventListener('popstate', () => {
  currentPath.value = window.location.pathname
})

const currentView = computed(() => {
  return routes[(currentPath.value as string).slice(1) || '/'] || NotFound
})
</script>

<template>
  <Title :routes="routeNames"></Title>
  <component :is="currentView" />
  <div class="footer">
    <p>© 2026 Fireable, All rights reserved</p>
  </div>
</template>

<style>
body {
  --primary-color: #e20f56;
  --secondary-color: #5e269e;

  background: linear-gradient(-90deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  background: url("/overlay.jpg"), linear-gradient(-90deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  background-blend-mode: multiply;

  background-repeat: no-repeat;
  background-size: 100vw 100vh;

  background-attachment: fixed;
}
.footer>* {
  text-align: center;
  padding-bottom: 16px;
  margin-bottom: 0;
}
</style>