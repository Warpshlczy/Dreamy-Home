<template>
  <div class="main">
    <div class="background">
      <!-- 标题 -->
      <title-bar v-if="!overlayState" class="theTitleBar" />

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
                <!-- 注册按钮+注册显示框 -->
                <v-dialog :width="dialogWidth">
                  <template #activator="{ props: activeBtns }">
                    <normal-button
                      style="border: none"
                      class="button"
                      v-bind="activeBtns"
                      >注册</normal-button
                    >
                  </template>
                  <template #default="{ isActive }">
                    <normal-menu class="dialog" customised="true"
                      ><v-card-item class="dialogTitle justify-center"
                        >新访客登记处</v-card-item
                      >
                      <v-card-item class="titleLine justify-center">
                      </v-card-item>
                      <div class="inputZone">
                        <div class="dialogInput justify-center d-flex">
                          <v-text-field
                            density="compact"
                            class="textField"
                            variant="solo"
                            bg-color="rgb(232,207,166)"
                            label="昵称"
                            maxlength="10"
                            counter
                            :rules="[
                              (value) => !!value || '快点告诉人家名字了啦qwq',
                            ]"
                            hint="亲爱的旅行者，请告诉我您的名字！"
                            ><template #prepend
                              ><v-icon x-large
                                ><svg-icon
                                  icon="user"
                                ></svg-icon></v-icon></template
                          ></v-text-field>
                        </div>
                        <div class="dialogInput justify-center d-flex">
                          <v-text-field
                            density="compact"
                            class="textField"
                            variant="solo"
                            bg-color="rgb(232,207,166)"
                            label="*许可证ID"
                            maxlength="8"
                            counter
                            hint="请出示您的进入许可！（没有可以不填）"
                            ><template #prepend
                              ><v-icon x-large
                                ><svg-icon
                                  icon="license"
                                ></svg-icon></v-icon></template
                          ></v-text-field>
                        </div>
                        <div class="dialogInput justify-center d-flex">
                          <v-text-field
                            type="password"
                            density="compact"
                            class="textField"
                            variant="solo"
                            bg-color="rgb(232,207,166)"
                            label="通行码/密码"
                            maxlength="16"
                            :rules="[
                              (value) =>
                                /^[\S]{0,}[a-zA-Z]{1,}[\S]{0,}$/.test(value) ||
                                !value ||
                                '必须包含至少一位字母哦',
                              (value) =>
                                !!value || '不填通行码的话下次不让你进来噢',
                              (value) =>
                                (value.length > 6 && value.length < 16) ||
                                '通行码至少在7位以上、16位以下哦',
                            ]"
                            hint="请填写属于您的的自定义通行码！"
                            ><template #prepend
                              ><v-icon x-large>
                                <svg-icon
                                  icon="password"
                                ></svg-icon></v-icon></template
                          ></v-text-field>
                        </div>
                        <div class="dialogInput justify-center d-flex">
                          <v-text-field
                            density="compact"
                            class="textField"
                            variant="solo"
                            bg-color="rgb(232,207,166)"
                            label="确认通行码"
                            hint="请确认您的的自定义通行码！"
                            ><template #prepend
                              ><v-icon x-large
                                ><svg-icon
                                  icon="password-on"
                                ></svg-icon></v-icon></template
                          ></v-text-field>
                        </div>
                      </div>
                      <div class="dialogAction d-flex justify-center">
                        <normal-button style="border: none" class="dialogButton"
                          >登记</normal-button
                        >
                        <normal-button
                          style="border: none"
                          class="dialogButton"
                          @click="isActive.value = false"
                          >返回</normal-button
                        >
                      </div>
                    </normal-menu>
                  </template>
                </v-dialog>
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
                <v-dialog :width="dialogWidth">
                  <template v-slot:activator="{ props: activeBtns }"
                    ><normal-button
                      style="border: none"
                      class="button"
                      v-bind="activeBtns"
                      >登录</normal-button
                    >
                  </template>
                  <template #default="{ isActive }">
                    <normal-menu class="dialog" customised="true"
                      ><v-card-item class="dialogTitle justify-center"
                        >小屋检查站</v-card-item
                      >
                      <v-card-item class="titleLine justify-center">
                      </v-card-item>
                      <div class="inputZone">
                        <div class="dialogInput justify-center d-flex">
                          <v-text-field
                            density="compact"
                            class="textField"
                            variant="solo"
                            bg-color="rgb(232,207,166)"
                            label="昵称/用户名/手机号"
                            hint="只通过昵称注册的访客请使用昵称登录哦！"
                            ><template #prepend
                              ><v-icon x-large
                                ><svg-icon
                                  icon="user"
                                ></svg-icon></v-icon></template
                          ></v-text-field>
                        </div>

                        <div class="dialogInput justify-center d-flex">
                          <v-text-field
                            density="compact"
                            class="textField"
                            variant="solo"
                            bg-color="rgb(232,207,166)"
                            label="通行码"
                            hint="请验证您的通行码哦！"
                            ><template #prepend
                              ><v-icon x-large
                                ><svg-icon
                                  icon="password"
                                ></svg-icon></v-icon></template
                          ></v-text-field>
                        </div>
                      </div>
                      <div class="dialogAction d-flex justify-center">
                        <normal-button style="border: none" class="dialogButton"
                          >OK!</normal-button
                        >
                        <normal-button
                          style="border: none"
                          class="dialogButton"
                          @click="isActive.value = false"
                          >返回</normal-button
                        >
                      </div>
                    </normal-menu>
                  </template>
                </v-dialog></v-col
              >
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
import { useDisplay } from "vuetify";
export default defineComponent({
  name: "welcomePanle",
  setup() {
    const { name } = useDisplay();
    const welcomeData = ref<displayText>(WELCOME_TEXT);
    const clickCount = ref<number>(0);
    const overlayState = ref<boolean>(true);
    const displayBoard = ref();

    const displayNow = computed(
      () => welcomeData.value.mainText[clickCount.value]
    );
    const dialogWidth = computed(() => {
      switch (name.value) {
        case "xs":
          return "100%";
        case "sm":
          return "100%";
        case "md":
          return "50%";
        default:
          return "41%";
      }
    });
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
      dialogWidth,
    };
  },
});
</script>

