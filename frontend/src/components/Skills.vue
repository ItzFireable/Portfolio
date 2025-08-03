<script setup lang="ts">
defineProps<{}>()
</script>

<template>
  <div class="base flex-column">
    <div class="base">
      <p class="fields">Vite + Vue (Frontend)</p>
      <p class="fields">Elysia (Backend)</p>
    </div>
    <div class="base">
      <p class="fields">C++</p>
      <p class="fields">C#</p>
      <p class="fields">Lua</p>
      <p class="fields">Haxe</p>
      <p class="fields">JS + TS</p>
    </div>
  </div>
</template>

<style scoped>
.base {
  height: fit-content;
  display: flex;
  flex-direction: row;

  margin-top: 16px;
  margin-right: auto;
}

.flex-column {
  flex-direction: column;
}

.fields {
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

  font-size: small;
}
</style>
