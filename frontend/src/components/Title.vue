<script setup lang="ts">
defineProps<{
  routes: Record<string, string>
}>();
</script>

<template>
  <div class="bar">
    <div class="info">
      <img src="/logo.png" class="icon" alt="Website icon" />
      <p class="title">Fireable</p>
    </div>
    <div class="links">
      <a v-for="(link, name) in routes" :key="name" :href="link">
        <p>{{ name }}</p>
      </a>
    </div>
    <div class="social">
      <a href="https://github.com/ItzFireable">
        <i class="fa-brands fa-github"></i>
      </a>
      <a href="https://twitter.com/Fireable__">
        <i class="fa-brands fa-twitter"></i>
      </a>
      <a href="https://discord.com/users/329152844261490689">
        <i class="fa-brands fa-discord"></i>
      </a>
    </div>
  </div>
</template>

<style scoped>
.bar {
  padding-left: 32px;
  padding-right: 32px;
  padding-top: 16px;
  height: 64px;
  display: flex;

  justify-content: space-between;
  align-items: center;

  margin-bottom: 0px;
}

.title {
  padding-left: 16px;
  font-weight: 600;

  text-shadow: 0px 0px 12px rgba(0, 0, 0, 0.4);
}

.icon {
  border-radius: 100%;
  width: 32px;
}

.info {
  display: flex;

  justify-content: center;
  align-items: center;
}

.social {
  display: flex;

  justify-content: center;
  align-items: center;
}

.social>a {
  color: white;
  font-size: 24px;
  padding-left: 8px;
  text-shadow: 0px 0px 12px rgba(0, 0, 0, 0.4);
}

.links {
  display: flex;
  flex-direction: row;
}

.links>a {
  color: white;
  padding-left: 16px;
  padding-right: 16px;
  font-weight: 500;
  text-shadow: 0px 0px 12px rgba(0, 0, 0, 0.4);
  text-decoration: none;
}

.links>a:after {
  content: "";
  float: left;
  background: white;
  width: 100%;
  height: 3px;
  margin-top: -16px;
  border-radius: 3px;

  transform: scaleX(0);
  transition: transform 0.05s ease-in-out;

  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.4);
}

.links>a:hover:after {
  transform: scaleX(1);
}
</style>
