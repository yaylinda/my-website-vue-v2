<template>
  <div class="simple-war-view">

    <h1>Simple War</h1>

    <md-toolbar class="md-primary">
      <h6 v-if="!isAuthenticated" class="md-title" style="flex: 1">
        <a class="link-text" @click="doLogin">Login</a> or <a class="link-text" @click="doRegister">Register</a> to play Simple War
      </h6>

      <h6 v-if="isAuthenticated" class="md-title" style="flex: 1">
        Hello {{user.username}} <i class="fa fa-smile-o"></i>
      </h6>

      <md-button v-if="isAuthenticated && showGameBoard" @click="backToGamesList" class="md-icon-button">
        <md-icon><i class="fa fa-arrow-left"></i></md-icon>
        <md-tooltip>Back to Games List</md-tooltip>
      </md-button>

      <md-button v-if="isAuthenticated" @click="refresh" class="md-icon-button">
        <md-icon><i class="fa fa-refresh"></i></md-icon>
        <md-tooltip>Refresh Games</md-tooltip>
      </md-button>

      <md-menu v-if="isAuthenticated" md-direction="bottom-end">
        <md-button md-menu-trigger>
          <md-icon><i class="fa fa-bars"></i></md-icon>
        </md-button>
        <md-menu-content>
          <md-menu-item @click="logout">Log Out</md-menu-item>
        </md-menu-content>
      </md-menu>
    </md-toolbar>

    <div v-if="isAuthenticated">

      <game-board-component
        v-if="showGameBoard"
        :game="gamesMap.get(selectedGameId)"
        :host="host"
        @updateGameBoard="updateGameBoard"
        @showError="showError"
        @backToGamesList="backToGamesList">
      </game-board-component>

      <div v-else class="md-layout md-gutter">
        <games-list-component
          class="md-layout-item"
          @goToGameEvent="goToGameHandler"
          :games="games"
          title="My Games"
          subtitle="Click one to play!"
          emptyTitle="You have no Games :("
          emptySubtitle="Create a new Game or join one from the list!"
          :isMyGames=true>
        </games-list-component>

        <games-list-component
          class="md-layout-item"
          @goToGameEvent="goToGameHandler"
          :games="joinable"
          title="Games to Join"
          subtitle="Click one to join!"
          emptyTitle="No games to join :("
          emptySubtitle="Get your friends to play!"
          :isMyGames=false>
        </games-list-component>
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
  import {Game, LogRegForm, User} from '@/models/simple-war';
  import { ErrorMessages } from '@/utils/constants';
  import GameBoardComponent from '@/components/GameBoardComponent.vue';
  import GamesListComponent from '@/components/GamesListComponent.vue';

  @Component({
    components: {
      GameBoardComponent, GamesListComponent
    },
  })
  export default class SimpleWarView extends Vue {

    public SESSION_TOKEN_STR: string = 'Session-Token';
  
    public isAuthenticated: boolean = false;

    public showLoginForm: boolean = false;
    public showRegisterFrom: boolean = false;
    public showSnackbar: boolean = false;
    public showGameBoard: boolean = false;
    public snackbarDuration: number = 4000;
    public snackbarType: string = '';

    public errors: string[] = [];
    public sending: boolean = false;
  
    public form: LogRegForm = new LogRegForm();
    public user: User = new User();

    public games: Game[] = [];
    public joinable: Game[] = [];

    public gamesMap: Map<string, Game> = new Map<string, Game>();
    public selectedGameId: string = '';

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
            this.getJoinable();
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
            this.getJoinable();
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
      console.log('getting games for user:', this.user.username);
      this.$http.get(`${this.host}/games`, {
        headers: {
          'Session-Token' : this.user.sessionToken
        }
      }).then((result) => {
        if (result.ok && result.data) {
          this.games = result.data;
          console.log(`got ${result.data.length} games for ${this.user.username}`);
          result.data.forEach((g: Game) => {
            this.gamesMap.set(g.id, g);
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

    getJoinable() {
      this.errors = [];
      console.log('getting JOINABLE games for user:', this.user.username);
      this.$http.get(`${this.host}/games/joinable`, {
        headers: {
          'Session-Token' : this.user.sessionToken
        }
      }).then((result) => {
        if (result.ok && result.data) {
          this.joinable = result.data;
          console.log(`got ${result.data.length} joinable games for ${this.user.username}`);
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
          this.gamesMap.set(this.selectedGameId, result.data);
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
      console.log(`create new game for user=${this.user.username}`);
      this.$http.post(`${this.host}/games/new`, {}, {
        headers: {
          'Session-Token' : this.user.sessionToken
        }
      }).then((result) => {
        if (result.ok && result.data) {
          this.games.push(result.data);
          this.gamesMap.set(result.data.id, result.data);
          this.selectedGameId = result.data.id;
          console.log(`added newly created game with gameId=${result.data.id}`);
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

    joinGame(gameId: string) {
      this.errors = [];
      console.log(`user=${this.user.username} joining gameId=${gameId}`);
      this.$http.get(`${this.host}/games/join/${gameId}`, {
        headers: {
          'Session-Token' : this.user.sessionToken
        }
      }).then((result) => {
        if (result.ok && result.data) {
          console.log(`successfully joined game with gameId=${result.data.id}`);
          this.games.push(result.data);
          this.gamesMap.set(result.data.id, result.data);
          this.selectedGameId = result.data.id;
          console.log(`added newly created game with gameId=${result.data.id}`);
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

    goToGameHandler(game: Game, gameIndex: number, isNew: boolean, isJoining: boolean) {
      console.log(`handling goToGame event: gameId=${game ? game.id : 'undefined'}, gameIndex=${gameIndex}, isNew=${isNew}, isJoining=${isJoining}`);
      if (isNew) {
        this.newGame();
      } else if (isJoining) {
        this.joinGame(game.id);
      } else {
        this.selectedGameId = game.id;
      }
      this.showGameBoard = true;
    }

    updateGameBoard(updatedGame: Game) {
      console.log(`[SimpleWarView] got event to update game with gameId=${updatedGame.id}`);
      this.gamesMap.set(updatedGame.id, updatedGame);
    }

    showError(message: string) {
      this.errors = [];
      this.errors.push(message);
      this.showSnackbar = true;
      this.snackbarType = 'WARNING';
    }

    backToGamesList() {
      console.log('back to games list');
      this.showGameBoard = false;
      this.getGames();
      this.getJoinable();
    }

    refresh() {
      console.log('refresh games');
      if (this.showGameBoard) {
        this.getGameById();
      } else {
        this.getGames();
        this.getJoinable();
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
          this.selectedGameId = '';
          this.games = [];
          this.joinable = [];
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

  .link-text :hover {
    cursor: pointer!important;
  }

  .todo {
    color: gray;
  }

  .success-icon {
    color: green;
  }

  .warning-icon {
    color: orangered;
  }

</style>