<style lang="scss">
@media screen and (min-width: map-get($breakPoints,xs)) and (max-width: map-get($breakPoints,sm)) {
  .theTitleBar {
    height: 60%;
  }
  .buttonZone {
    height: 40%;
    .button {
      width: 40%;
    }
  }
  .dialogTitle {
    font-size: 1.5rem;
  }
  .titleLine {
    background: url("../assets/img/dividerBar.png") no-repeat center;
    background-size: 50% 60%;
  }
}
@media screen and (min-width: map-get($breakPoints,sm)) and (max-width: map-get($breakPoints,md)) {
  .theTitleBar {
    height: 75%;
  }
  .buttonZone {
    height: 25%;
    .button {
      width: 90%;
    }
  }
  .dialogTitle {
    font-size: 4.5rem;
    margin-bottom: 0;
  }
  .titleLine {
    background: url("../assets/img/dividerBar.png") no-repeat center;
    background-size: contain;
  }
  // .titleLine {
  //   background-size: contain;
  // }
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
  .dialogTitle {
    font-size: 3.2rem;
  }
  .titleLine {
    background: url("../assets/img/dividerBar.png") no-repeat center;
    background-size: contain;
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
  }
}
.dialog {
  .dialogTitle {
    margin-top: 4%;
    height: 16%;
    font-weight: bold;
    color: $theme_3;
  }
  .inputZone {
    margin-top: 5%;
    height: 55%;
    .dialogInput {
      padding: 1.5% 12% 0% 12%;
      .textField {
        :focus {
          border-width: 4px 7px;
          border-style: groove inset none none;
          border-color: $theme_3;
          border-top-right-radius: 8px;
          border-top-left-radius: 5px;
          border-bottom-right-radius: 4px;
        }
      }
    }
  }
  .dialogAction {
    width: 100%;
    height: 15%;
    margin: 3% 0% 10% 0%;
    .dialogButton {
      width: 20%;
      margin: 0% 10%;
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
