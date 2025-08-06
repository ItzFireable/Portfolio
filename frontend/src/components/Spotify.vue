<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';

const loading = ref(true);
const currentId = ref();

const cachedSpotifyData: Record<string, any> = {};

const song = ref("");
const artist = ref("");

const icon = ref("/bear.png");
const playing = ref(false);

const timestamp = ref(0 as number | null);
const progress_ms = ref(0);
const progress = ref(0);

let incrementInterval: any;
let progressBar: HTMLElement | null = null;

const setInformation = (response: Record<string, any>) => {
  loading.value = false;
  playing.value = response.is_playing;
  song.value = response.item.name;

  icon.value = response.item.album.images[0].url;
  if (response.is_playing) {
    timestamp.value = response.item.duration_ms;
    progress_ms.value = response.progress_ms;
    progress.value = progress_ms.value / (timestamp.value as number) * 100;

    if (!progressBar) {
      progressBar = document.querySelector('.progress') as HTMLElement;
    }
    if (progressBar) {
      progressBar.style.width = `${progress.value}%`;
    }

    function incrementProgress() {
      if (!timestamp.value) return; // If no timestamp, skip increment
      if (!progressBar) {
        progressBar = document.querySelector('.progress') as HTMLElement;
      }

      if (playing.value) {
        progress_ms.value += 100;
        progress.value = progress_ms.value / (timestamp.value as number) * 100;

        if (progress_ms.value >= (timestamp.value as number)) {
          progress_ms.value = timestamp.value as number;
          progress.value = 100;

          clearInterval(incrementInterval);
          incrementInterval = null;

          cachedSpotifyData.value = null; // Reset cached data
          getSpotifyCurrentlyPlaying();
        }

        if (progressBar) {
          progressBar.style.width = `${progress.value}%`;
        }
      }
    }

    if (incrementInterval == null) {
      incrementInterval = setInterval(incrementProgress, 100); // Update every 100ms
    }
  } else {
    timestamp.value = null;
    progress.value = 0;
  }

  artist.value = "";
  response.item.artists.forEach((artistData: { name: string }) => {
    if (artist.value.length > 0) {
      artist.value += ", ";
    }
    artist.value += artistData.name;
  });
};

const getSpotifyCurrentlyPlaying = async () => {
  const baseUrl = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BACKUP_URL;
  const apiUrl = baseUrl + '/spotify';

  axios.get(apiUrl)
    .then((response) => {
      if (response.data.error) {
        loading.value = false;
        playing.value = false;
        return;
      }

      let isSameTrack = false;
      if (response.data.item.id === currentId.value) {
        isSameTrack = true;
      }

      if (!isSameTrack) {
        currentId.value = response.data.item.id;
      } else {
        return; // If the track is the same, skip update
      }

      cachedSpotifyData.value = response.data;
      setInformation(response.data);
    })
    .catch(() => {
      loading.value = false;
      if (cachedSpotifyData.value) {
        setInformation(cachedSpotifyData.value);
      } else {
        playing.value = false;
      }
    });
};

onMounted(() => {
  getSpotifyCurrentlyPlaying();
  setInterval(getSpotifyCurrentlyPlaying, 1000); // Refresh every 10 seconds
})
</script>

<template>
  <div v-if="loading" class="base loading">
    <div class="loader"></div>
  </div>
  <div v-if="!loading && playing" class="base">
    <img v-bind:src="icon" class="icon">
    <i class="spotify-icon fa-brands fa-spotify"></i>
    </img>
    <div class="info">
      <p class="name">{{ song }}</p>
      <p class="small-title">{{ artist }}</p>
      <div class="timebar">
        <div class="progress"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.base {
  min-width: 200px;
  width: fit-content;
  height: auto;

  margin-top: 16px;
  margin-right: 16px;

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

  padding: 12px;
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

.small-title {
  font-size: small;
  color: rgb(167, 167, 167)
}

.timebar {
  width: 100%;
  height: 4px;
  margin-top: 4px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  overflow: hidden;
}

.progress {
  height: 100%;
  background-color: #1DB954;
}

.spotify-icon {
  position: absolute;
  color: #1DB954;
  font-size: 20px;
  width: 20px;
  height: 20px;
  margin-left: -4px;
  margin-top: calc(-4px - 48px);

  border-radius: 110%;
  background-color: rgba(18, 18, 18, 1);
}

/* HTML: <div class="loader"></div> */
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
