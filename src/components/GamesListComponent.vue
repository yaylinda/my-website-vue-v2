<template>
  <div
    class="games-list-component md-xsmall-size-100 md-small-size-100 md-medium-size-100 md-large-size-100 md-xlarge-size-100"
  >
    <md-card class="games-list-card">
      <md-card-header>
        <md-avatar>
          <md-icon>
            <i class="fa fa-star-half-o"></i>
          </md-icon>
        </md-avatar>
        <div class="md-title">{{title}}</div>
        <div class="md-subtitle">{{subtitle}}</div>
      </md-card-header>

      <md-card-content class="outer-card-content md-layout md-alignment-top-center md-gutter">
        <md-empty-state
          v-if="games.length === 0"
          md-icon="phonelink"
          :md-label="emptyTitle"
          :md-description="emptySubtitle"
        ></md-empty-state>

        <div
          v-for="(g, index) in games"
          :key="(g, index)"
          class="md-layout-item md-xsmall-size-100 md-small-size-100 md-medium-size-50 md-large-size-50 md-xlarge-size-50"
        >
          <md-card class="one-game-card">
            <md-card-header>
              <div v-if="g.status !== 'COMPLETED'">
                <md-avatar v-if="g.currentTurn">
                  <md-tooltip md-direction="bottom">My Turn</md-tooltip>
                  <md-icon>
                    <i class="fa fa-check my-turn"></i>
                  </md-icon>
                </md-avatar>
                <md-avatar v-else>
                  <md-tooltip md-direction="bottom">Opponent's Turn</md-tooltip>
                  <md-icon>
                    <i class="fa fa-clock-o opponent-turn"></i>
                  </md-icon>
                </md-avatar>
              </div>
              <div v-else>
                <md-avatar>
                  <md-tooltip md-direction="bottom">Game is Completed</md-tooltip>
                  <md-icon>
                    <i class="fa fa-check-square-o my-turn"></i>
                  </md-icon>
                </md-avatar>
              </div>

              <div class="md-title">{{g.username}} vs {{g.opponentName}}</div>
              <div class="md-subtitle">{{g.points}} - {{g.opponentPoints}}</div>
            </md-card-header>

            <md-card-content>
              <md-chip v-if="g.isAi">
                <i class="fa fa-android"></i>
                <md-tooltip>Opponent is AI</md-tooltip>
              </md-chip>

              <md-chip v-if="g.useAdvancedConfigs">
                <i class="fa fa-cogs"></i>
                <md-tooltip>Advanced Game</md-tooltip>
              </md-chip>
              <md-chip v-else>
                <i class="fa fa-cog"></i>
                <md-tooltip>Default Game</md-tooltip>
              </md-chip>

              <md-chip v-if="!isCompleted">
                <i class="fa fa-calendar-check-o"></i>
                {{getAgoTime(g.lastModifiedDate, g.currentTimestamp)}}
                <md-tooltip>Updated</md-tooltip>
              </md-chip>
              <md-chip v-if="!isCompleted">
                <i class="fa fa-calendar-plus-o"></i>
                {{getAgoTime(g.createdDate, g.currentTimestamp)}}
                <md-tooltip>Created</md-tooltip>
              </md-chip>

              <md-chip v-if="showGoToGame" @click="goToGame(g)">
                <i class="fa fa-arrow-right"></i>
                <md-tooltip>Go To Game</md-tooltip>
              </md-chip>

              <md-chip v-if="isCompleted">
                <i class="fa fa-trophy pad-right"></i>
                {{g.winner}}
              </md-chip>
              <md-chip v-if="isCompleted">
                <i class="fa fa-calendar-plus-o pad-right"></i>
                Completed: {{getAgoTime(g.completedDate, g.currentTimestamp)}}
              </md-chip>
            </md-card-content>
          </md-card>
        </div>
      </md-card-content>
    </md-card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Game } from "../models/simple-war";
import { getAgoTime } from "../utils/utilities";

@Component({
  components: {}
})
export default class GamesListComponent extends Vue {
  @Prop() private games!: Game[];
  @Prop() private title!: string;
  @Prop() private subtitle!: string;
  @Prop() private emptyTitle!: string;
  @Prop() private emptySubtitle!: string;
  @Prop() private isMyGames!: boolean;
  @Prop() private isJoinable!: boolean;
  @Prop() private isCompleted!: boolean;
  @Prop() private showGoToGame!: boolean;

  goToGame(game: Game) {
    console.log(`goToGame clicked, gameId=${game.id}`);
    this.$emit("goToGameEvent", game);
  }

  getAgoTime(dateStr: string, currentStr: string) {
    return getAgoTime(dateStr, currentStr);
  }
}
</script>

<style scoped lang="scss">
.outer-card-content {
  overflow-y: scroll;
}

.games-list-card {
  border-top: white 4px solid;
}

.card-section-actions {
  justify-content: center !important;
}

.one-game-card {
  border-radius: 10px;
  border: #50e3c2 1px solid;
  margin-top: 10px;

  .md-title {
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
  }
}

.md-chip {
  margin-bottom: 5px;
  cursor: pointer;
  .pad-right {
    margin-right: 5px;
  }
}

.my-turn {
  color: #50e3c2;
}

.opponent-turn {
  color: #ff4495;
}

.fa-star-half-o {
  color: gold;
}

.fa-trophy {
  color: gold;
}

.fa-arrow-right {
  color: lightgreen;
}

.fa-plus {
  color: lightgreen;
}

.fa-cog {
  color: #81dafc;
}

.fa-cogs {
  color: #81dafc;
}

.fa-calendar-plus-o {
  color: #ff6961;
}

.fa-calendar-check-o {
  color: #ff6961;
}

.fa-android {
  color: #a4c639;
}
</style>