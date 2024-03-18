<script lang="ts">
export default defineComponent({
  props: ["customised"],
  name: "normal-Menu",
  setup() {
    const panel = ref();

    return {
      panel,
    };
  },
});
</script>
<template>
  <div ref="panel">
    <v-card height="100%" width="100%" class="container" elevation="0">
      <div v-if="!customised">
        <v-row
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
      </div>
      <slot />
    </v-card>
  </div>
</template>
<style lang="scss" scoped>
.container {
  image-rendering: pixelated;
  background: url(../assets/img/settingMenu.png) no-repeat center;
  background-size: 100% 100%;
}
</style>
