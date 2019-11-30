<template>
  <div class="game-board-component">
    <md-card class="board-section">
      <md-card-content class="cell-container">
        <div v-for="(col, j) in game.gameConfiguration.numCols" :key="(col, j)">
          <div v-for="(row, i) in game.gameConfiguration.numRows" :key="(row, i)" @click="dropCardHandler(i, j)">
            <drop
              class="cell"
              @dragover="dragOver(i, j, ...arguments)"
              @dragleave="dragLeave(i, j, ...arguments)"
              @drop="dropCardHandler(i, j, ...arguments)"
            >
              <card-component
                v-for="(c, cIndex) in game.board[i][j].cards.length"
                :key="(c, cIndex)"
                :card="game.board[i][j].cards[cIndex]"
                :isOnBoard="true"
                :username="game.username"
                :isSmall="game.board[i][j].cards.length > 1"
              ></card-component>
            </drop>
          </div>
        </div>
      </md-card-content>
    </md-card>

    <md-card class="cards-section">
      <md-card-content class="cell-container">
        <div class="game-info">
          <md-chip v-if="game.currentTurn" class="md-elevation-1">
            <i class="fa fa-check my-turn"></i>
            <md-tooltip md-direction="top">My Turn</md-tooltip>
          </md-chip>
          <md-chip v-else class="md-elevation-1">
            <i class="fa fa-clock-o opponent-turn"></i>
            <md-tooltip md-direction="top">Opponent's Turn</md-tooltip>
          </md-chip>
          <md-chip class="md-elevation-1">
            <i class="fa fa-bolt energy-marker"></i>
            {{game.energy}}
            <md-tooltip md-direction="top">{{game.energy}} Energy Remaining</md-tooltip>
          </md-chip>
        </div>
        <div class="cell" v-for="(c, index) in game.cards.length" :key="index">
          <drag :transfer-data="game.cards[index]" @dragstart="dragCardStartHandler(index)">
            <card-component
              @cardClickedEvent="cardClickedHandler(index)"
              @testMounted="testMounted(index)"
              :card="game.cards[index]"
              :isOnBoard="false"
              :username="game.username"
            ></card-component>
          </drag>
        </div>
      </md-card-content>

      <md-card-actions class="card-section-actions">
        <md-button
          class="md-raised md-accent"
          @click="discardCardsAndEndTurn(true)"
          :disabled="!game.currentTurn"
        >Discard & End Turn</md-button>
        <md-button
          class="md-raised md-accent"
          @click="discardCardsAndEndTurn(false)"
          :disabled="!game.currentTurn"
        >End Turn</md-button>
      </md-card-actions>
    </md-card>

    <md-card class="stats-section">
      <md-card-content>
        <md-chip v-if="game.isAi">
          <i class="fa fa-android"></i>
          <md-tooltip>Opponent is AI</md-tooltip>
        </md-chip>
        <md-chip>
          <i class="fa fa-handshake-o"></i>
          {{game.opponentName}}
          <md-tooltip>Opponent</md-tooltip>
        </md-chip>
        <md-chip>
          <i class="fa fa-spinner"></i>
          {{game.status}}
          <md-tooltip>Game Status</md-tooltip>
        </md-chip>
        <md-chip>
          <i class="fa fa-tasks"></i>
          {{game.points}} vs. {{game.opponentPoints}}
          <md-tooltip>Scores</md-tooltip>
        </md-chip>
        <md-chip>
          <i class="fa fa-line-chart"></i>
          {{game.gameStats.totalCardsPlayed}}
          <md-tooltip>Total Cards Played</md-tooltip>
        </md-chip>
        <md-chip>
          <i class="fa fa-line-chart"></i>
          {{game.gameStats.numTurns}}
          <md-tooltip>Number of Turns</md-tooltip>
        </md-chip>
        <md-chip>
          <i class="fa fa-line-chart"></i>
          {{game.gameStats.totalEnergyUsed}}
          <md-tooltip>Total Energy Used</md-tooltip>
        </md-chip>
        <md-chip>
          <i class="fa fa-line-chart"></i>
          {{game.gameStats.totalMightPlaced}}
          <md-tooltip>Total Might Placed</md-tooltip>
        </md-chip>
        <md-chip>
          <i class="fa fa-line-chart"></i>
          {{game.gameStats.totalAdvancementPoints}}
          <md-tooltip>Total Advancement Points</md-tooltip>
        </md-chip>
        <md-chip>
          <i class="fa fa-calendar-o"></i>
          {{getAgoTime(game.createdDate, game.currentTimestamp)}}
          <md-tooltip>Created Date</md-tooltip>
        </md-chip>
        <md-chip>
          <i class="fa fa-calendar-o"></i>
          {{getAgoTime(game.lastModifiedDate, game.currentTimestamp)}}
          <md-tooltip>Last Modified Date</md-tooltip>
        </md-chip>
        <md-chip>
          <i class="fa fa-calendar-o"></i>
          {{getAgoTime(game.player2JoinDate, game.currentTimestamp)}}
          <md-tooltip>Player 2 Joined Date</md-tooltip>
        </md-chip>
        <md-chip>
          <i class="fa fa-calendar-o"></i>
          {{getAgoTime(game.completedDate, game.currentTimestamp)}}
          <md-tooltip>Completed Date</md-tooltip>
        </md-chip>
        <md-chip>
          <i class="fa fa-trophy"></i>
          {{game.winner}}
          <md-tooltip>Winner</md-tooltip>
        </md-chip>
        <md-chip v-if="game.gameConfiguration.isAdvanced">
          <i class="fa fa-cogs"></i>
          <md-tooltip>Advanced Game</md-tooltip>
        </md-chip>
        <md-chip v-else>
          <i class="fa fa-cog"></i>
          <md-tooltip>Default Game</md-tooltip>
        </md-chip>
        <md-chip v-if="game.gameConfiguration.isAdvanced">{{game.gameConfiguration}}</md-chip>
      </md-card-content>
    </md-card>

    <md-button @click="$emit('backToGamesList')">Back</md-button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { Game, Card } from "../models/simple-war";
