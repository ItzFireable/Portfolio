<script setup lang="ts">
    import ArcadeGame from '../components/ArcadeGame.vue'
    import LastFM from '../components/LastFM.vue'

    import { onMounted, ref } from 'vue'

    const games = ref([
      "chunithm:Single",
      "maimai:Single",
      "wacca:Single",
      "ongeki:Single",
      "jubeat:Single",
      "sdvx:Single",
    ])
</script>

<template>
  <div class="main">
    <div class="intro">
      <p>I also play various different rhythm games, and got years of experience in them.<br />This page has information about my rhythm game experience, and has some additional, still functional projects for them.</p>
      <p>If any of them stop working, feel free to hit up my Discord! I will try to keep them up.</p>
    </div>
    <div class="group group-row">
      <LastFM/>
      <div class="game-grid">
      <ArcadeGame v-for="(game, index) in games" :key="index" v-bind:target="game"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main {
    width: 100%;
    min-height: calc(100vh - 64px - 16px - 72px);
}

.intro {
  padding-left: 32px;
  padding-right: 32px;
  z-index: 1;
  position: relative;
}

.group {
  margin-left: 32px;
  margin-right: 32px;

  margin-top: 16px;

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  align-items: flex-start;
  justify-content: flex-start;
  gap: 12px;
  column-gap: 16px;
}

.group-row {
  display: flex;
  flex-direction: row;
  gap: 16px;
  align-items: flex-start;
}

.game-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  row-gap: 4px;
  flex: 1;
}
</style>