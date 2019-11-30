<template>
  <div class="person" :style="position">
    <img src="../assets/pikachu-female.gif" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class PersonComponent extends Vue {
  @Prop() position!: string;
}
</script>

<style scoped lang="scss">
.person {
  position: absolute;
  z-index: 1000;
  background-size: contain;
  img {
    height: 24px;
    width: 24px;
  }
}
</style>