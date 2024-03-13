<template>
  <div class="main">
    <div class="background">
      <!-- 标题 -->
      <title-bar v-if="!overlayState" class="theTitleBar" />
      <v-dialog width="40%">
        <!-- 对话框 -->
        <template v-slot:activator="{ props: activeBtns }">
          <!-- 按钮显示区（栅格系统） -->
          <transition name="buttons">
            <div v-if="!overlayState" class="buttonZone">
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
                  >
                    <normal-button
                      style="border: none"
                      class="button"
                      v-bind="activeBtns"
                      >注册</normal-button
                    ></v-col
                  >
                  <v-col
                    cols="8"
                    sm="2"
                    md="2"
                    lg="2"
                    xl="2"
                    xxl="2"
                    class="d-flex justify-center align-center"
                    ><normal-button
                      style="border: none"
                      class="button"
                      v-bind="activeBtns"
                      >登录</normal-button
                    ></v-col
                  >
                </v-row>
              </v-container>
            </div>
          </transition>
        </template>
        <template v-slot:default>
          <normal-menu class="dialog"> </normal-menu>
        </template>
      </v-dialog>
    </div>
    <!-- 文字遮罩 -->
    <v-overlay
      v-model="overlayState"
      class="align-center justify-center"
      @click="switchBoard"
    >
      <!-- 文字显示 -->
      <div class="displayBoard" ref="displayBoard">
        {{ displayNow }}
      </div></v-overlay
    >
  </div>
</template>

<script lang="ts">
import WELCOME_TEXT from "@/assets/text/welcome";
import music from "@/assets/musics/Cannon.mp3";
export default defineComponent({
  name: "welcome",
  setup() {
    const welcomeData = ref(WELCOME_TEXT);
    const clickCount = ref(0);
    const displayNow = computed(
      () => welcomeData.value.mainText[clickCount.value]
    );
    // const overlayState = computed(() =>
    //   clickCount.value > welcomeData.value.mainText.length - 1 ? false : true
    // );
    const overlayState = ref(true);
    const displayBoard = ref();
    // const isOpenDialog = ref(false);

    const switchBoard = () => {
      displayBoard.value.style.animationName =
        ++clickCount.value % 2 === 0 ? "enterDisplay" : "resetEnterDisplay";
    };
    const playBackgroundMusic = (isPlayable: boolean) => {
      if (isPlayable) {
        let backgroundMusic = document.createElement("audio");
        backgroundMusic.src = music;
        backgroundMusic.play();
        backgroundMusic.loop = true;
        console.log("音乐播放");
      } else {
        console.log("音乐未播放");
      }
    };
    watch(overlayState, () => {
      overlayState.value =
        clickCount.value > welcomeData.value.mainText.length - 1 ? false : true;
    });
    onUpdated(() => {
      playBackgroundMusic(!overlayState.value);
    });
    // nextTick(() => {
    //   playBackgroundMusic(!overlayState.value);
    // });
    return {
      welcomeData,
      clickCount,
      displayNow,
      overlayState,
      switchBoard,
      displayBoard,
      playBackgroundMusic,
    };
  },
});
</script>

<style lang="scss">
@keyframes enterDisplay {
  from {
    opacity: 0%;
  }
  to {
    opacity: (100%);
  }
}
@keyframes resetEnterDisplay {
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
@media screen and (min-width: map-get($breakPoints,xs)) {
  .theTitleBar {
    height: 60%;
  }
  .buttonZone {
    height: 40%;
    .button {
      width: 40%;
    }
  }
}
@media screen and (min-width: map-get($breakPoints,sm)) {
  .theTitleBar {
    height: 75%;
  }
  .buttonZone {
    height: 25%;
    .button {
      width: 90%;
    }
  }
}

@media screen and (min-width: map-get($breakPoints,md)) {
  .theTitleBar {
    height: 75%;
  }
  .buttonZone {
    height: 25%;
    .button {
      width: 90%;
    }
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

    //   @media screen and (orientation: portrait) {
    //     height: 40%;
    //     .button {
    //       @media (min-width: calc($largeDeviceWidth/2.5)) {
    //         width: 90%;
    //       }
    //       @media (max-width: calc($largeDeviceWidth/2.5)) {
    //         width: 40%;
    //       }
    //     }
    //   }
    // }
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
  font-family: "myFont";
  font-weight: bold;
  animation: textDisplay 2s linear;
}
</style>
