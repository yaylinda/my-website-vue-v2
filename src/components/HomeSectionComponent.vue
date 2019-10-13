<template>
  <div class="home-section-component">
    <h1>{{ title }}</h1>
  </div>
</template>

<script lang="ts">

    import { Component, Prop, Vue } from 'vue-property-decorator';

    @Component({
        components: {},
        })
    export default class HomeSectionComponent extends Vue {
      @Prop() private title!: string;
    }

</script>

<style scoped lang="scss">

</style>
