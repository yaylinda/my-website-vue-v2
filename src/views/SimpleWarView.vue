<template>
  <div class="simple-war-view">

    <h1>Simple War (BETA)</h1>

    <md-toolbar class="md-primary">
      <h6 v-if="!isAuthenticated" class="md-title" style="flex: 1">
        <a class="link-text" @click="doLogin"><b>Login</b></a> or <a class="link-text" @click="doRegister"><b>Register</b></a> to play
      </h6>

      <div v-if="isAuthenticated" class="md-title" style="flex: 1"></div>

      <div v-if="isAuthenticated">
        <md-button v-if="showGameBoard" @click="goToGamesList" class="md-icon-button">
          <md-icon><i class="fa fa-arrow-left"></i></md-icon>
          <md-tooltip>Back to Games List</md-tooltip>
        </md-button>

        <md-button v-if="showGameBoard" @click="nextActiveGame" class="md-icon-button">
          <md-icon><i class="fa fa-arrow-right"></i></md-icon>
          <md-tooltip>Next Active Game</md-tooltip>
        </md-button>

        <md-button v-if="!showGameBoard" @click="newGame" class="md-icon-button">
          <md-icon><i class="fa fa-plus"></i></md-icon>
          <md-tooltip>New Game</md-tooltip>
        </md-button>

        <md-button @click="refresh" class="md-icon-button">
          <md-icon><i class="fa fa-refresh"></i></md-icon>
          <md-tooltip>Refresh Games</md-tooltip>
        </md-button>

        <md-menu md-direction="bottom-end">
          <md-button md-menu-trigger>
            <md-icon><i class="fa fa-bars"></i></md-icon>
          </md-button>
          <md-menu-content>
            <md-menu-item v-if="!showGamesList" @click="goToGamesList">My Games</md-menu-item>
            <md-menu-item v-if="!showMyProfile" @click="goToMyProfile">My Profile</md-menu-item>
            <md-menu-item @click="logout">Log Out</md-menu-item>
          </md-menu-content>
        </md-menu>
      </div>

    </md-toolbar>

    <div v-if="isAuthenticated">

      <game-board-component
        v-if="showGameBoard"
        :game="selectedGame"
        :host="host"
        @updateGameBoard="updateGameBoard"
        @showError="showError"
        @goToGamesList="goToGamesList"
        ref="gameBoardComponent">
      </game-board-component>

      <div v-if="showGamesList" class="md-layout md-gutter">

        <games-list-component
          v-if="games.length || (!waiting.length && !pending.length && !completed.length)"
          class="md-layout-item"
          @goToGameEvent="goToGameHandler"
          :games="games"
          title="My Games"
          subtitle="Advance your troops in Simple Wars"
          emptyTitle="Nothing to do"
          emptySubtitle="Start a new game!"
          :isMyGames=true
          :isJoinable=false
          :isCompleted=false
          :showGoToGame=true>
        </games-list-component>

        <games-list-component
          v-if="waiting.length"
          class="md-layout-item"
          @goToGameEvent="goToGameHandler"
          :games="waiting"
          title="Opponent's Turn"
          subtitle="Tell them to hurry!"
          emptyTitle=""
          emptySubtitle=""
          :isMyGames=false
          :isJoinable=false
          :isCompleted=false
          :showGoToGame=true>
        </games-list-component>

        <games-list-component
          v-if="pending.length"
          class="md-layout-item"
          @goToGameEvent="goToGameHandler"
          :games="pending"
          title="Pending Opponent"
          subtitle="Waiting for someone to join!"
          emptyTitle=""
          emptySubtitle=""
          :isMyGames=false
          :isJoinable=false
          :isCompleted=false
          :showGoToGame=true>
        </games-list-component>

        <games-list-component
          v-if="completed.length"
          class="md-layout-item"
          @goToGameEvent="goToGameHandler"
          :games="completed"
          title="Completed Games"
          subtitle="You've put up some good fights!"
          emptyTitle=""
          emptySubtitle=""
          :isMyGames=false
          :isJoinable=false
          :isCompleted=true
          :showGoToGame=false>
        </games-list-component>

        <md-dialog :md-active.sync="showAdvancedConfig">
          <md-dialog-title>Advanced Configurations</md-dialog-title>
            <md-dialog-content>
              <md-field>
                <label>Troop Drop Rate</label>
                <md-input 
                  v-model="advancedGameConfigs.troopDropRate" 
                  placeholder="Default: 0.5" 
                  type="number"
                  required>
                </md-input>
              </md-field>
              <md-field>
                <label>Defense Drop Rate</label>
                <md-input 
                  v-model="advancedGameConfigs.defenseDropRate" 
                  placeholder="Default: 0.3" 
                  type="number"
                  required>
                </md-input>
              </md-field>
              <md-field>
                <label>Wall Drop Rate</label>
                <md-input 
                  v-model="advancedGameConfigs.wallDropRate" 
                  placeholder="Default: 0.2" 
                  type="number"
                  required>
                </md-input>
              </md-field>
              <md-field>
                <label>Maximum Cards per Cell</label>
                <md-input 
                  v-model="advancedGameConfigs.maxCardsPerCell" 
                  placeholder="Default: 1" 
                  type="number"
                  required>
                </md-input>
              </md-field>
            </md-dialog-content>
            <md-dialog-actions>
              <md-button class="md-primary" @click="cancelAdvancedConfig">Cancel</md-button>
              <md-button class="md-primary" @click="confirmAdvancedConfig">Confirm</md-button>
            </md-dialog-actions>
        </md-dialog>
      </div>

      <div v-if="showMyProfile" class="md-layout md-gutter">

        <players-list-component 
          class="md-layout-item"
          :players="[player]"
          title="My Profile"
          subtitle="Information about me!"
          emptyTitle=""
          emptySubtitle="">
        </players-list-component>


      </div>
      
    </div>

    <md-card v-if="showLoginForm || showRegisterFrom">

      <md-card-header>
        <div class="md-title">{{showLoginForm ? 'Login' : 'Register'}}</div>
      </md-card-header>

      <md-card-content>

        <md-field>
          <label for="username">Username</label>
          <md-input name="username" id="username" v-model="form.username" :disabled="sending" />
        </md-field>

        <md-field>
          <label for="password">Password</label>
          <md-input type="password" name="password" id="password" v-model="form.password" :disabled="sending" />
        </md-field>

        <md-field v-if="showRegisterFrom">
          <label for="password-confirm">Confirm Password</label>
          <md-input type="password" name="password-confirm" id="password-confirm" v-model="form.passwordConfirmation" :disabled="sending" />
        </md-field>

      </md-card-content>

      <md-card-actions>
        <md-button 
        @click="validateAndSubmit" 
        class="md-primary" 
        :disabled="sending">
        {{showLoginForm ? 'Login' : 'Register'}}
        </md-button>
      </md-card-actions>
      
    </md-card>

    <md-snackbar @md-closed="resetSnackbarState" md-position="center" :md-duration="snackbarDuration" :md-active.sync="showSnackbar" md-persistent>
      <i v-if="snackbarType === 'SUCCESS'" class="fa fa-check-circle success-icon"></i>
      <i v-else class="fa fa-exclamation-circle warning-icon"></i>
      {{JSON.stringify(errors).replace('[', '').replace(']', '')}}
      <md-button class="md-primary" @click="showSnackbar = false">Okay</md-button>
    </md-snackbar>

  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import {Game, LogRegForm, User, AdvancedGameConfiguration, Player} from '@/models/simple-war';
  import { ErrorMessages } from '@/utils/constants';
  import GameBoardComponent from '@/components/GameBoardComponent.vue';
  import GamesListComponent from '@/components/GamesListComponent.vue';
  import PlayersListComponent from '@/components/PlayersListComponent.vue';

  @Component({
    components: {
      GameBoardComponent, GamesListComponent, PlayersListComponent
    },
  })
  export default class SimpleWarView extends Vue {

    public SESSION_TOKEN_STR: string = 'Session-Token';

    public showGamesList: boolean = true;
    public showGameBoard: boolean = false;
    public showMyFriends: boolean = false;
    public showMyProfile: boolean = false;
  
    public isAuthenticated: boolean = false;
    public showLoginForm: boolean = false;
    public showRegisterFrom: boolean = false;
    public showSnackbar: boolean = false;
    public snackbarDuration: number = 4000;
    public snackbarType: string = '';
    public showAdvancedConfig: boolean = false;
    public advancedGameConfigs: AdvancedGameConfiguration = new AdvancedGameConfiguration();

    public errors: string[] = [];
    public sending: boolean = false;
  
    public form: LogRegForm = new LogRegForm();
    public user: User = new User();

    public games: Game[] = [];
    public waiting: Game[] = [];
    public pending: Game[] = [];
    public completed: Game[] = [];

    public selectedGame: Game = new Game();
    public selectedGameId: string = '';

    public player: Player = new Player();
    public friends: Player[] = [];

    public host: string = "https://simple-war-backend.lindazheng.me";
    // public host: string = "http://localhost:8080";

    constructor() {
      super();
    }

    mounted() {
      console.log('mounted SimpleWar');
      const sessionToken = this.$cookies.get(this.SESSION_TOKEN_STR);
      console.log('sessionToken=', sessionToken);

      if (sessionToken) {
        console.log('sessionToken exists, validating token from server');
        this.sending = true;
        this.$http.get(`${this.host}/users/${sessionToken}`, sessionToken).then(result => {
          if (result.ok && result.data) {
            this.$cookies.set(this.SESSION_TOKEN_STR, result.data.sessionToken);
            this.user = result.data;
            this.isAuthenticated = true;
            console.log(`successfully validated user sessionToken: ${this.user.username}`);
            this.getGames();
          } else {
            this.isAuthenticated = false;
            throw new Error(JSON.stringify(result));
          }
          this.sending = false;
        }, (error) => {
          console.log(error);
          this.errors.push(error.body.message);
          this.showSnackbar = true;
          this.isAuthenticated = false;
          this.sending = false;
          this.snackbarType = 'WARNING';
        });
      } else {
        console.log('sessionToken does not exist');
        this.isAuthenticated = false;
      }
    }

    handleSnackbarMessage(message: string, type: string) {
      this.errors.push(message);
      this.snackbarType = type;
      this.showSnackbar = true;
    }

    validateAndSubmit() {
      this.errors = [];

      if (!this.form.username) {
        this.errors.push(ErrorMessages.USERNAME_IS_REQUIRED);
      }

      if (!this.form.password) {
        this.errors.push(ErrorMessages.PASSWORD_IS_REQUIRED);
      }

      if (this.showRegisterFrom) {
        if (this.form.password !== this.form.passwordConfirmation) {
          this.errors.push(ErrorMessages.PASSWORDS_DO_NOT_MATCH);
        }
      }

      this.form.email = 'test@test.com';

      if (this.errors.length > 0) {
        this.showSnackbar = true;
        this.snackbarType = 'WARNING';
      } else {
        this.errors = [];
        const path = this.showLoginForm ? 'login' : 'register';
        console.log(`posting to /${path}`);

        this.$http.post(`${this.host}/users/${path}`, this.form).then(result => {
          if (result.ok && result.data) {
            this.user = result.data;
            this.$cookies.set(this.SESSION_TOKEN_STR, result.data.sessionToken);
            this.isAuthenticated = true;
            this.showLoginForm = false;
            this.showRegisterFrom = false;
            console.log('successfully authenticated user:', this.user);
            this.getGames();
          } else {
            throw new Error(JSON.stringify(result));
          }
        }, (error) => {
            console.log(error);
            this.errors.push(error.body.message);
            this.showSnackbar = true;
            this.snackbarType = 'WARNING';
        });
      }
    }

    getGames() {
      this.errors = [];
      this.games = [];
      this.waiting = [];
      this.pending = [];
      this.completed = [];
      console.log('getting games for user:', this.user.username);
      this.$http.get(`${this.host}/games`, {
        headers: {
          'Session-Token' : this.user.sessionToken
        }
      }).then((result) => {
        if (result.ok && result.data) {
          console.log(`got ${result.data.length} games for ${this.user.username}`);
          result.data.forEach((g: Game) => {
            if (g.status === 'COMPLETED') {
              this.completed.push(g);
            } else if (g.opponentName === '<TBD>' && !g.currentTurn) {
              this.pending.push(g);
            } else if (!g.currentTurn) {
              this.waiting.push(g);
            } else {
              this.games.push(g);
            }
          });
        } else {
          throw new Error(JSON.stringify(result));
        }
      }, (error) => {
          console.log(error);
          this.errors.push(error.body.message);
          this.showSnackbar = true;
          this.snackbarType = 'WARNING';
      });
    }

    getGameById() {
      console.log(`getting data for gameId=${this.selectedGameId}`);
      this.$http.get(`${this.host}/games/${this.selectedGameId}`, {
        headers: {
          'Session-Token' : this.user.sessionToken
        }
      }).then((result) => {
        if (result.ok && result.data) {
          this.selectedGame = result.data;
          this.selectedGameId = result.data.id;
          console.log(`updated data for gameId=${this.selectedGameId}`);
        } else {
          throw new Error(JSON.stringify(result));
        }
      }, (error) => {
          console.log(error);
          this.errors.push(error.body.message);
          this.showSnackbar = true;
          this.snackbarType = 'WARNING';
      });
    }

    newGame() {
      this.errors = [];
      console.log(`create DEFAULT new game for user=${this.user.username}`);
      this.$http.get(`${this.host}/games/createOrJoin`, {
        headers: {
          'Session-Token' : this.user.sessionToken
        }
      }).then((result) => {
        if (result.ok && result.data) {
          if (result.data.createOrJoin === 'CREATE') {
            console.log('CREATED new game');
            this.errors.push('Successfully created a new Simple War');
            this.showSnackbar = true;
            this.snackbarType = 'SUCCESS';
          } else {
            console.log('JOINED game');
            this.errors.push('Successfully joined a Simple War');
            this.showSnackbar = true;
            this.snackbarType = 'SUCCESS';
          }
          this.selectedGame = result.data.game;
          this.selectedGameId = result.data.game.id;
          this.showGameBoard = true;
          this.showGamesList = false;
          this.showMyFriends = false;
          this.showMyProfile = false;
          console.log(`added newly created game with gameId=${result.data.game.id}`);
        } else {
          throw new Error(JSON.stringify(result));
        }
      }, (error) => {
          console.log(error);
          this.errors.push(error.body.message);
          this.showSnackbar = true;
          this.snackbarType = 'WARNING';
      });
    }

    goToGameHandler(game: Game) {
      console.log(`handling goToGame event for gameId=${game.id}`);
      this.selectedGame = game;
      this.selectedGameId = game.id;

      this.showGameBoard = true;
      this.showGamesList = false;
      this.showMyFriends = false;
      this.showMyProfile = false;
    }

    goToMyProfile() {
      console.log('showing my profile');
      this.getPlayerData()
      this.showGameBoard = false;
      this.showGamesList = false;
      this.showMyFriends = false;
      this.showMyProfile = true;
    }

    goToMyFriends() {
      console.log('showing my friends');
      this.showGameBoard = false;
      this.showGamesList = false;
      this.showMyFriends = true;
      this.showMyProfile = false;
    }

    getPlayerData() {
        const sessionToken = this.$cookies.get(this.SESSION_TOKEN_STR);

        this.$http.get(`${this.host}/players/one`, {
            headers: {
                'Session-Token' : sessionToken
            }
        }).then(result => {
            if (result.ok && result.data) {
                this.player = result.data;
                console.log(`successfully retreived player details`);
            } else {
                throw new Error(JSON.stringify(result));
            }
        }, (error) => {
            console.log(error);
            this.$emit('showSnackbar', error.body.message, 'WARNING');
        });
    }

    cancelAdvancedConfig() {
      console.log('cancel advanced config');
      this.showAdvancedConfig = false;
    }

    confirmAdvancedConfig() {
      console.log('confirm advanced config');
      if (!this.advancedGameConfigs.troopDropRate || !this.advancedGameConfigs.wallDropRate|| !this.advancedGameConfigs.defenseDropRate || !this.advancedGameConfigs.maxCardsPerCell) {
        this.errors.push('All Advanced Game Configuration inputs are required');
        this.showSnackbar = true;
      } else {
        this.advancedGameConfigs.dropRates = {
          'TROOP': this.advancedGameConfigs.troopDropRate,
          'WALL': this.advancedGameConfigs.wallDropRate,
          'DEFENSE': this.advancedGameConfigs.defenseDropRate
        }
        this.validateAdvancedGameConfigs();
      }
    }

    validateAdvancedGameConfigs() {
      this.errors = [];
      console.log(`validate advanced game configs: ${JSON.stringify(this.advancedGameConfigs)}`);
      this.$http.post(`${this.host}/games/new/validate`, this.advancedGameConfigs, {
        headers: {
          'Session-Token' : this.user.sessionToken
        }
      }).then((result) => {
        if (result.ok && result.status === 200) {
          console.log(`successfully validated advanced game configs`);
          console.log(result);
          this.showAdvancedConfig = false;
          this.newGame();
        } else {
          throw new Error(JSON.stringify(result));
        }
      }, (error) => {
          console.log(error);
          this.errors.push(error.body.message);
          this.showSnackbar = true;
          this.snackbarType = 'WARNING';
      });

    }

    updateGameBoard(updatedGame: Game) {
      console.log(`[SimpleWarView] got event to update game with gameId=${updatedGame.id}`);
      this.selectedGame = updatedGame;
      this.selectedGameId = updatedGame.id;
    }

    showError(message: string) {
      this.errors = [];
      this.errors.push(message);
      this.showSnackbar = true;
      this.snackbarType = 'WARNING';
    }

    goToGamesList() {
      console.log('go to games list');
      this.showGameBoard = false;
      this.showGamesList = true;
      this.showMyFriends = false;
      this.showMyProfile = false;
      this.getGames();
    }

    nextActiveGame() {
      console.log('next active game');
      const currentGameId = this.selectedGameId;
      let nextGameId = '';

      for (let g of this.games) {
        if (g.currentTurn && g.id !== this.selectedGameId) {
          console.log(`found next active gameId=${g.id}`);
          nextGameId = g.id;
          break;
        }
      }

      if (nextGameId) {
        this.selectedGameId = nextGameId;
        console.log('going to next game, calling updateGameManually');
        (this.$refs.gameBoardComponent as GameBoardComponent).updateGameManually(this.selectedGameId);
      } else {
        console.log('no other active games');
        this.showSnackbar = true;
        this.snackbarType = 'WARNING';
        this.errors.push('You have no other active games at this time');
      }
    }

    refresh() {
      console.log('refresh games');
      this.getGames();
      if (this.showGameBoard) {
        console.log('refreshing game, calling updateGameManually');
        (this.$refs.gameBoardComponent as GameBoardComponent).updateGameManually(this.selectedGameId);
      } else {

      }
      this.errors = [];
      this.errors.push('Reloaded game data!');
      this.showSnackbar = true;
      this.snackbarType = 'SUCCESS';
    }

    resetSnackbarState() {
      console.log('resetting snackbar...');
      this.errors = [];
      this.snackbarType = '';
    }

    doLogin() {
      console.log('showing login form');
      this.form = new LogRegForm();
      this.showLoginForm = true;
      this.showRegisterFrom = false;
    }

    doRegister() {
      console.log('showing register form');
      this.form = new LogRegForm();
      this.showLoginForm = false;
      this.showRegisterFrom = true;
    }

    logout() {
      this.errors = [];
      console.log('logout');
      this.$http.get(`${this.host}/users/logout/${this.user.sessionToken}`).then((result) => {
        if (result.ok) {
          this.$cookies.remove(this.SESSION_TOKEN_STR);
          this.isAuthenticated = false;
          this.user = new User();
          this.form = new LogRegForm();
          this.showGameBoard = false;
          this.showGamesList = false;
          this.showMyFriends = false;
          this.showMyProfile = false;
          this.selectedGameId = '';
          this.completed = [];
          this.games = [];
          this.pending = [];
          this.waiting = [];
          console.log('logout successful');
        } else {
          throw new Error(JSON.stringify(result));
        }
      }, (error) => {
        console.log(error);
        this.errors.push(error);
        this.showSnackbar = true;
        this.snackbarType = 'WARNING';
      })
    }
  }
</script>

<style scoped lang="scss">

  .simple-war-view {
    margin-left: 5%;
    margin-right: 5%;
  }

  .link-text {
    color: white!important;
  }

  .success-icon {
    color: green;
  }

  .warning-icon {
    color: orangered;
  }

</style>
