<template>
  <div class="simple-war-view">
    <h1>Simple War (BETA)</h1>

    <md-toolbar>
      <div v-if="!isAuthenticated">
        <md-button @click="doLogin">Login</md-button>
        <md-button @click="doRegister">Register</md-button>
        <md-button @click="doGuest">Guest</md-button>
        <md-button @click="doOverview">Overview</md-button>

        <md-dialog :md-active.sync="showLoginForm">
          <md-dialog-title>Login</md-dialog-title>
          <md-dialog-content>
            <md-field>
              <label for="username">Username</label>
              <md-input name="username" id="username" v-model="form.username" :disabled="sending" />
            </md-field>

            <md-field>
              <label for="password">Password</label>
              <md-input
                type="password"
                name="password"
                id="password"
                v-model="form.password"
                :disabled="sending"
              />
            </md-field>
          </md-dialog-content>
          <md-dialog-actions>
            <md-button @click="cancelLoginRegister">Cancel</md-button>
            <md-button class="md-primary" @click="validateAndSubmit">Login</md-button>
          </md-dialog-actions>
        </md-dialog>

        <md-dialog :md-active.sync="showRegisterFrom">
          <md-dialog-title>Register</md-dialog-title>
          <md-dialog-content>
            <md-field>
              <label for="username">Username</label>
              <md-input name="username" id="username" v-model="form.username" :disabled="sending" />
            </md-field>

            <md-field>
              <label for="password">Password</label>
              <md-input
                type="password"
                name="password"
                id="password"
                v-model="form.password"
                :disabled="sending"
              />
            </md-field>

            <md-field>
              <label for="password-confirm">Confirm Password</label>
              <md-input
                type="password"
                name="password-confirm"
                id="password-confirm"
                v-model="form.passwordConfirmation"
                :disabled="sending"
              />
            </md-field>
          </md-dialog-content>
          <md-dialog-actions>
            <md-button @click="cancelLoginRegister">Cancel</md-button>
            <md-button class="md-primary" @click="validateAndSubmit">Register</md-button>
          </md-dialog-actions>
        </md-dialog>

        <md-dialog-confirm
          :md-active.sync="showGuestMessage"
          md-title="Play Simple War as Guest"
          md-content="<p>A Simple War Guest Account will be created.</p><p>As a Guest, you will be able to create and join games (2-Player or AI). However, you will not be able to access Your Profile or add friends.</p>"
          md-cancel-text="Cancel"
          md-confirm-text="Okay"
          @md-cancel="cancelGuestMessage"
          @md-confirm="confirmGuestMessage"
        ></md-dialog-confirm>

        <md-dialog-alert
          :md-active.sync="showOverview"
          md-title="Simple War Overview"
          md-content="<h4>Login, Register, or Guest</h4><p>Logged in users can add other players as friends and invite friends to play advanced Simple War games with custom configurations!</p><p>Create or join a new Simple War Game by pressing the 'plus' icon. Or play against the Simple AI by pressing the 'robot' icon.</p><h4>Instructions</h4><p>Players take turns placing cards from their hand onto the gameboard. Pay attention to the cost, might, and movement of each card type. You cannnot place a card onto the board, if you do not have enough energy to afford the cost. When your cards collide with opponent's cards on the board, the card with the higher might will win the square. Try to get your Troop Cards across the board to score points!</p><p>Play a couple games! You'll get the gist :)</p>"
          md-confirm-text="Okay"
        ></md-dialog-alert>
      </div>

      <div v-if="isAuthenticated" class="md-title" style="flex: 1">{{user.username}}</div>

      <div v-if="isAuthenticated">
        <md-menu md-direction="bottom-end">
          <md-button md-menu-trigger>
            <md-icon>
              <i class="fa fa-bars"></i>
            </md-icon>
          </md-button>
          <md-menu-content>
            <md-menu-item v-if="!showGamesList" @click="goToGamesList">My Games</md-menu-item>
            <md-menu-item v-if="!showMyProfile && !user.isGuest" @click="goToMyProfile">My Profile</md-menu-item>
            <md-menu-item @click="logout">Log Out</md-menu-item>
          </md-menu-content>
        </md-menu>
      </div>
    </md-toolbar>

    <md-speed-dial v-if="isAuthenticated" class="md-bottom-right">

      <md-speed-dial-target>
        <md-icon class="md-morph-initial">star</md-icon>
        <md-icon class="md-morph-final">star</md-icon>
      </md-speed-dial-target>

      <md-speed-dial-content>

        <md-button v-if="showGameBoard" @click="goToGamesList" class="md-icon-button">
          <md-icon>
            <i class="fa fa-arrow-left"></i>
          </md-icon>
          <md-tooltip md-direction="left">Back to Games List</md-tooltip>
        </md-button>

        <md-button v-if="showGameBoard" @click="nextActiveGame" class="md-icon-button">
          <md-icon>
            <i class="fa fa-arrow-right"></i>
          </md-icon>
          <md-tooltip md-direction="left">Next Active Game</md-tooltip>
        </md-button>

        <md-button v-if="showGamesList || showMyProfile" @click="addNew" class="md-icon-button">
          <md-icon>
            <i class="fa fa-plus"></i>
          </md-icon>
          <md-tooltip md-direction="left">{{showGamesList ? 'New 2-Player Game' : 'Add Friend'}}</md-tooltip>
        </md-button>

        <md-button v-if="showGamesList" @click="newAiGame" class="md-icon-button">
          <md-icon>
            <i class="fa fa-android"></i>
          </md-icon>
          <md-tooltip md-direction="left">{{'New AI Game'}}</md-tooltip>
        </md-button>

        <md-button @click="refresh" class="md-icon-button">
          <md-icon>
            <i class="fa fa-refresh"></i>
          </md-icon>
          <md-tooltip md-direction="left">Refresh</md-tooltip>
        </md-button>
      </md-speed-dial-content>

    </md-speed-dial>

    <div v-if="isAuthenticated">
      <game-board-component
        v-if="showGameBoard"
        :game="selectedGame"
        :host="host"
        @updateGameBoard="updateGameBoard"
        @showError="showWarningSnackbar"
        @goToGamesList="goToGamesList"
        ref="gameBoardComponent"
      ></game-board-component>

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
          :isMyGames="true"
          :isJoinable="false"
          :isCompleted="false"
          :showGoToGame="true"
        ></games-list-component>

        <games-list-component
          v-if="waiting.length"
          class="md-layout-item"
          @goToGameEvent="goToGameHandler"
          :games="waiting"
          title="Opponent's Turn"
          subtitle="Tell them to hurry!"
          emptyTitle
          emptySubtitle
          :isMyGames="false"
          :isJoinable="false"
          :isCompleted="false"
          :showGoToGame="true"
        ></games-list-component>

        <games-list-component
          v-if="pending.length"
          class="md-layout-item"
          @goToGameEvent="goToGameHandler"
          :games="pending"
          title="Pending Opponent"
          subtitle="Waiting for someone to join!"
          emptyTitle
          emptySubtitle
          :isMyGames="false"
          :isJoinable="false"
          :isCompleted="false"
          :showGoToGame="true"
        ></games-list-component>

        <games-list-component
          v-if="completed.length"
          class="md-layout-item"
          @goToGameEvent="goToGameHandler"
          :games="completed"
          title="Completed Games"
          subtitle="You've put up some good fights!"
          emptyTitle
          emptySubtitle
          :isMyGames="false"
          :isJoinable="false"
          :isCompleted="true"
          :showGoToGame="false"
        ></games-list-component>

        <div></div>
      </div>

      <div v-if="showMyProfile" class="md-layout md-gutter">
        <players-list-component
          class="md-layout-item"
          :players="[player]"
          title="My Profile"
          subtitle="Information about me!"
          emptyTitle
          emptySubtitle
          :isFriends="false"
        ></players-list-component>

        <players-list-component
          class="md-layout-item"
          :players="friends"
          v-if="friends.length"
          @inviteToGame="inviteToGameHandler"
          title="My Friends"
          subtitle="Start a new game with a friend!"
          emptyTitle="No friends"
          emptySubtitle="Sorry you have no friends :("
          :isFriends="true"
        ></players-list-component>

        <requests-list-component
          class="md-layout-item"
          :requests="incomingRequests"
          v-if="incomingRequests.length"
          :isIncoming="true"
          @respondToFriendRequest="respondFriend"
          title="Incoming Requests"
          subtitle="Friend requests you've received"
          emptyTitle="No incoming requests"
          emptySubtitle="Sorry you have no requests :("
        ></requests-list-component>

        <requests-list-component
          class="md-layout-item"
          :requests="outgoingRequests"
          v-if="outgoingRequests.length"
          :isIncoming="false"
          title="Outgoing Requests"
          subtitle="Friend requests you've sent"
          emptyTitle="No outgoing requests"
          emptySubtitle="Sorry you have no requests :("
        ></requests-list-component>

        <md-dialog :md-active.sync="showAddFriends" @md-closed="friendUsernameSearch = ''">
          <md-dialog-title>Find Friends</md-dialog-title>
          <md-dialog-content>
            <md-field>
              <label>Search for username</label>
              <md-input
                v-model="friendUsernameSearch"
                placeholder="Search for username"
                type="string"
                required
              ></md-input>
            </md-field>

            <div>
              <md-card v-for="(f, index) in friendSearchResults" :key="(f, index)">
                <md-card-header>
                  <md-avatar>
                    <md-icon>
                      <i class="fa fa-user"></i>
                    </md-icon>
                  </md-avatar>
                  <div class="md-title">{{f.username}}</div>
                  <div class="md-subtitle">
                    <span>
                      <i class="fa fa-gamepad pad-right"></i>
                      {{f.numGames}}
                      <md-tooltip md-direction="bottom">Number of Games</md-tooltip>
                    </span>
                    <span>
                      <i class="fa fa-trophy pad-right"></i>
                      {{f.numWins}}
                      <md-tooltip md-direction="bottom">Number of Wins</md-tooltip>
                    </span>
                  </div>
                </md-card-header>
                <md-card-content>
                  <md-chip>
                    <i class="fa fa-calendar-o pad-right"></i>
                    {{getAgoTime(f.lastActiveDate, f.currentTimestamp)}}
                    <md-tooltip>Last Active</md-tooltip>
                  </md-chip>
                  <md-chip>
                    <i class="fa fa-calendar-o pad-right"></i>
                    {{getAgoTime(f.createdDate, f.currentTimestamp)}}
                    <md-tooltip>Created</md-tooltip>
                  </md-chip>
                  <md-chip v-if="f.canAdd" @click="requestFriend(f)">
                    <i class="fa fa-plus pad-right"></i>
                    <md-tooltip>Add</md-tooltip>
                  </md-chip>
                </md-card-content>
              </md-card>
            </div>
          </md-dialog-content>
        </md-dialog>

        <md-dialog :md-active.sync="showAdvancedConfig">
          <md-dialog-title>Advanced Configurations</md-dialog-title>
          <md-dialog-content>
            <md-field>
              <label>Troop Drop Rate</label>
              <md-input v-model="advancedGameConfigs.dropRates.TROOP" type="number" required></md-input>
            </md-field>
            <md-field>
              <label>Defense Drop Rate</label>
              <md-input v-model="advancedGameConfigs.dropRates.DEFENSE" type="number" required></md-input>
            </md-field>
            <md-field>
              <label>Wall Drop Rate</label>
              <md-input v-model="advancedGameConfigs.dropRates.WALL" type="number" required></md-input>
            </md-field>
            <md-field>
              <label>Maximum Cards per Cell</label>
              <md-input v-model="advancedGameConfigs.maxCardsPerCell" type="number" required></md-input>
            </md-field>
            <md-field>
              <label>Points to Win</label>
              <md-input v-model="advancedGameConfigs.pointsToWin" type="number" required></md-input>
            </md-field>
            <md-field>
              <label>Number of Rows</label>
              <md-input v-model="advancedGameConfigs.numRows" type="number" required></md-input>
            </md-field>
            <md-field>
              <label>Number of Columns</label>
              <md-input v-model="advancedGameConfigs.numCols" type="number" required></md-input>
            </md-field>
            <md-field>
              <label>Number of Cards in Hand</label>
              <md-input v-model="advancedGameConfigs.numCardsInHand" type="number" required></md-input>
            </md-field>
            <md-field>
              <label>Number of Territory Rows</label>
              <md-input v-model="advancedGameConfigs.numTerritoryRows" type="number" required></md-input>
            </md-field>
            <md-field>
              <label>Maximum Energy</label>
              <md-input v-model="advancedGameConfigs.maxEnergy" type="number" required></md-input>
            </md-field>
            <md-field>
              <label>Energy Growth Rate</label>
              <md-input v-model="advancedGameConfigs.energyGrowthRate" type="number" required></md-input>
            </md-field>
            <md-field>
              <label>Starting Energy</label>
              <md-input v-model="advancedGameConfigs.startingEnergy" type="number" required></md-input>
            </md-field>
            <md-radio v-model="advancedGameConfigs.resetEnergyPerTurn" :value="true">True</md-radio>
            <md-radio v-model="advancedGameConfigs.resetEnergyPerTurn" :value="false">False</md-radio>
          </md-dialog-content>
          <md-dialog-actions>
            <md-button class="md-primary" @click="cancelAdvancedConfig">Cancel</md-button>
            <md-button class="md-primary" @click="confirmAdvancedConfig">Confirm</md-button>
          </md-dialog-actions>
        </md-dialog>
      </div>
    </div>

    <md-snackbar
      @md-closed="resetSnackbarState"
      md-position="center"
      :md-duration="snackbarDuration"
      :md-active.sync="showSnackbar"
      md-persistent
    >
      <i v-if="snackbarType === 'SUCCESS'" class="fa fa-check-circle success-icon"></i>
      <i v-else class="fa fa-exclamation-circle warning-icon"></i>
      {{snackbarMessage}}
      <md-button class="md-primary" @click="showSnackbar = false">Okay</md-button>
    </md-snackbar>

  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import {
  Game,
  LogRegForm,
  User,
  GameConfiguration,
  Player,
  FriendRequest
} from "@/models/simple-war";
import { ErrorMessages, ToastType } from "@/utils/constants";
import GameBoardComponent from "@/components/GameBoardComponent.vue";
import GamesListComponent from "@/components/GamesListComponent.vue";
import PlayersListComponent from "@/components/PlayersListComponent.vue";
import RequestsListComponent from "@/components/RequestsListComponent.vue";
import ToastActionComponent from "@/components/ToastActionComponent.vue";
import { getAgoTime } from "../utils/utilities";
import * as bcrypt from "bcryptjs";
import * as Stomp from "stompjs";
import SockJS from "sockjs-client";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

