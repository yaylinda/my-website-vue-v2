<template>
  <div class="games-list-component md-xsmall-size-100 md-small-size-100 md-medium-size-50 md-large-size-50 md-xlarge-size-50">  

      <md-card>
        <md-card-header>
          <md-avatar>
            <md-icon><i class="fa fa-star-half-o"></i></md-icon>
          </md-avatar>
          <div class="md-title">{{title}}</div>
          <div class="md-subtitle">{{subtitle}}</div>
        </md-card-header>

        <md-card-content>
          <md-empty-state 
            v-if="games.length === 0"
            md-icon="phonelink"
            :md-label="emptyTitle"
            :md-description="emptySubtitle">
          </md-empty-state>

          <md-card v-for="(g, index) in games" :key="(g, index)">
              <md-card-header>
                <div v-if="g.status !== 'COMPLETED'">
                  <md-avatar v-if="g.currentTurn">
                    <md-tooltip md-direction="bottom">My Turn</md-tooltip>                  
                    <md-icon><i class="fa fa-check my-turn"></i></md-icon>
                  </md-avatar>
                  <md-avatar v-else>
                    <md-tooltip md-direction="bottom">Opponent's Turn</md-tooltip>                  
                    <md-icon><i class="fa fa-clock-o opponent-turn"></i></md-icon>
                  </md-avatar>
                </div>
                <div v-else>
                  <md-avatar>
                    <md-tooltip md-direction="bottom">Game is Completed</md-tooltip>                  
                    <md-icon><i class="fa fa-check-square-o my-turn"></i></md-icon>
                  </md-avatar>
                </div>

                <div class="md-title">{{g.username}} vs {{g.opponentName}}<i v-if="g.useAdvancedConfigs" class="fa fa-cogs advanced-game-marker"><md-tooltip>Advanced Game</md-tooltip></i></div>
                <div class="md-subtitle">{{g.points}} - {{g.opponentPoints}}</div>
              </md-card-header>

              <md-card-expand>
                <md-card-actions md-alignment="space-between">
                  <md-card-expand-trigger>
                    <md-button>More Info</md-button>
                  </md-card-expand-trigger>
                  <md-button v-if="isMyGames" @click="goToGame(g, index, false, false, false)">Go to Game</md-button>
                  <md-button v-if="isJoinable" @click="goToGame(g, index, false, true, false)">Join Game</md-button>
                </md-card-actions>

                <md-card-expand-content>
                  <md-card-content>
                    <p v-if="isCompleted">Winner: {{g.winner}}</p>
                    <p v-if="isMyGames">Status: {{g.status}}</p>
                    <p>Last Update: {{g.lastModifiedDate}}</p>
                    <p v-if="isMyGames">Player 2 Joined: {{g.player2JoinDate}}</p>
                    <p>Created: {{g.createdDate}}</p>
                    <p v-if="g.useAdvancedConfigs">{{g.advancedGameConfigs}}</p>
                  </md-card-content>
                </md-card-expand-content>
              </md-card-expand>

              <md-card-actions>
                
              </md-card-actions>

          </md-card>

        </md-card-content>

        <md-card-actions v-if="isMyGames">
          <md-button @click="goToGame(null, -1, true, false, true)">New Game (Advanced)</md-button>
          <md-button @click="goToGame(null, -1, true, false, false)">New Game (Default)</md-button>
        </md-card-actions>

      </md-card>

    </div>
</template>

<script lang="ts">

    import { Component, Prop, Vue } from 'vue-property-decorator';
    import { Game } from '../models/simple-war';

    @Component({
        components: {},
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

      goToGame(game: Game, gameIndex: number, isNew: boolean, isJoining: boolean, isAdvanced: boolean) {
          console.log(`goToGame clicked, gameId=${game ? game.id : 'undefined'}, gameIndex=${gameIndex}, isNew=${isNew}, isJoining=${isJoining}, isAdvanced=${isAdvanced}`)
          this.$emit('goToGameEvent', game, gameIndex, isNew, isJoining, isAdvanced);
      }
    }

</script>

<style scoped lang="scss">
    .my-turn {
        color: #50e3c2;
    }

    .opponent-turn {
        color: #ff4495;
    }

    .advanced-game-marker {
      float: right;
      color: #50e3c2;
    }
</style>