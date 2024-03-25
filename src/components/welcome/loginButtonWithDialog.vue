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
    return {
      dialogWidth,
    };
  },
});
</script>

<template>
  <div>
    <v-dialog :width="dialogWidth">
      <template v-slot:activator="{ props: activeBtns }"
        ><normal-button class="button" v-bind="activeBtns">登录</normal-button>
      </template>
      <template #default="{ isActive }">
        <normal-menu class="dialog" customised="true"
          ><v-card-item class="dialogTitle justify-center"
            >小屋检查站</v-card-item
          >
          <v-card-item class="titleLine justify-center"> </v-card-item>
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
                    ><svg-icon icon="user"></svg-icon></v-icon></template
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
                    ><svg-icon icon="password"></svg-icon></v-icon></template
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
