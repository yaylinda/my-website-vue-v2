<template>
  <div class="home-section-component">
    <div>
      <h1 :class="titleAlign === 'right' ? 'align-right' : 'align-left'">{{ title }}</h1>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class HomeSectionComponent extends Vue {
  @Prop() private title!: string;
  @Prop() private titleAlign!: string;
}
</script>

<style scoped lang="scss">
.align-right {
  text-align: right;
}

.align-left {
  text-align: left;
}

.home-section-component {
  margin-bottom: 7%;
}
</style>
