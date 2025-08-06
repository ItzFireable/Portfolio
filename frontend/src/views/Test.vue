<script setup lang="ts">

</script>

<template>
    <div class="main">
        <div class="box">
            <p>what can i even make</p>
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

.box {
    width: fit-content;
    height: fit-content;

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

.box>p {
    margin: 0;
    text-shadow: 0px 0px 12px rgba(0, 0, 0, 0.4);
}
</style>