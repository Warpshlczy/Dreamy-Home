<script lang="ts">
export default defineComponent({
  name: "menu",
  setup() {
    const panel = ref();
    nextTick(() => {
      const computedHeight = (panel.value.clientWidth * (122 / 106)).toFixed(2);
      panel.value.setAttribute("style", `height:${computedHeight}px`);
    });
    return {
      panel,
    };
  },
});
</script>
<template>
  <div ref="panel">
    <v-card height="100%" width="100%" class="container" elevation="0">
      ><v-row
        ><v-col cols="12"
          ><v-card-item
            ><v-card-title
              ><slot name="title" /></v-card-title></v-card-item></v-col
      ></v-row>
      <v-row
        ><v-col cols="12"
          ><v-card-item
            ><v-card-subtitle
              ><slot name="subtitle" /></v-card-subtitle></v-card-item></v-col
      ></v-row>
      <v-row
        ><v-col cols="12"
          ><v-card-item
            ><v-card-text
              ><slot name="mainBody" /></v-card-text></v-card-item></v-col
      ></v-row>
      <slot />
    </v-card>
  </div>
</template>
<style lang="scss" scoped>
.container {
  image-rendering: pixelated;
  background: url(../assets/img/settingMenu.png) no-repeat center;
  background-size: cover;
}
</style>
