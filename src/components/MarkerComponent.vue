<template>
  <div class="marker" :style="position" @click="$emit('marker-click', markerId)">
    <img class="gray" src="../assets/circle-icon.svg" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class MarkerComponent extends Vue {
  @Prop() public markerId!: string;
  @Prop() public position!: string;
}
</script>

<style scoped lang="scss">
.marker {
  height: 24px;
  width: 24px;
  z-index: 100;
  position: absolute;
}

.marker :hover {
  cursor: pointer;
}
</style>