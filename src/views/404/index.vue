<template>
  <div id="content" @click="goHome()"></div>
</template>

<style lang="scss" scoped>
#content {
  width: 100vw;
  height: 100vh;
  background: url('/static/images/404.png') no-repeat center;
  background-size: 100% 100%;
  color: $gray-color;
  text-align: center;
  cursor: pointer;
}
</style>

<script setup lang="ts">
const goHome = () => {
  location.href = '/'
}
</script>