Vue.use(Toast);

@Component({
  components: {
    GameBoardComponent,
    GamesListComponent,
    PlayersListComponent,
    RequestsListComponent,
    ToastActionComponent
  }
})
export default class SimpleWarView extends Vue {
  
  public SESSION_TOKEN_STR: string = "Session-Token";

  public showGamesList: boolean = true;
  public showGameBoard: boolean = false;
  public showMyFriends: boolean = false;
  public showMyProfile: boolean = false;
  public showAddFriends: boolean = false;

  public isAuthenticated: boolean = false;
  public showLoginForm: boolean = false;
  public showRegisterFrom: boolean = false;
  public showGuestMessage: boolean = false;
  public showOverview: boolean = false;
  public showSnackbar: boolean = false;
  public snackbarDuration: number = 4000;
  public snackbarType: string = "";
  public snackbarMessage: string = "";

  public showAdvancedConfig: boolean = false;
  public advancedGameConfigs: GameConfiguration = new GameConfiguration();

  public sending: boolean = false;

  public form: LogRegForm = new LogRegForm();
  public user: User = new User();

  public games: Game[] = [];
  public waiting: Game[] = [];
  public pending: Game[] = [];
  public completed: Game[] = [];

  public selectedGame: Game = new Game();
  public selectedGameId: string = "";

