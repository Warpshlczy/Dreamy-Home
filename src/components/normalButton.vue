<template>
  <div ref="buttonSelf">
    <v-btn
      @click="handler"
      block
      class="btn"
      width="100%"
      height="100%"
      elevation="0"
    >
      <!-- 按钮的文字 -->
      <slot></slot>
    </v-btn>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  props: ["handler"],
  name: "normalButton",
  setup(props) {
    const buttonSelf = ref();
    const handler = props.handler;
    nextTick(() => {
      (buttonSelf.value as HTMLElement).style.height =
        (buttonSelf.value as HTMLElement).clientWidth * (19 / 26) + "px";
      (buttonSelf.value as HTMLElement).style.fontSize =
        (buttonSelf.value as HTMLElement).clientWidth * 0.1 + "px";
    });

    return {
      handler,
      buttonSelf,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../assets/global_styles/global";
.btn {
  image-rendering: pixelated;
  background: url("../assets/img/button.png") no-repeat center;
  background-size: contain;
  border-radius: 23%;
  font-size: 3em;
  font-family: "myFont";
  font-weight: bold;
  color: $theme_3;
  :hover {
    transform: scale(1.15);
  }
}
</style>
