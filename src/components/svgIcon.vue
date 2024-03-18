<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :viewBox="(targetSvg as svgIcon).viewBox"
    :width="width"
    :height="height"
  >
    <path :d="(targetSvg as svgIcon).path"></path>
  </svg>
</template>
<script lang="ts">
import { svgs } from "../assets/svg/svgResources";
export default defineComponent({
  name: "svgIcon",
  props: ["icon", "width", "height"],
  setup(props) {
    const svg = ref<string>(props.icon);
    const targetSvg = computed(() => {
      return svgs.find((svgElement: svgIcon) => {
        return svg.value === svgElement.name;
      });
    });
    // onMounted(() => {
    //   console.log(targetSvg.value);
    // });
    return {
      svg,
      targetSvg,
    };
  },
});
</script>