import CardComponent from "@/components/CardComponent.vue";
import { getAgoTime } from "../utils/utilities";

@Component({
  components: {
    CardComponent
  }
})
export default class GameBoardComponent extends Vue {
  @Prop() public game!: Game;
  @Prop() public host!: string;

  public selectedCardIndex!: number;
  public SESSION_TOKEN_STR: string = "Session-Token";

  updateGameManually(gameId: string) {
    console.log("updateGameManually");
    this.$http
      .get(`${this.host}/games/${gameId}`, {
        headers: {
          "Session-Token": this.$cookies.get(this.SESSION_TOKEN_STR)
        }
      })
      .then(
        result => {
          if (result.ok && result.data) {
            this.game = result.data;
            this.$emit("updateGameBoard", this.game);
          } else {
            throw new Error(JSON.stringify(result));
          }
        },
        error => {
          console.log(error);
          this.$emit("showError", error);
        }
      );
  }

  cardClickedHandler(handIndex: number) {
    console.log(
      `[GameBoardComponent] got event 'cardClickedEvent' for handIndex=${handIndex}`
    );
    this.game.cards.forEach(c => {
      c.clicked = false;
    });
    this.game.cards[handIndex].clicked = true;
    this.selectedCardIndex = handIndex;
  }

  dragCardStartHandler(handIndex: number) {
    console.log(`drag event start, handIndex=${handIndex}`);
    this.game.cards[handIndex].clicked = true;
    this.selectedCardIndex = handIndex;
  }

  dropCardHandler(i: number, j: number, data: any, event: any) {
    console.log(`dropped on row=${i}, col=${j}, data=${JSON.stringify(data)}`);

    if (event) {
      event.target.classList.remove("md-elevation-12");
      event.target.classList.add("md-elevation-1");
    }

    if (!data) {
      data = this.game.cards[this.selectedCardIndex];
    }

    if (data && data.clicked) {
      this.$http
        .put(
          `${this.host}/games/putCard/${this.game.id}`,
          {
            row: i,
            col: j,
            cardIndex: this.selectedCardIndex,
            card: data
          },
          {
            headers: {
              "Session-Token": this.$cookies.get(this.SESSION_TOKEN_STR)
            }
          }
        )
        .then(
          result => {
            if (result.ok && result.data) {
              this.game = result.data.game;
              this.$emit("updateGameBoard", this.game);
              if (result.data.status === "INVALID") {
                this.$emit("showError", result.data.message);
              }
            } else {
              throw new Error(JSON.stringify(result));
            }
          },
          error => {
            console.log(error);
            this.$emit("showError", error);
          }
        );
      this.game.cards.forEach(c => {
        c.might += 1;
        c.might -= 1;
        c.clicked = false;
      });
    }
  }

  dragOver(i: number, j: number, data: any, event: any) {
    console.log(`drag over row:${i}, col:${j}`);
    event.target.classList.remove("md-elevation-1");
    event.target.classList.add("md-elevation-12");
  }

  dragLeave(i: number, j: number, data: any, event: any) {
    console.log(`drag leave row:${i}, col:${j}`);
    event.target.classList.remove("md-elevation-12");
    event.target.classList.add("md-elevation-1");
  }

  discardCardsAndEndTurn(discard: boolean) {
    console.log(`end turn, discard=${discard}`);
    this.$http
      .get(`${this.host}/games/endTurn/${this.game.id}?discard=${discard}`, {
        headers: {
          "Session-Token": this.$cookies.get(this.SESSION_TOKEN_STR)
        }
      })
      .then(
        result => {
          if (result.ok && result.data) {
            this.game = result.data;
            this.$emit("updateGameBoard", this.game);
          } else {
            throw new Error(JSON.stringify(result));
          }
        },
        error => {
          console.log(error);
          this.$emit("showError", error);
        }
      );
  }

  getAgoTime(dateStr: string, currentStr: string) {
    return getAgoTime(dateStr, currentStr);
  }
}
</script>

<style scoped lang="scss">
.board-section {
  border-top: white 4px solid;
}

.cards-section {
  border-top: white 4px solid;
  border-bottom: white 4px solid;
}

.cell-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

.cell {
  border-radius: 25%;
  border: white 2px solid;
  margin: 5px;
  height: 50px;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cell :hover {
  cursor: pointer;
}

.md-card-actions {
  justify-content: center !important;
}

.game-info {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 5px;

  .md-chip {
    background: white;
    color: black;
  }
}

.stats-section {
  .md-chip {
    margin-bottom: 5px;
  }
}

.my-turn {
  color: #50e3c2;
}

.opponent-turn {
  color: #ff4495;
}

.energy-marker {
  margin-right: 5px;
  color: gold;
}

.fa-cog {
  color: #81dafc;
}

.fa-cogs {
  color: #81dafc;
}

.fa-calendar-o {
  color: #ff6961;
}

.fa-trophy {
  color: gold;
}

.fa-line-chart {
  color: #b19cd9;
}

.fa-tasks {
  color: lightgreen;
}

.fa-handshake-o {
  color: #81dafc;
}

.fa-spinner {
  color: yellow;
}

.fa-android {
  color: #a4c639;
}
</style>