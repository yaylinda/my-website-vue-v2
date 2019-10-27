<template>
  <div class="game-board-component">

    <md-card>

        <md-card-header>
            <div class="md-title">The Field</div>
        </md-card-header>

        <md-card-content class="cell-container">
            <div v-for="(col, i) in game.numCols" :key="(col, i)">
                <div class="cell md-elevation-1" v-for="(row, i) in game.numRows" :key="(row, i)">
                    <card-component :card="card"></card-component>
                </div>
            </div>
        </md-card-content>

    </md-card>

    <md-card>
        <md-card-header>
            <div class="md-title">My Cards</div>
        </md-card-header>

        <md-card-content class="cell-container">
            <div v-for="(card, index) in game.cards" :key="(card, index)" class="cell md-elevation-1">
                <card-component :card="card"></card-component>
            </div>
        </md-card-content>
    </md-card>

    <md-button @click="$emit('backToGamesList')">Back</md-button>

  </div>
</template>

<script lang="ts">

    import { Component, Prop, Vue } from 'vue-property-decorator';
    import { Game } from '../models/simple-war';
    import CardComponent from '@/components/CardComponent.vue';

    @Component({
        components: {
            CardComponent
        },
    })
    export default class GameBoardComponent extends Vue {
      @Prop() private game!: Game;

    }

</script>

<style scoped lang="scss">

    .cell-container {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
    }

    .cell {
        border-radius: 25%;
        margin: 10px;
        height: 72px;
        width: 72px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .cell-content {
    }

    .cell :hover {
        cursor: pointer;
    }

</style>