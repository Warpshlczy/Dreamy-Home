<template>
  <div class="main all-full">
    <div class="background all-full">
      <!-- 标题 -->
      <title-bar v-if="!textOverlayState" class="theTitleBar" />

      <!-- 按钮显示区（栅格系统） -->
      <transition name="buttons">
        <div class="buttonZone" v-if="!textOverlayState">
          <v-container>
            <v-row align-content="center" justify="space-around">
              <v-col
                cols="8"
                sm="2"
                md="2"
                lg="2"
                xl="2"
                xxl="2"
                class="d-flex justify-center align-center"
                ><registerButtonWithDialog
                  class="d-flex justify-center width-full"
                />
              </v-col>
              <v-col
                cols="8"
                sm="2"
                md="2"
                lg="2"
                xl="2"
                xxl="2"
                class="d-flex justify-center align-center"
              >
                <!-- 登录按钮+登录显示框 -->
                <LoginButtonWithDialog
                  class="d-flex justify-center width-full"
                />
              </v-col>
            </v-row>
          </v-container>
        </div>
      </transition>
    </div>
    <!-- 文字遮罩层 -->
    <v-overlay
      v-model="textOverlayState"
      class="align-center justify-center"
      @click="methods.switchBoard"
    >
      <!-- 文字显示板 -->
      <div class="displayBoard" ref="displayBoard">
        {{ cutScene.currentDisplayText }}
      </div></v-overlay
    >
  </div>
</template>

<script lang="ts">
import WELCOME_TEXT from "@/assets/text/welcome";
import music from "@/assets/musics/Cannon.mp3";

export default defineComponent({
  name: "welcomePanel",

  setup() {
    const displayBoard = ref();
    const textOverlayState = ref<boolean>(true);
    const cutScene = ref({
      textData: WELCOME_TEXT,
      displayCarrier: displayBoard,
      currentDisplayText: ref(),
      orderOfTextNow: 0,
    });
    cutScene.value.currentDisplayText = computed(
      () => cutScene.value.textData.mainText[cutScene.value.orderOfTextNow]
    );
    const methods = {
      switchBoard: () => {
        cutScene.value.displayCarrier.style.animationName =
          ++cutScene.value.orderOfTextNow % 2 === 0
            ? "enterDisplay"
            : "resetEnterDisplay";
      },
      playBackgroundMusic: (isPlayable: boolean) => {
        if (isPlayable) {
          let backgroundMusic = document.createElement("audio");
          backgroundMusic.src = music;
          backgroundMusic.play();
          backgroundMusic.loop = true;
          console.log("音乐播放");
        } else {
          console.log("音乐未播放");
        }
      },
    };
    watch(textOverlayState, () => {
      textOverlayState.value =
        cutScene.value.orderOfTextNow >
        cutScene.value.textData.mainText.length - 1
          ? false
          : true;
    });
    onUpdated(() => {
      methods.playBackgroundMusic(!textOverlayState.value);
    });
    return {
      displayBoard,
      textOverlayState,
      cutScene,
      methods,
    };
  },
});
</script>

<style lang="scss">
@media screen and (min-width: map-get($breakPoints,xs)) and (max-width: map-get($breakPoints,sm)) {
  .theTitleBar {
    height: 60%;
  }
}
@media screen and (min-width: map-get($breakPoints,sm)) and (max-width: map-get($breakPoints,md)) {
  .theTitleBar {
    height: 75%;
  }
}

@media screen and (min-width: map-get($breakPoints,md)) {
  .theTitleBar {
    height: 75%;
  }
}
.main {
  .background {
    background: url("@/assets/img/HBG.jpg") no-repeat center;
    @media screen and (orientation: landscape) {
      background-size: 100% 100%;
    }
    @media screen and (orientation: portrait) {
      background-size: $largeDeviceWidth $largeDeviceHeight;
    }
    .theTitleBar {
      animation: titleBarIn 2s ease-out,
        titleBarContinue 8s 2.5s linear infinite;
      :hover {
        transform: scale(1.03);
      }
    }
    .buttons-enter-from {
      opacity: 0%;
    }
    .buttons-enter-active {
      opacity: 0%;
      animation: enterDisplay 2.5s 3s ease-in-out;
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
  font-weight: bold;
  animation: textDisplay 2s linear;
}
</style>
