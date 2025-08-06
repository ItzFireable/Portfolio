<script setup lang="ts">

import axios from 'axios';
import { onMounted, ref } from 'vue';

const loading = ref(true);
const cachedDiscordData = ref<Record<string, any>>({});

const status = ref("offline");
const statusVisible = ref("Offline");

const display = ref("");
const user = ref("");
const id = ref("");
const pfp = ref("");

const color = ref("82838b");

let statusReferences = {
  "dnd": "Do not disturb",
  "offline": "Offline",
  "online": "Online",
  "idle": "Idle"
}

const setInformation = (response: Record<string, any>) => {
  loading.value = false;
  const keyTyped = response.status as keyof typeof statusReferences;
  statusVisible.value = statusReferences[keyTyped];
  status.value = response.status;

  display.value = response.user.global_name;
  user.value = response.user.username;

  pfp.value = response.user.avatar;
  id.value = response.user.id;

  color.value = status.value == "dnd" ? "f23f43" : (status.value == "idle" ? "ca9654" : (status.value == "online" ? "43a25a" : "82838b"));
}

const getDiscordData = async () => {
  const baseUrl = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BACKUP_URL;
  const apiUrl = baseUrl + '/discord';

  axios.get(apiUrl)
    .then((response) => {
      if (response.data.error) {
        loading.value = false;
        display.value = "";
        return;
      }

      loading.value = false;
      cachedDiscordData.value = response.data;

      setInformation(response.data);
    })
    .catch(() => {
      loading.value = false;
      if (cachedDiscordData.value) {
        setInformation(cachedDiscordData.value);
      } else {
        display.value = "";
      }
    });
}

onMounted(() => {
  getDiscordData();
  setInterval(getDiscordData, 1000); // Refresh every 1 second
})
</script>

<template>
  <div v-if="loading" class="base">
    <div class="loader"></div>
  </div>
  <div v-if="!loading && display != ''"class="base">
    <div class="icon relative rounded-full" style="border-radius: 50%">
      <svg width="80" height="80" viewBox="0 0 40 40" class="absolute block w-auto">
        <mask id="svg-mask-avatar-status-round-32" maskContentUnits="objectBoundingBox" viewBox="0 0 1 1">
          <circle fill="white" cx="0.5" cy="0.5" r="0.5"></circle>
          <circle fill="black" cx="0.84375" cy="0.84375" r="0.25"></circle>
        </mask>
        <mask id="svg-mask-status-dnd" maskContentUnits="objectBoundingBox" viewBox="0 0 1 1">
          <circle fill="white" cx="0.5" cy="0.5" r="0.5"></circle>
          <rect fill="black" x="0.125" y="0.375" width="0.75" height="0.25" rx="0.125" ry="0.125"></rect>
        </mask>
        <mask id="svg-mask-status-online" maskContentUnits="objectBoundingBox" viewBox="0 0 1 1">
          <circle fill="white" cx="0.5" cy="0.5" r="0.5"></circle>
        </mask>
        <mask id="svg-mask-status-idle" maskContentUnits="objectBoundingBox" viewBox="0 0 1 1">
          <circle fill="white" cx="0.5" cy="0.5" r="0.5"></circle>
          <circle fill="black" cx="0.25" cy="0.25" r="0.375"></circle>
        </mask>
        <mask id="svg-mask-status-offline" maskContentUnits="objectBoundingBox" viewBox="0 0 1 1">
          <circle fill="white" cx="0.5" cy="0.5" r="0.5"></circle>
          <circle fill="black" cx="0.5" cy="0.5" r="0.25"></circle>
        </mask>
        <foreignObject x="0" y="0" width="32" height="32" mask="url(#svg-mask-avatar-status-round-32)">
          <img v-bind:src="id != '...' ? ('https://cdn.discordapp.com/avatars/' + id + '/' + pfp + '.png?size=512') : '/bear.png'"
            class="avatar" />
        </foreignObject>
        <rect width="10" height="10" x="22" y="22" v-bind:fill="'#' + color" v-bind:mask="'url(#svg-mask-status-' + status + ')'"/>
      </svg>
    </div>
    <div class="info">
      <p class="small-title">Discord status</p>
      <p class="name">{{ display }} (@{{ user }})</p>
      <p class="online-status">{{ statusVisible }}</p>
    </div>
  </div>
</template>

<style scoped>
.base {
  width: fit-content;
  height: auto;

  display: flex;
  flex-direction: row;

  background: rgba(18, 18, 18, 0.6);
  backdrop-filter: blur(8px);

  margin-top: 16px;
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

  padding: 12px;
}

.info {
  margin-top: 0;
  padding-left: 16px;
  padding-right: 4px;
  margin-bottom: -4px;


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
  margin-bottom: -24px;
  margin-right: -12px;
}

.avatar {
  width: 100%;
  height: 100%;
}

.online-status {
  font-size: small;
}

.small-title {
  font-size: small;
  color: rgb(167, 167, 167)
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
</style>
