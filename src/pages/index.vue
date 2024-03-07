<template>
  <div class="main">
    <div class="background">
      <title-bar v-if="!overlayState" class="theTitleBar" />
    </div>
    <v-overlay
      v-model="overlayState"
      class="align-center justify-center"
      @click="switchBoard"
    >
      <div class="displayBoard" ref="displayBoard">
        {{ displayNow }}
      </div></v-overlay
    >
  </div>
</template>

<script setup lang="ts">
import WELCOME_TEXT from "@/assets/text/welcome";
const welcomeData = ref(WELCOME_TEXT);
const clickCount = ref(0);
const displayNow = computed(() => welcomeData.value.mainText[clickCount.value]);
const overlayState = computed(() =>
  clickCount.value > welcomeData.value.mainText.length - 1 ? false : true
);
const displayBoard = ref();
const switchBoard = () => {
  displayBoard.value.style.animationName =
    ++clickCount.value % 2 === 0 ? "textDisplay" : "resetTextDisplay";
};

onMounted(() => {});
</script>

<style lang="scss">
@import "../assets/global_styles/app";
@import "../assets/global_styles/global";
@keyframes textDisplay {
  from {
    opacity: 0%;
  }
  to {
    opacity: (100%);
  }
}
@keyframes resetTextDisplay {
  from {
    opacity: 0%;
  }
  to {
    opacity: (100%);
  }
}
@keyframes titleBarIn {
  0% {
    opacity: 0%;
    transform: scale(0);
  }
  75% {
    opacity: 90%;
    transform: scale(1.2);
  }
  100% {
    opacity: (100%);
    transform: scale(1);
  }
}
@keyframes titleBarContinue {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(3deg);
  }
  50% {
    transform: rotate(0deg);
  }
  75% {
    transform: rotate(-3deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
.main {
  height: 100%;
  width: 100%;
  .background {
    background: url(../assets/img/HBG.jpg) no-repeat center;
    @media screen and (orientation: landscape) {
      background-size: 100% 100%;
    }
    @media screen and (orientation: portrait) {
      background-size: $largeDeviceWidth $largeDeviceHeight;
    }
    height: 100%;
    width: 100%;
    .theTitleBar {
      animation: titleBarIn 1.6s ease-out,
        titleBarContinue 8s 2.2s linear infinite;
    }
  }
}
.displayBoard {
  position: relative;
  bottom: 6vh;
  text-align: center;
  @media screen and (min-width: calc($largeDeviceWidth/2)) {
    font-size: 5rem;
  }
  @media screen and (max-width: calc($largeDeviceWidth/2)) {
    font-size: 3rem;
  }
  color: whitesmoke;
  animation: textDisplay 2s linear;
}
</style>