  public playerToInvite: string = "";
  public isInviteAdvanced: boolean = false;

  public player: Player = new Player();
  public friends: Player[] = [];
  public incomingRequests: FriendRequest[] = [];
  public outgoingRequests: FriendRequest[] = [];

  public friendUsernameSearch: string = "";
  public friendSearchResults: Player[] = [];

  private stompClient!: Stomp.Client;
  private opponentPutCardSubscription!: Stomp.Subscription;
  private opponentEndTurnSubscription!: Stomp.Subscription;
  private friendRequestReceivedSubscription!: Stomp.Subscription;
  private friendRequestResponseSubscription!: Stomp.Subscription;
  private invitedToGameSubscription!: Stomp.Subscription;

  public host: string = process.env.VUE_APP_SIMPLE_WAR_HOST!;

  constructor() {
    super();
    console.log("SimpleWarView constructor");
    console.log(`Running in ${process.env.NODE_ENV}`);
    console.log(`SimpleWar host: ${this.host}`);
  }

  public mounted() {
    console.log("SimpleWarView mounted");

    // console.log('mounted SimpleWar');
    const sessionToken = this.$cookies.get(this.SESSION_TOKEN_STR);
    // console.log('sessionToken=', sessionToken);

    if (sessionToken) {
      // console.log('sessionToken exists, validating token from server');
      this.sending = true;
      this.$http.get(`${this.host}/users/${sessionToken}`, sessionToken).then(
        result => {
          if (result.ok && result.data) {
            this.$cookies.set(this.SESSION_TOKEN_STR, result.data.sessionToken);
            this.user = result.data;
            this.isAuthenticated = true;
            // console.log(
            // `successfully validated user sessionToken: ${this.user.username}`,
            // );
            this.getGames();
            this.getDefaultConfigs();
            this.initializeWebSocketConnection();
          } else {
            this.isAuthenticated = false;
            throw new Error(JSON.stringify(result));
          }
          this.sending = false;
        },
        error => {
          // console.log(error);
          this.showWarningSnackbar(error.body.message);
          this.isAuthenticated = false;
          this.sending = false;
        }
      );
    } else {
      // console.log('sessionToken does not exist');
      this.isAuthenticated = false;
    }
  }

