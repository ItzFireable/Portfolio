<script setup lang="ts">
import ProjectBanner from './components/ProjectBanner.vue'
import Title from './components/Title.vue'
import Skills from './components/Skills.vue'
import Discord from './components/Discord.vue'
import Spotify from './components/Spotify.vue'
import { onMounted, ref } from 'vue'
import axios from 'axios'

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
  <img src="/kimi_pngtuber_ver.png" class="banner blur" alt="Banner image" />
  <img src="/kimi_pngtuber_ver.png" class="banner" alt="Banner image" />
  <Title></Title>
  <div class="intro">
    <h1>Hello!</h1>
    <p>I'm <a class="display">Kimi</a>, also known as Fireable.</p>
    <p>I'm a young developer from Finland, with years of experience in various programming languages and frameworks.</p>
    <p>I primarily work in game development, focusing on creating engaging and immersive experiences.<br/>I also have a passion for web development and enjoy building interactive web applications.</p>
    <p>Feel free to reach out to me, and check out my work below.</p>
  </div>
  <div class="group group-row">
    <Skills></Skills>
    <Spotify></Spotify>
    <Discord></Discord>
  </div>
  <div class="group projects">
    <ProjectBanner title="Untitled C++ based rhythm game" banner="urg.gif" direction="left"
      link_desc="View the source code on GitHub" link="https://github.com/ItzFireable/cpp-rhythm-game"
      description="A project made for Tredu in 2022-2023. Made using SDL2 and SDL_GPU, made in approximately 2-3 months without any prior experience in C++. The game is a rhythm game, where the player has to hit the correct notes at the correct time as accurately as possible to get as much score as possible. I did not have a lot of time to implement all the features I wanted, but I am still proud of the result. The project is also well optimized, although for some reason struggles on NVIDIA GPUs due to the graphics rendering library used." />
    <ProjectBanner title="Project: Afternight" banner="afn.png" direction="right" link_desc="View the game on Roblox"
      link="https://www.roblox.com/games/13042495892/Project-Afternight"
      description="This is another Roblox game I worked on, which was also based on Friday Night Funkin'. It was also a port of Friday Night Funkin', but properly managed and not a super messy codebase. The project had a non-profit approach, and expanded to other genres, including a lot of popular musicians within the game. I was one of the owners, and a lead developer, managing backend code, designing UI and logo and managed the project until start of 2025. It is still in active development by another team." />
    <ProjectBanner title="Friday Night Bloxxin'" banner="fnb.png" direction="left" link_desc="View the game on Roblox"
      link="https://www.roblox.com/games/7603193259/Friday-Night-Bloxxin"
      description="This is a Roblox game I worked on due to my previous interest in Friday Night Funkin'. This game was a port of the game onto Roblox, including most of the popular mods created at the time. It is also a rhythm game, just like all of these other projects. I was a lead developer and project manager on this game throughout 2022-2023. Since then this project has since been canceled and superseded by the next project on this page." />
    <ProjectBanner title="Friday Night Funkin': VS. Camellia" banner="camellia.jpg" direction="right"
      link_desc="View the mod on GameBanana" link="https://gamebanana.com/mods/290601"
      description="This is a mod made for an indie rhythm game Friday Night Funkin'. It features music from the Japanese musician Camellia / Cametek, which consists primarily of speedcore / hardcore genre. The project was made using a platform called Kade Engine, which was the popular tool at the time. I was the lead developer and main programmer of this project until update 2 in 2022, and left the team afterwards. It is currently being maintained by another team." />
  </div>
  <div class="footer">
    <p>© 2025 Fireable, All rights reserved</p>
  </div>
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

<style scoped>

.intro {
  padding-left: 32px;
  padding-right: 32px;

  margin-bottom: -16px;
}

.banner {
  position: absolute;
  margin-left: calc(100% - 550px);
  margin-top: 60px;

  width: 500px;
  height: 500px;
  object-fit: cover;
}

.blur {
  transform: scale(1.05);
  margin-top: 70px;
  filter: blur(8px) brightness(0);
  opacity: 0.4;
}

.intro>* {
  text-align: left;
  text-shadow: 0px 0px 12px rgba(0, 0, 0, 0.4);
}

.footer>* {
  text-align: center;
  padding-bottom: 16px;
  margin-bottom: 0;
}

.group {
  margin-left: 32px;
  margin-right: 32px;

  margin-top: 16px;

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  align-items: flex-end;
  justify-content: flex-start;
}

.group-row {
  flex-direction: row;
}

.display {
  background: linear-gradient(180deg, #e21d69, #ff8a2b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: bold;
}

@media only screen and (max-width: 600px) {
  .banner {
    display: none;
  }
}
</style>
