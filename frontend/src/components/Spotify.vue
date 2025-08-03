<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';

const song = ref("");
const artist = ref("");

const icon = ref("/bear.png");
const playing = ref(false);

const timestamp = ref(0 as number | null);
const progress_ms = ref(0);
const progress = ref(0);

let interval: any;

const getSpotifyCurrentlyPlaying = async () => {
  const apiUrl = 'http://localhost:3000/spotify';

  axios.get(apiUrl)
    .then((response) => {
      playing.value = response.data.is_playing;
      song.value = response.data.item.name;

      icon.value = response.data.item.album.images[0].url;
      if (response.data.is_playing) {
        timestamp.value = response.data.item.duration_ms;
        progress_ms.value = response.data.progress_ms;
        progress.value = progress_ms.value / (timestamp.value as number) * 100;

        function incrementProgress() {
          if (playing.value) {
            progress_ms.value += 1000;
            progress.value = progress_ms.value / (timestamp.value as number) * 100;

            if (progress_ms.value >= (timestamp.value as number)) {
              progress_ms.value = timestamp.value as number;
              progress.value = 100;

              clearInterval(interval);
              getSpotifyCurrentlyPlaying();
            }
          }
        }

        if (interval != null) {
          clearInterval(interval);
        }
        interval = setInterval(incrementProgress, 1000); // Update every second
      } else {
        timestamp.value = null;
        progress.value = 0;
      }

      artist.value = "";
      response.data.item.artists.forEach((artistData: { name: string }) => {
        if (artist.value.length > 0) {
          artist.value += ", ";
        }
        artist.value += artistData.name;
      });
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });

  setInterval(getSpotifyCurrentlyPlaying, 30000); // Refresh every 30 seconds
};

onMounted(() => {
  getSpotifyCurrentlyPlaying();
})
</script>

<template>
  <div class="base">
    <img v-bind:src="icon" class="icon">
    <i class="spotify-icon fa-brands fa-spotify"></i>
    </img>
    <div class="info">
      <p class="name">{{ song }}</p>
      <p class="small-title">{{ artist }}</p>
      <div class="timebar">
        <div class="progress" :key="progress" v-bind:style="{ width: progress + '%' }"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.base {
  width: fit-content;
  height: auto;

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
</style>
