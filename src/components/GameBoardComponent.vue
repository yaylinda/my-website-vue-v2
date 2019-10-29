<template>
  <div class="game-board-component">

    <md-card>
        <md-card-header>
            <div class="md-title">The Field</div>
        </md-card-header>

        <md-card-content class="cell-container">
            <div v-for="(col, j) in game.numCols" :key="(col, j)">
                <drop class="cell md-elevation-1" v-for="(row, i) in game.numRows" :key="(row, i)" @drop="dropCardHandler(i, j, ...arguments)">
                    <card-component v-for="c in game.board[i][j].length" :key="c" :card="game.board[i][j][c]" :isOnBoard="false"></card-component>
                </drop>
            </div>
        </md-card-content>
    </md-card>

    <md-card>
        <md-card-header>
            <div class="md-title">My Cards</div>
        </md-card-header>

        <md-card-content class="cell-container">
            <div class="cell md-elevation-1" v-for="index in [0,1,2,3]" :key="index">
                <drag :transfer-data="game.cards[index]" @dragstart="dragCardStartHandler(index)">
                    <card-component 
                        @cardClickedEvent="cardClickedHandler(index)" 
                        :card="game.cards[index]"
                        :isOnBoard="true">
                    </card-component>
                </drag>
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

        public selectedCardIndex: number = -1;
        public SESSION_TOKEN_STR: string = 'Session-Token';
        public host: string = "http://localhost:8080";

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
        }

        dragCardStartHandler(handIndex: number) {
            console.log(`drag event start, handIndex=${handIndex}`);
            this.selectedCardIndex = handIndex;
        }

        dropCardHandler(i: number, j: number, data: any) {
            console.log(`dropped on row=${i}, col=${j}, data=${JSON.stringify(data)}`);
            // TODO - put card
            this.$http.put(`${this.host}/games/putCard/${this.game.id}`, {
                row: i,
                col: j,
                cardIndex: this.selectedCardIndex,
                card: data
            }, {
                headers: {
                    'Session-Token' : this.$cookies.get(this.SESSION_TOKEN_STR)
                }
            }).then(result => {
                if (result.ok && result.data) {
                    console.log('successful put card!');
                    console.log(result.data);
                    this.$emit('updateGameBoard', result.data.game);
                    if (result.data.status === 'INVALID') {
                        this.$emit('showError', result.data.message);
                    }
                } else {
                    throw new Error(JSON.stringify(result));
                }
            }, error => {
                console.log(error);
                this.$emit('showError', error);
            });
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