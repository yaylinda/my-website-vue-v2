<template>
  <div class="simple-war-view">

    <h1>Simple War</h1>

    <md-toolbar>
      <h6 v-if="!isAuthenticated" class="md-title" style="flex: 1">
        <a @click="doLogin">Login</a> or <a @click="doRegister">Register</a> to play Simple War
      </h6>
      <h6 v-if="isAuthenticated" class="md-title" style="flex: 1">
        Hello {{user.username}} <i class="fa fa-smile-o"></i>
      </h6>
      <md-button v-if="isAuthenticated" @click="logout" class="md-icon-button">
        <md-icon><i class="fa fa-sign-out"></i></md-icon>
        <md-tooltip>Log Out</md-tooltip>
      </md-button>
    </md-toolbar>

    <div v-if="isAuthenticated">

      <game-board-component 
        v-if="showGameBoard" 
        :game="currentGame" 
        @backToGamesList="backToGamesList">
      </game-board-component>

      <div v-else>
        <games-list-component
          @goToGameEvent="goToGameHandler"
          :games="games"
          title="My Games"
          subtitle="Click one to play!"
          emptyTitle="You have no Games :("
          emptySubtitle="Create a new Game or join one from the list!"
          isMyGames="true">
        </games-list-component>

        <games-list-component
          @goToGameEvent="goToGameHandler"
          :games="joinable"
          title="Games to Join"
          subtitle="Click one to join!"
          emptyTitle="No games to join :("
          emptySubtitle="Get your friends to play!"
          isMyGames="false">
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

        <md-field v-if="showRegisterFrom">
          <label for="email">Email</label>
          <md-input type="email" name="email" id="email" v-model="form.email" :disabled="sending" />
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

    <md-snackbar md-position="center" :md-duration="snackbarDuration" :md-active.sync="showSnackbar" md-persistent>
      {{errors}}
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

    SESSION_TOKEN_STR: string = 'Session-Token';
  
    isAuthenticated: boolean = false;

    showLoginForm: boolean = false;
    showRegisterFrom: boolean = false;
    showSnackbar: boolean = false;
    showGameBoard: boolean = false;
    snackbarDuration: number = 4000;

    errors: string[] = [];
    sending: boolean = false;
  
    form: LogRegForm = new LogRegForm();
    user: User = new User();

    games: Game[] = [];
    joinable: Game[] = [];
    currentGame: Game = new Game();

    host: string = "http://localhost:8080";

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
        if (!this.form.email) {
          this.errors.push(ErrorMessages.EMAIL_IS_REQUIRED);
        }
      }

      if (this.errors.length > 0) {
        this.showSnackbar = true;
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
          console.log(`got ${this.games.length} games for ${this.user.username}`);
        } else {
          throw new Error(JSON.stringify(result));
        }
      }, (error) => {
          console.log(error);
          this.errors.push(error.body.message);
          this.showSnackbar = true;
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
          console.log(`got ${this.joinable.length} JOINABLE games for ${this.user.username}`);
        } else {
          throw new Error(JSON.stringify(result));
        }
      }, (error) => {
          console.log(error);
          this.errors.push(error.body.message);
          this.showSnackbar = true;
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
          this.currentGame = result.data;
          console.log(`adding newly created game to games list, gameId=${this.currentGame.id}`);
        } else {
          throw new Error(JSON.stringify(result));
        }
      }, (error) => {
          console.log(error);
          this.errors.push(error.body.message);
          this.showSnackbar = true;
      });
    }

    goToGameHandler(game: Game, isNew: boolean) {
      console.log(`handling goToGame event: gameId=${game ? game.id : 'undefined'}, isNew=${isNew}`);
      if (isNew) {
        this.newGame();
      } else {
        this.currentGame = game;
      }
      this.showGameBoard = true;
    }

    backToGamesList() {
      console.log('back to games list');
      this.showGameBoard = false;
      this.currentGame = new Game();
      this.getGames();
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
          console.log('logout successful');
        } else {
          throw new Error(JSON.stringify(result));
        }
      }, (error) => {
        console.log(error);
        this.errors.push(error);
        this.showSnackbar = true;
      })
    }
  }
</script>

<style scoped lang="scss">

  .simple-war-view {
    margin-left: 5%;
    margin-right: 5%;
  }

  .unauthenticated {
    a :hover {
      cursor: pointer;
    }
  }

  .todo {
    color: gray;
  }

</style>
