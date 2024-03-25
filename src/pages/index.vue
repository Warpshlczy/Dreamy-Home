<template>
  <div class="main all-full">
    <div class="background all-full">
      <!-- 标题 -->
      <title-bar v-if="!overlayState" class="theTitleBar" />

      <!-- 按钮显示区（栅格系统） -->
      <transition name="buttons">
        <div class="buttonZone" v-if="!overlayState">
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
  name: "welcomePanle",

  setup() {
    const welcomeData = ref<displayText>(WELCOME_TEXT);
    const clickCount = ref<number>(0);
    const overlayState = ref<boolean>(true);
    const displayBoard = ref();
    const displayNow = computed(
      () => welcomeData.value.mainText[clickCount.value]
    );
    // async function submitRegister() {
    //   const res = await userRegister(
    //     userRegisterData.name,
    //     // userRegisterData.invitationCode,
    //     userRegisterData.password
    //   );
    //   console.log(res.data);
    // }
    // async function submitLogin() {
    //   const res = await userLogin(
    //     userRegisterData.name,
    //     // userRegisterData.invitationCode,
    //     userRegisterData.password
    //   );
    //   console.log(res.data);
    // }

    // const overlayState = computed(() =>
    //   clickCount.value > welcomeData.value.mainText.length - 1 ? false : true
    // );
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
