<template>
  <div class="game-board-component">
      {{game.id}}
      <md-button @click="$emit('backToGamesList')">Back</md-button>
  </div>
</template>

<script lang="ts">

    import { Component, Prop, Vue } from 'vue-property-decorator';
    import { Game } from '../models/simple-war';

    @Component({
        components: {},
        })
    export default class GameBoardComponent extends Vue {
      @Prop() private game!: Game;

    }

</script>

<style scoped lang="scss">

</style>