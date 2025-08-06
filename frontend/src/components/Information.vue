<script setup lang="ts">
import { onMounted, ref } from 'vue';

const age = ref(0);

function calculateAge(birthday:Date):number {
  var ageDifMs: number = Date.now() - birthday.getTime();
  var ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

onMounted(() => {
  age.value = calculateAge(new Date("07/20/2004"));
})
</script>

<template>
  <div class="base">
    <div class="info">
      <p class="name">{{ age }} years old</p>
      <p class="small-title">Non-binary (they/them)</p>
      <p class="small-title"> i use arch btw <i class="devicon-archlinux-plain"></i></p>
    </div>
  </div>
</template>

<style scoped>
.base {
  min-width: 150px;
  width: fit-content;
  height: auto;

  margin-top: 16px;
  margin-left: 16px;

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
  margin-bottom: -2px;

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
