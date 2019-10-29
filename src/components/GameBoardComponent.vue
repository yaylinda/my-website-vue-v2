<template>
  <div class="game-board-component">

    <md-card>
        <md-card-header>
            <div class="md-title">The Field</div>
        </md-card-header>

        <md-card-content class="cell-container">
            <div v-for="(col, j) in game.numCols" :key="(col, j)">
                <div @click="boardCellClick(i, j)" class="cell md-elevation-1" v-for="(row, i) in game.numRows" :key="(row, i)">
                    <card-component v-for="c in game.board[i][j].length" :key="c" :card="game.board[i][j][c]"></card-component>
                </div>
            </div>
        </md-card-content>
    </md-card>

    <md-card>
        <md-card-header>
            <div class="md-title">My Cards</div>
        </md-card-header>

        <md-card-content class="cell-container">
            <div class="cell md-elevation-1" v-for="index in [0,1,2,3]" :key="index">
                <card-component 
                    @cardClickedEvent="cardClickedHandler(index)" 
                    :card="game.cards[index]">
                </card-component>
            </div>
        </md-card-content>

        <md-card-actions>
            <md-button class="md-raised md-accent" @click="discard">Discard Hand</md-button>
            <md-button class="md-raised md-accent" @click="endTurn">End Turn</md-button>
        </md-card-actions>
    </md-card>

    <md-card>
        <md-card-header>
            <div class="md-title">Game Stats</div>
        </md-card-header>
        <md-card-content>
            <md-chip>Energy: {{game.energy}}</md-chip>
            <md-chip>My Turn: {{game.currentTurn}}</md-chip>
            <md-chip>Opponent: {{game.opponentName}}</md-chip>
            <md-chip>Status: {{game.status}}</md-chip>
            <md-chip>Score: {{game.points}} vs. {{game.opponentPoints}}</md-chip>
            <md-chip>Cards Played: {{game.gameStats.totalCardsPlayed}}</md-chip>
            <md-chip>Number of Turns: {{game.gameStats.numTurns}}</md-chip>
            <md-chip>Total Energy Used: {{game.gameStats.totalEnergyUsed}}</md-chip>
            <md-chip>Total Might Placed: {{game.gameStats.totalMightPlaced}}</md-chip>
            <md-chip>Total Advancement Points: {{game.gameStats.totalAdvancementPoints}}</md-chip>
            <md-chip>Created: {{game.createdDate}}</md-chip>
            <md-chip>Player 2 Joined: {{game.player2JoinDate}}</md-chip>
            <md-chip>Last Modified: {{game.lastModifiedDate}}</md-chip>
            <md-chip>Completed: {{game.completedDate}}</md-chip>
        </md-card-content>
    </md-card>

    <md-button @click="$emit('backToGamesList')">Back</md-button>

  </div>
</template>

<script lang="ts">

    import { Component, Prop, Vue, Watch} from 'vue-property-decorator';
    import { Game, Card } from '../models/simple-war';
    import CardComponent from '@/components/CardComponent.vue';

    @Component({
        components: {
            CardComponent
        },
    })
    export default class GameBoardComponent extends Vue {
        @Prop() public game!: Game;

        private selectedCard: Card = new Card();

        boardCellClick(rowNum: number, colNum: number) {
            console.log(`BOARD cell click, row: ${rowNum}, col: ${colNum}`);
        }

        cardClickedHandler(handIndex: number) {
            console.log(`HAND cell click, handIndex: ${handIndex}`);

            this.game.cards.forEach(c => {
                c.might += 1;
                c.might -= 1;
                c.clicked = false;
            });

            this.game.cards[handIndex].might += 1;
            this.game.cards[handIndex].might -= 1;
            this.game.cards[handIndex].clicked = true;
            this.selectedCard = this.game.cards[handIndex];
        }

        discard() {
            console.log('discard clicked');
        }

        endTurn() {
            console.log('endTurn clicked');
        }
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