  public showSuccessSnackbar(message: string) {
    this.snackbarMessage = message;
    this.snackbarType = "SUCCESS";
    this.showSnackbar = true;
  }

  public showWarningSnackbar(message: string) {
    this.snackbarMessage = message;
    this.snackbarType = "WARNING";
    this.showSnackbar = true;
  }

  public getGames() {
    console.log("getGames");

    this.games = [];
    this.waiting = [];
    this.pending = [];
    this.completed = [];
    // console.log('getting games for user:', this.user.username);
    this.$http
      .get(`${this.host}/games`, {
        headers: {
          "Session-Token": this.user.sessionToken
        }
      })
      .then(
        result => {
          if (result.ok && result.data) {
            // console.log(
            // `got ${result.data.length} games for ${this.user.username}`,
            // );
            result.data.forEach((g: Game) => {
              if (g.status === "COMPLETED") {
                this.completed.push(g);
              } else if (g.opponentName === "<TBD>" && !g.currentTurn) {
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
        },
        error => {
          // console.log(error);
          this.showWarningSnackbar(error.body.message);
        }
      );
  }

  public getDefaultConfigs() {
    console.log("getDefaultConfigs");

    this.$http.get(`${this.host}/games/default-configs`).then(
      result => {
        if (result.ok && result.data) {
          this.advancedGameConfigs = result.data;
          this.advancedGameConfigs.isAdvanced = true;
        } else {
          throw new Error(JSON.stringify(result));
        }
      },
      error => {
        this.showWarningSnackbar(error.body.message);
      }
    );
  }

  public initializeWebSocketConnection() {
    console.log("initializeWebSocketConnection");

    let ws: WebSocket = new SockJS(`${this.host}/socket/`);
    this.stompClient = Stomp.over(ws);

    this.stompClient.connect({}, () => {
      this.opponentPutCardSubscription = this.stompClient.subscribe(
        `/topic/opponentPutCard/${this.user.username}`,
        (message: Stomp.Message) => {
          console.log("got opponentPutCard message");
          if (message.body) {
            if (this.showGameBoard) {
              (this.$refs
                .gameBoardComponent as GameBoardComponent).updateGameManually(
                this.selectedGameId
              );
            }
          }
        }
      );

      this.opponentEndTurnSubscription = this.stompClient.subscribe(
        `/topic/opponentEndedTurn/${this.user.username}`,
        (message: Stomp.Message) => {
          if (message.body) {

            let msgObj = JSON.parse(message.body);

            if (this.showGamesList) {
              this.getGames();
            } else if (this.showGameBoard) {
              (this.$refs
                .gameBoardComponent as GameBoardComponent).updateGameManually(
                this.selectedGameId
              );
            }

            if (!this.showGameBoard && this.selectedGameId !== msgObj.gameId) {
              // TODO - action to go to game
              this.$toast.info(`It is now your turn in Simple War against ${msgObj.username}!`);
            }
          }
        }
      );

      this.friendRequestReceivedSubscription = this.stompClient.subscribe(
        `/topic/friendRequestReceived/${this.user.username}`,
        (message: Stomp.Message) => {
          if (message.body) {

            let msgObj = JSON.parse(message.body);

            if (this.showMyProfile) {
              this.getRequests();
            }

            // TODO - actions to accept/decline
            this.$toast.info(`${msgObj.username} sent you a friend request!`);

          }
        }
      );

      this.friendRequestResponseSubscription = this.stompClient.subscribe(
        `/topic/friendRequestResponse/${this.user.username}`,
        (message: Stomp.Message) => {
          console.log("got friendRequestResponse message");
          if (message.body) {
            
            let msgObj = JSON.parse(message.body);

            if (this.showMyProfile) {
              this.getFriends();
              this.getRequests();
            }

            this.$toast.info(`${msgObj.username} ${msgObj.response} your friend request!`);
          }
        }
      );

      this.invitedToGameSubscription = this.stompClient.subscribe(
        `/topic/invitedToGame/${this.user.username}`,
        (message: Stomp.Message) => {
          console.log("got invitedToGame message");
          if (message.body) {

            let msgObj = JSON.parse(message.body);

            if (this.showGamesList) {
              this.getGames();
            }

            // TODO - add action to go to game
            this.$toast.info(`${msgObj.username} invited you to a Simple War!`);
          }
        }
      );
    });
  }

  public getGameById() {
    // console.log(`getting data for gameId=${this.selectedGameId}`);
    this.$http
      .get(`${this.host}/games/${this.selectedGameId}`, {
        headers: {
          "Session-Token": this.user.sessionToken
        }
      })
      .then(
        result => {
          if (result.ok && result.data) {
            this.selectedGame = result.data;
            this.selectedGameId = result.data.id;
            // console.log(`updated data for gameId=${this.selectedGameId}`);
          } else {
            throw new Error(JSON.stringify(result));
          }
        },
        error => {
          // console.log(error);
          this.showWarningSnackbar(error.body.message);
        }
      );
  }

  public addNew() {
    // console.log('plus button clicked');

    if (this.showGamesList) {
      this.newGame();
    } else if (this.showMyProfile) {
      this.addFriend();
    }
  }

  public newGame() {
    // console.log(`create DEFAULT new game for user=${this.user.username}`);
    this.$http
      .get(`${this.host}/games/createOrJoin`, {
        headers: {
          "Session-Token": this.user.sessionToken
        }
      })
      .then(
        result => {
          if (result.ok && result.data) {
            if (result.data.createOrJoin === "CREATE") {
              // console.log('CREATED new game');
              this.showSuccessSnackbar("Successfully created a Simple War");
            } else {
              // console.log('JOINED game');
              this.showSuccessSnackbar("Successfully joined a Simple War");
            }
            this.selectedGame = result.data.game;
            this.selectedGameId = result.data.game.id;
            this.showGameBoard = true;
            this.showGamesList = false;
            this.showMyFriends = false;
            this.showMyProfile = false;
            // console.log(
            // `added newly created game with gameId=${result.data.game.id}`,
            // );
          } else {
            throw new Error(JSON.stringify(result));
          }
        },
        error => {
          // console.log(error);
          this.showWarningSnackbar(error.body.message);
        }
      );
  }

  public newAiGame() {
    // console.log(`create new game AI for user=${this.user.username}`);
    this.$http
      .post(
        `${this.host}/games/new?ai=true`,
        {},
        {
          headers: {
            "Session-Token": this.user.sessionToken
          }
        }
      )
      .then(
        result => {
          if (result.ok && result.data) {
            this.showSuccessSnackbar(
              "Successfully created a Simple War against AI"
            );
            this.selectedGame = result.data;
            this.selectedGameId = result.data.id;
            this.showGameBoard = true;
            this.showGamesList = false;
            this.showMyFriends = false;
            this.showMyProfile = false;
            // console.log(
            // `added newly created game with gameId=${result.data.id}`,
            // );
          } else {
            throw new Error(JSON.stringify(result));
          }
        },
        error => {
          // console.log(error);
          this.showWarningSnackbar(error.body.message);
        }
      );
  }

  public addFriend() {
    // console.log('show add friends dialog');
    this.showAddFriends = true;
  }

  public requestFriend(friend: Player) {
    // console.log(`requesting ${friend.username} to be friends`);

    this.$http
      .post(
        `${this.host}/players/friends/requests`,
        { requestee: friend.username },
        {
          headers: {
            "Session-Token": this.user.sessionToken
          }
        }
      )
      .then(
        result => {
          if (result.ok && result.status === 200) {
            // console.log('successfully sent friend request');
            this.showSuccessSnackbar(
              `Sent friend request to ${friend.username}`
            );
            this.getPlayerData();
            this.getFriends();
            this.getRequests();
          } else {
            throw new Error(JSON.stringify(result));
          }
        },
        error => {
          // console.log(error);
          this.showWarningSnackbar(error.body.message);
          this.getPlayerData();
          this.getFriends();
          this.getRequests();
        }
      );

    this.showAddFriends = false;
  }

  public respondFriend(requestId: string, isAccept: boolean) {
    // console.log(`responding to requestId=${requestId}, isAccept=${isAccept}`);

    this.$http
      .put(
        `${this.host}/players/friends/responses`,
        { requestId, isAccept },
        {
          headers: {
            "Session-Token": this.user.sessionToken
          }
        }
      )
      .then(
        result => {
          if (result.ok && result.status === 200) {
            // console.log('successfully responded to');
            this.showSuccessSnackbar(`Responded to friend request`);
            this.getPlayerData();
            this.getFriends();
            this.getRequests();
          } else {
            throw new Error(JSON.stringify(result));
          }
        },
        error => {
          // console.log(error);
          this.showWarningSnackbar(error.body.message);
          this.getPlayerData();
          this.getFriends();
          this.getRequests();
        }
      );
  }

  @Watch("friendUsernameSearch")
  public friendUsernameSearchChange(newValue: string, oldValue: string) {
    if (newValue) {
      // console.log(`search for users with username containing; '${newValue}'`);
      this.$http
        .get(`${this.host}/players/search?query=${newValue}`, {
          headers: {
            "Session-Token": this.user.sessionToken
          }
        })
        .then(
          result => {
            if (result.ok && result.data) {
              this.friendSearchResults = result.data;
              // console.log(
              // `found ${this.friendSearchResults.length} friends from search`,
              // );
            } else {
              throw new Error(JSON.stringify(result));
            }
          },
          error => {
            // console.log(error);
            this.showWarningSnackbar(error.body.message);
          }
        );
    } else {
      this.friendSearchResults = [];
    }
  }

  public goToGameHandler(game: Game) {
    // console.log(`handling goToGame event for gameId=${game.id}`);
    this.selectedGame = game;
    this.selectedGameId = game.id;

    this.showGameBoard = true;
    this.showGamesList = false;
    this.showMyFriends = false;
    this.showMyProfile = false;
  }

  public goToMyProfile() {
    // console.log('showing my profile');
    this.getPlayerData();
    this.getFriends();
    this.getRequests();
    this.showGameBoard = false;
    this.showGamesList = false;
    this.showMyFriends = false;
    this.showMyProfile = true;
  }

  public getPlayerData() {
    // console.log('getting player profile...');

    this.$http
      .get(`${this.host}/players/one`, {
        headers: {
          "Session-Token": this.user.sessionToken
        }
      })
      .then(
        result => {
          if (result.ok && result.data) {
            this.player = result.data;
            // console.log(`successfully retreived player details`);
          } else {
            throw new Error(JSON.stringify(result));
          }
        },
        error => {
          // console.log(error);
          this.showWarningSnackbar(error.body.message);
        }
      );
  }

  public getFriends() {
    // console.log('getting friends...');

    this.$http
      .get(`${this.host}/players/friends`, {
        headers: {
          "Session-Token": this.user.sessionToken
        }
      })
      .then(
        result => {
          if (result.ok && result.data) {
            this.friends = result.data;
            // console.log(
            // `successfully retreived ${this.friends.length} friends`,
            // );
          } else {
            throw new Error(JSON.stringify(result));
          }
        },
        error => {
          // console.log(error);
          this.showWarningSnackbar(error.body.message);
        }
      );
  }

  public getRequests() {
    // console.log('getting requests...');

    this.incomingRequests = [];
    this.outgoingRequests = [];

    this.$http
      .get(`${this.host}/players/friends/requests`, {
        headers: {
          "Session-Token": this.user.sessionToken
        }
      })
      .then(
        result => {
          if (result.ok && result.data) {
            result.data.forEach((r: FriendRequest) => {
              if (r.requester === this.user.username) {
                this.outgoingRequests.push(r);
              } else {
                this.incomingRequests.push(r);
              }
            });
            // console.log(
            // `successfully retreived ${this.outgoingRequests.length} outgoingRequests`,
            // );
            // console.log(
            // `successfully retreived ${this.incomingRequests.length} incomingRequests`,
            // );
          } else {
            throw new Error(JSON.stringify(result));
          }
        },
        error => {
          // console.log(error);
          this.showWarningSnackbar(error.body.message);
        }
      );
  }

  public inviteToGameHandler(username: string, isAdvanced: boolean) {
    this.playerToInvite = username;
    this.isInviteAdvanced = isAdvanced;

    if (isAdvanced) {
      this.showAdvancedConfig = true;
    } else {
      this.newInvitedGame();
    }
  }

  public cancelAdvancedConfig() {
    // console.log('cancel advanced config');
    this.showAdvancedConfig = false;
  }

  public confirmAdvancedConfig() {
    // console.log('confirm advanced config');
    this.validateAdvancedGameConfigs();
  }

  public validateAdvancedGameConfigs() {
    // console.log(
    // `validate advanced game configs: ${JSON.stringify(
    // this.advancedGameConfigs,
    // )}`,
    // );
    this.$http
      .post(`${this.host}/games/new/validate`, this.advancedGameConfigs, {
        headers: {
          "Session-Token": this.user.sessionToken
        }
      })
      .then(
        result => {
          if (result.ok && result.status === 200) {
            // console.log(`successfully validated advanced game configs`);
            // console.log(result);
            this.showAdvancedConfig = false;
            this.newInvitedGame();
          } else {
            throw new Error(JSON.stringify(result));
          }
        },
        error => {
          // console.log(error);
          this.showWarningSnackbar(error.body.message);
        }
      );
  }

  public newInvitedGame() {
    // console.log(`inviting ${this.playerToInvite} to game, isAdvanced`);
    this.$http
      .post(
        `${this.host}/games/invite`,
        {
          player2: this.playerToInvite,
          isAdvanced: this.isInviteAdvanced,
          gameConfiguration: this.advancedGameConfigs
        },
        {
          headers: {
            "Session-Token": this.user.sessionToken
          }
        }
      )
      .then(
        result => {
          if (result.ok && result.data) {
            this.selectedGame = result.data;
            this.selectedGameId = result.data.id;
            this.showGameBoard = true;
            this.showMyProfile = false;
            this.showSuccessSnackbar(
              `Invited ${this.selectedGame.opponentName} to a Simple War!`
            );
          } else {
            throw new Error(JSON.stringify(result));
          }
        },
        error => {
          // console.log(error);
          this.showWarningSnackbar(error.body.message);
        }
      );
    this.playerToInvite = "";
    this.isInviteAdvanced = false;
  }

  public updateGameBoard(updatedGame: Game) {
    // console.log(
    // `[SimpleWarView] got event to update game with gameId=${updatedGame.id}`,
    // );
    this.selectedGame = updatedGame;
    this.selectedGameId = updatedGame.id;
  }

  public goToGamesList() {
    // console.log('go to games list');
    this.getGames();
    this.showGameBoard = false;
    this.showGamesList = true;
    this.showMyFriends = false;
    this.showMyProfile = false;
  }

  public nextActiveGame() {
    // console.log('next active game');
    this.getGames();

    // console.log('testing if async got here...');
    const currentGameId = this.selectedGameId;
    let nextGameId = "";

    for (const g of this.games) {
      if (g.currentTurn && g.id !== this.selectedGameId) {
        // console.log(`found next active gameId=${g.id}`);
        nextGameId = g.id;
        break;
      }
    }

    if (nextGameId) {
      this.selectedGameId = nextGameId;
      // console.log('going to next game, calling updateGameManually');
      (this.$refs.gameBoardComponent as GameBoardComponent).updateGameManually(
        this.selectedGameId
      );
    } else {
      // console.log('no other active games');
      this.showWarningSnackbar("You have no other active games at this time");
    }
  }

  public refresh() {
    // console.log('refresh data');
    if (this.showGameBoard) {
      this.getGames();
      // console.log('refreshing game, calling updateGameManually');
      (this.$refs.gameBoardComponent as GameBoardComponent).updateGameManually(
        this.selectedGameId
      );
    } else if (this.showGamesList) {
      this.getGames();
    } else if (this.showMyProfile) {
      this.getPlayerData();
      this.getFriends();
      this.getRequests();
    }
    this.showSuccessSnackbar("Reloaded data!");
  }

  public resetSnackbarState() {
    // console.log('resetting snackbar...');
    this.snackbarMessage = "";
    this.snackbarType = "";
  }

  public doLogin() {
    // console.log('showing login form');
    this.form = new LogRegForm();
    this.showLoginForm = true;
    this.showRegisterFrom = false;
  }

  public doRegister() {
    // console.log('showing register form');
    this.form = new LogRegForm();
    this.showLoginForm = false;
    this.showRegisterFrom = true;
  }

  public cancelLoginRegister() {
    this.form = new LogRegForm();
    this.showLoginForm = false;
    this.showRegisterFrom = false;
  }

  public doGuest() {
    // console.log('doing guest...');
    this.showLoginForm = false;
    this.showRegisterFrom = false;
    this.showOverview = false;
    this.showGuestMessage = true;
  }

  public cancelGuestMessage() {
    this.showGuestMessage = false;
    // console.log('cancelGuestMessage');
  }

  public confirmGuestMessage() {
    this.showGuestMessage = false;
    // console.log('confirmGuestMessage');
    this.$http.post(`${this.host}/users/register?isGuest=true`, {}).then(
      result => {
        if (result.ok && result.data) {
          this.user = result.data;
          this.$cookies.set(this.SESSION_TOKEN_STR, result.data.sessionToken);
          this.isAuthenticated = true;
          this.showLoginForm = false;
          this.showRegisterFrom = false;
          // console.log('successfully created guest user:', this.user);
          this.getGames();
          this.showSuccessSnackbar(
            `Successfully logged in as ${this.user.username}`
          );
          this.getDefaultConfigs();
          this.initializeWebSocketConnection();
        } else {
          throw new Error(JSON.stringify(result));
        }
      },
      error => {
        // console.log(error);
        this.showWarningSnackbar(error.body.message);
      }
    );
  }

  public doOverview() {
    // console.log('doing overview...');
    this.showLoginForm = false;
    this.showRegisterFrom = false;
    this.showGuestMessage = false;
    this.showOverview = true;
  }

  public validateAndSubmit() {
    const validationMessages: string[] = [];

    if (!this.form.username) {
      validationMessages.push(ErrorMessages.USERNAME_IS_REQUIRED);
    }

    if (!this.form.password) {
      validationMessages.push(ErrorMessages.PASSWORD_IS_REQUIRED);
    }

    if (this.showRegisterFrom) {
      if (this.form.password !== this.form.passwordConfirmation) {
        validationMessages.push(ErrorMessages.PASSWORDS_DO_NOT_MATCH);
      }
    }

    this.form.email = "test@test.com";

    if (validationMessages.length > 0) {
      this.showWarningSnackbar(validationMessages.join(", "));
    } else {
      const path = this.showLoginForm ? "login" : "register";
      // console.log(`posting to /${path}`);

      bcrypt.hash(this.form.password, 10, (err: any, hash: string) => {
        let passwordToUse = this.form.password;

        if (this.showRegisterFrom) {
          passwordToUse = hash;
        }

        this.$http
          .post(`${this.host}/users/${path}`, {
            username: this.form.username,
            password: passwordToUse,
            passwordConfirmation: passwordToUse,
            email: this.form.email
          })
          .then(
            result => {
              if (result.ok && result.data) {
                this.user = result.data;
                this.$cookies.set(
                  this.SESSION_TOKEN_STR,
                  result.data.sessionToken
                );
                this.isAuthenticated = true;
                this.showLoginForm = false;
                this.showRegisterFrom = false;
                // console.log('successfully authenticated user:', this.user);
                this.getGames();
                this.showSuccessSnackbar(
                  `Successfully logged in as ${this.user.username}`
                );
                this.getDefaultConfigs();
                this.initializeWebSocketConnection();
              } else {
                throw new Error(JSON.stringify(result));
              }
            },
            error => {
              // console.log(error);
              this.showWarningSnackbar(error.body.message);
            }
          );
      });
    }
  }

  public logout() {
    // console.log('logout');
    this.$http.get(`${this.host}/users/logout/${this.user.sessionToken}`).then(
      result => {
        if (result.ok) {
          this.$cookies.remove(this.SESSION_TOKEN_STR);
          this.isAuthenticated = false;
          this.user = new User();
          this.form = new LogRegForm();
          this.showGameBoard = false;
          this.showGamesList = true;
          this.showMyFriends = false;
          this.showMyProfile = false;
          this.selectedGameId = "";
          this.completed = [];
          this.games = [];
          this.pending = [];
          this.waiting = [];
          this.disconnectAndUnsubscribeWebSockets();
          // console.log('logout successful');
        } else {
          throw new Error(JSON.stringify(result));
        }
      },
      error => {
        // console.log(error);
        this.showWarningSnackbar(error);
      }
    );
  }

  public destroyed() {
    console.log("SimpleWarView destroyed");
    this.disconnectAndUnsubscribeWebSockets();
  }

  public disconnectAndUnsubscribeWebSockets() {
    console.log('disconnectAndUnsubscribeWebSockets');

    if (this.stompClient) {
      this.stompClient.disconnect(() => {
        if (this.opponentPutCardSubscription) {
          this.opponentPutCardSubscription.unsubscribe();
        }

        if (this.opponentEndTurnSubscription) {
          this.opponentEndTurnSubscription.unsubscribe();
        }

        if (this.friendRequestReceivedSubscription) {
          this.friendRequestReceivedSubscription.unsubscribe();
        }

        if (this.friendRequestResponseSubscription) {
          this.friendRequestResponseSubscription.unsubscribe();
        }

        if (this.invitedToGameSubscription) {
          this.invitedToGameSubscription.unsubscribe();
        }
      });
    }
  }

  public getAgoTime(dateStr: string, currentStr: string) {
    return getAgoTime(dateStr, currentStr);
  }
}
</script>

<style scoped lang="scss">
.simple-war-view {
  margin-left: 5%;
  margin-right: 5%;
}

.md-speed-dial {
  z-index: 999;
  position: fixed!important;
  bottom: 50px!important;
  right: 5%!important;
}

.link-text {
  color: white !important;
}

.success-icon {
  color: green;
}

.warning-icon {
  color: orangered;
}
</style>
