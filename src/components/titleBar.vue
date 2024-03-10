<script lang="ts" setup></script>

<template>
  <div class="container d-flex justify-center">
    <v-img src="../assets/img/titleBar.png" class="titleBar"></v-img>
  </div>
</template>

<style scoped lang="scss">
.container {
  width: 100%;
}
.titleBar {
  image-rendering: pixelated;
  @media screen and (orientation: landscape) {
    height: 60%;
    margin-top: 2.5%;
  }
  @media screen and (orientation: portrait) {
    height: 30%;
    margin-top: 25%;
  }
}
</style>
