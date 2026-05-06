<script setup lang="ts">
const props = defineProps<{ target: string }>()
import axios from 'axios';
import { onMounted, ref } from 'vue';
const loading = ref(true);

const gameName = ref("");

const playtime = ref("");
const playcount = ref(0);
const rating = ref(0);

const baseUrl = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BACKUP_URL;
const apiUrl = baseUrl + '/tachi/game/' + props.target;

function secondsToHms(d: number) {
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute" : " minutes") : "";
    return hDisplay + mDisplay; 
}

axios.get(apiUrl)
  .then((response) => {
    if (response.data.error) {
      loading.value = false;
      return;
    }
    
    gameName.value = response.data.gameName;
    playcount.value = response.data.playCount;
    rating.value = response.data.rating;
    playtime.value = secondsToHms(response.data.playtime / 1000);

    loading.value = false;
  })
  .catch(() => {
    loading.value = false;
  });
</script>

<template>
  <div v-if="loading" class="base loading">
    <div class="loader"></div>
  </div>
  <div v-else class="base">
    <div class="info">
      <p class="name">{{ gameName }}</p>
      <p class="small-title">Playcount: {{ playcount }}</p>
      <p class="small-title">Playtime: {{ playtime }}</p>
      <br />
      <p class="small-title">Rating: {{ rating.toPrecision(5) }}</p>
    </div>
  </div>
</template>

<style scoped>
.base {
  min-width: 260px;
  width: fit-content;
  height: auto;

  margin-bottom: 8px;
  margin-top: 8px;

  display: flex;
  flex-direction: row;

  background: rgba(18, 18, 18, 0.6);
  backdrop-filter: blur(8px);

  border-radius: 16px;
  box-shadow:
    0 1px 1px hsl(0deg 0% 0% / 0.2),
    0 2px 2px hsl(0deg 0% 0% / 0.2),
    0 4px 4px hsl(0deg 0% 0% / 0.2),
    0 8px 8px hsl(0deg 0% 0% / 0.2),
    0 16px 16px hsl(0deg 0% 0% / 0.2);

  justify-content: flex-start;
  align-items: center;

  position: relative;
  overflow: hidden;

  padding: 16px;
  padding-left: 8px;
}

.loading {
  min-width: 0px;
  width: fit-content;
  justify-content: center;
}

.info {
  margin-top: 0;
  padding-left: 16px;
  padding-right: 4px;
  margin-bottom: -4px;

  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}

.info>p {
  margin: 0;
  text-shadow: 0px 0px 12px rgba(0, 0, 0, 0.4);
}

.icon {
  width: 62px;
  height: 62px;

  border-radius: 8px;
}

.name {
  padding-bottom: 8px;
}

.small-title {
  font-size: small;
  color: rgb(167, 167, 167)
}

.loading {
  min-width: 0px;
  width: fit-content;
  justify-content: center;
}

.loader {
  margin: 4px;
  width: 46px;
  height: 46px;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 4px solid #ffffff;
  animation:
    l20-1 0.8s infinite linear alternate,
    l20-2 1.6s infinite linear;
}

@keyframes l20-1 {
  0% {
    clip-path: polygon(50% 50%, 0 0, 50% 0%, 50% 0%, 50% 0%, 50% 0%, 50% 0%)
  }

  12.5% {
    clip-path: polygon(50% 50%, 0 0, 50% 0%, 100% 0%, 100% 0%, 100% 0%, 100% 0%)
  }

  25% {
    clip-path: polygon(50% 50%, 0 0, 50% 0%, 100% 0%, 100% 100%, 100% 100%, 100% 100%)
  }

  50% {
    clip-path: polygon(50% 50%, 0 0, 50% 0%, 100% 0%, 100% 100%, 50% 100%, 0% 100%)
  }

  62.5% {
    clip-path: polygon(50% 50%, 100% 0, 100% 0%, 100% 0%, 100% 100%, 50% 100%, 0% 100%)
  }

  75% {
    clip-path: polygon(50% 50%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 50% 100%, 0% 100%)
  }

  100% {
    clip-path: polygon(50% 50%, 50% 100%, 50% 100%, 50% 100%, 50% 100%, 50% 100%, 0% 100%)
  }
}

@keyframes l20-2 {
  0% {
    transform: scaleY(1) rotate(0deg)
  }

  49.99% {
    transform: scaleY(1) rotate(135deg)
  }

  50% {
    transform: scaleY(-1) rotate(0deg)
  }

  100% {
    transform: scaleY(-1) rotate(-135deg)
  }
}

@media (max-width: 768px) {
  .base {
    width: 100%;
  }
}
</style>
