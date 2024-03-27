<script lang="ts">
import { useDisplay } from "vuetify";
export default defineComponent({
  setup() {
    const { name } = useDisplay();
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
    const methods = {
      submitUserRegistion: async () => {
        const { data } = await useFetch("/api/user/register");
        console.log(data.value);
      },
    };
    return {
      dialogWidth,
      methods,
    };
  },
});
</script>

<template>
  <div>
    <v-dialog :width="dialogWidth">
      <template #activator="{ props: activeBtns }">
        <normal-button class="button" v-bind="activeBtns">注册</normal-button>
      </template>
      <template #default="{ isActive }">
        <normal-menu class="dialog" customised="true"
          ><v-card-item class="dialogTitle justify-center"
            >新访客登记处</v-card-item
          >
          <v-card-item class="titleLine justify-center"> </v-card-item>
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
                :rules="[(value) => !!value || '快点告诉人家名字了啦qwq']"
                hint="亲爱的旅行者，请告诉我您的名字！"
                ><template #prepend
                  ><v-icon x-large
                    ><svg-icon icon="user"></svg-icon></v-icon></template
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
                    ><svg-icon icon="license"></svg-icon></v-icon></template
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
                  (value) => !!value || '不填通行码的话下次不让你进来噢',
                  (value) =>
                    (value.length > 6 && value.length < 16) ||
                    '通行码至少在7位以上、16位以下哦',
                ]"
                hint="请填写属于您的的自定义通行码！"
                ><template #prepend
                  ><v-icon x-large>
                    <svg-icon icon="password"></svg-icon></v-icon></template
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
                type="password"
                ><template #prepend
                  ><v-icon x-large
                    ><svg-icon icon="password-on"></svg-icon></v-icon></template
              ></v-text-field>
            </div>
          </div>
          <div class="dialogAction d-flex justify-center">
            <normal-button
              class="dialogButton"
              @click="methods.submitUserRegistion"
              >登记</normal-button
            >
            <normal-button class="dialogButton" @click="isActive.value = false"
              >返回</normal-button
            >
          </div>
        </normal-menu>
      </template>
    </v-dialog>
  </div>
</template>

<style lang="scss" scoped>
@media screen and (min-width: map-get($breakPoints,xs)) and (max-width: map-get($breakPoints,sm)) {
  .button {
    width: 40%;
  }

  .dialogTitle {
    font-size: 1.5rem;
  }
  .titleLine {
    background: url("@/assets/img/dividerBar.png") no-repeat center;
    background-size: 50% 60%;
  }
}
@media screen and (min-width: map-get($breakPoints,sm)) and (max-width: map-get($breakPoints,md)) {
  .button {
    width: 90%;
  }
  .dialogTitle {
    font-size: 4.5rem;
    margin-bottom: 0;
  }
  .titleLine {
    background: url("@/assets/img/dividerBar.png") no-repeat center;
    background-size: contain;
  }
}

@media screen and (min-width: map-get($breakPoints,md)) {
  .button {
    width: 90%;
  }
  .dialogTitle {
    font-size: 3.2rem;
  }
  .titleLine {
    background: url("@/assets/img/dividerBar.png") no-repeat center;
    background-size: contain;
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
</style>
