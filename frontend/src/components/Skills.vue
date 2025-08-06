<script setup lang="ts">
import Skill from './Skill.vue'
defineProps<{}>()
</script>

<template>
  <div class="base flex-column">
    <div class="base">
      <Skill icon="vite" title="Vite + Vue (Frontend)" />
      <Skill title="Elysia (Backend)" />
    </div>
    <div class="base">
      <Skill icon="cplusplus" title="C++" />
      <Skill icon="csharp" title="C#" />
      <Skill icon="lua" title="Lua" />
      <Skill icon="haxe" title="Haxe" />
      <Skill icon="javascript" title="JS" />
      <Skill icon="typescript" title="TS" />
      <Skill icon="rust" title="Rust" />
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
