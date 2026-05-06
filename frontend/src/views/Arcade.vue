<script setup lang="ts">
    import { ref } from 'vue';

    const baseUrl = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BACKUP_URL;

    let urlParams = new URLSearchParams(window.location.search);
    const uuid = ref(urlParams.get('uuid'));

    const connectUrl = ref(baseUrl + "/scrobbler/connect/tachi");
    const disconnectUrl = ref(baseUrl + "/scrobbler/disconnect?uuid=" + uuid.value);
</script>

<template>
    <div class="main">
        <div class="group projects">
            <div v-if="uuid" class="box">
                <a v-if="disconnectUrl" v-bind:href="disconnectUrl" class="connect-btn">
                    <i class="fa-solid fa-link"></i>
                    Disconnect
                </a>
            </div>
            <div v-else class="box">
                <a v-if="connectUrl" v-bind:href="connectUrl" class="connect-btn">
                    <i class="fa-solid fa-link"></i>
                    Login with Kamaitachi
                </a>
            </div>
        </div>
    </div>
</template>

<style scoped>
.main {
    text-align: center;
    width: 100%;
    height: calc(100vh - 64px - 16px - 56px);
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.main>* {
    padding: 0;
    margin: 0;
}

.group {
  margin-left: 32px;
  margin-right: 32px;

  margin-top: 16px;

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  align-items: flex-end;
  justify-content: flex-end;
}

.box {
width: auto;
  height: auto;

  background: rgba(18, 18, 18, 0.6);
  backdrop-filter: blur(8px);

  margin: 0;
  margin-right: 16px;

  display: flex;

  border-radius: 16px;
  box-shadow:
    0 1px 1px hsl(0deg 0% 0% / 0.2),
    0 2px 2px hsl(0deg 0% 0% / 0.2),
    0 4px 4px hsl(0deg 0% 0% / 0.2),
    0 8px 8px hsl(0deg 0% 0% / 0.2),
    0 16px 16px hsl(0deg 0% 0% / 0.2);

  justify-content: center;
  align-items: center;

  position: relative;
  overflow: hidden;

  padding: 12px;
  text-shadow: 0px 0px 12px rgba(0, 0, 0, 0.4);
}

.connect-btn:link {
  color: lightgray;
  text-decoration: none;
}

.connect-btn:visited {
  color: lightgray;
  text-decoration: none;
}

.connect-btn:hover {
  color: white;
  text-decoration: none;
}

.connect-btn:active {
  color: lightgray;
  text-decoration: none;
}

</style>