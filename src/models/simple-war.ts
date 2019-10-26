export class Card {
    id!: string;
    owner!: string;
    type!: string;
    might!: number
    movement!: number;
    cost!: number;
    clicked!: boolean;
    justDrew!: boolean;
    numTurnsOnBoard!: number;
}

export class Cell {
    public cards!: Card[];
}

export class FriendRequest {
    id!: string;
    requester!: string;
    requestee!: string;
    requestDate!: string;
    responseDate!: string;
    status!: string;
}

export class Game {
    public id!: string;
    public username!: string;
    public opponentName!: string;
    public board!: Cell[][];
    public transitionBoard!: Cell[][];
    public previousBoard!: Cell[][];
    public cards!: Card[];
    public currentTurn!: boolean;
    public points!: number;
    public energy!: number;
    public status!: string;
    public opponentPoints!: number;
    public numRows!: number;
    public numCols!: number;
    public md5Hash!: string;
    public createdDate!: string;
    public lastModifiedDate!: string;
    public player2JoinDate!: string;
    public completedDate!: string;
    public winner!: string;
    public gameStats!: GameStats;
    public endzone!: Card[];
    public opponentEndzone!: Card[];
}

export class GameStats {
    numTurns!: number;
    totalCardsPlayed!: number;
    totalEnergyUsed!: number;
    totalMightPlaced!: number;
    totalAdvancementPoints!: number;
}

export class Player {
    username!: string;
    lastActiveDate!: string;
    lastActivity!: string;
    numWins!: number;
    numGames!: number;
    canAdd!: boolean;
}

export class Profile {
  username!: string;
  bio!: string;
  image!: string;
  following!: boolean;
}

export class PutCardResponse {
    game!: Game;
    status!: string;
    message!: string;
}

export class StartGameResponse {
    games!: Game[];
    newGame!: Game;
}

export class LogRegForm {
    username!: string;
    password!: string;
    passwordConfirmation!: string;
    email!: string;

    constructor() {
        this.username = "";
        this.password = "";
        this.passwordConfirmation = "";
        this.email = "";
    }
}

export class User {
    username!: string;
    sessionToken!: string;

    constructor() {
        this.username = '';
        this.sessionToken = '';
    }
}