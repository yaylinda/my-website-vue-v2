<template>
  <div class="simple-war-view">
    <h1>Simple War</h1>
    <p class="todo">// TODO - content coming soon...</p>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component({
    components: {
    },
  })
  export default class SimpleWarView extends Vue {

  }
</script>

<style scoped lang="scss">
  .simple-war-view {
    margin-left: 5%;
    margin-right: 5%;
  }

  .todo {
    color: gray;
  }
</style>
