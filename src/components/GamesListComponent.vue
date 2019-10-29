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
            v-if="games.length == 0"
            md-rounded
            md-icon=""
            :md-label="emptyTitle"
            :md-description="emptySubtitle">
          </md-empty-state>

          <md-card v-for="(g, index) in games" :key="(g, index)">
              <md-card-header>
                <md-avatar>
                  <md-icon v-if="g.currentTurn"><i style="color:green" class="fa fa-circle"></i></md-icon>
                  <md-icon v-else><i style="color:red" class="fa fa-circle"></i></md-icon>
                </md-avatar>
                <div class="md-title">{{g.username}} vs {{g.opponentName}}</div>
                <div class="md-subtitle">{{g.points}} - {{g.opponentPoints}}</div>
              </md-card-header>
              <md-card-content>
                <p v-if="isMyGames">Status: {{g.status}}</p>
                <p>Last Update: {{g.lastModifiedDate}}</p>
                <p v-if="isMyGames">Player 2 Joined: {{g.player2JoinDate}}</p>
                <p>Created: {{g.createdDate}}</p>
              </md-card-content>
              <md-card-actions>
                <md-button v-if="isMyGames" @click="goToGame(g, index, false, false)">Go to Game</md-button>
                <md-button v-else @click="goToGame(g, index, false, true)">Join Game</md-button>
              </md-card-actions>
          </md-card>

        </md-card-content>

        <md-card-actions v-if="isMyGames">
          <md-button @click="goToGame(null, -1, true)">New Game</md-button>
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

      goToGame(game: Game, gameIndex: number, isNew: boolean, isJoining: boolean) {
          console.log(`goToGame clicked, gameId=${game ? game.id : 'undefined'}, gameIndex=${gameIndex}, isNew=${isNew}, isJoining=${isJoining}`)
          this.$emit('goToGameEvent', game, gameIndex, isNew, isJoining);
      }
    }

</script>

<style scoped lang="scss">

</style>