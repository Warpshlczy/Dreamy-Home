<template>
  <div>
    <div ref="buttonSelf">
      <v-btn
        @click="handler"
        block
        class="btn"
        v-bind="value"
        width="100%"
        height="100%"
        elevation="0"
      >
        <!-- 按钮的文字 -->
        <slot></slot>
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  props: ["handler", "value"],
  name: "normalButton",
  setup() {
    const buttonSelf = ref();
    onMounted(() => {
      buttonSelf.value.style.height =
        buttonSelf.value.clientWidth * (19 / 26) + "px";
      buttonSelf.value.style.fontSize =
        buttonSelf.value.clientWidth * 0.1 + "px";
    });
    onUpdated(() => {
      buttonSelf.value.style.height =
        buttonSelf.value.clientWidth * (19 / 26) + "px";
      buttonSelf.value.style.fontSize =
        buttonSelf.value.clientWidth * 0.1 + "px";
    });

    return {
      buttonSelf,
    };
  },
});
</script>

<style lang="scss" scoped>
.btn {
  image-rendering: pixelated;
  background: url("@/assets/img/button.png") no-repeat center;
  background-size: contain;
  border-radius: 23%;
  font-size: 3em;
  font-weight: bold;
  color: $theme_3;
}
.btn:hover {
  transform: scale(1.15);
}
</style>
