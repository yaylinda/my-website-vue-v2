export class GameConfiguration {
    public dropRates!: {};
    public maxCardsPerCell!: number;
    public pointsToWin!: number;
    public maxEnergy!: number;
    public numRows!: number;
    public numCols!: number;
    public numCardsInHand!: number;
    public numTerritoryRows!: number;
    public minTerritoryRow!: number;
    public energyGrowthRate!: number;
    public startingEnergy!: number;
    public resetEnergyPerTurn!: boolean;
    public isAdvanced!: boolean;

    constructor() {
        this.dropRates = {};
    }
}

export class Card {
    public id!: string;
    public owner!: string;
    public type!: string;
    public might!: number
    public movement!: number;
    public movementDirection!: string;
    public cost!: number;
    public clicked!: boolean;
    public justDrew!: boolean;
    public numTurnsOnBoard!: number;

    constructor(card: Card) {
        this.id = card.id;
        this.owner = card.owner;
        this.type = card.type;
        this.might = card.might;
        this.movement = card.movement;
        this.movementDirection = card.movementDirection;
        this.cost = card.cost;
        this.clicked = card.clicked;
        this.justDrew = card.justDrew;
        this.numTurnsOnBoard = card.numTurnsOnBoard;
    }
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
    currentTimestamp!: string;
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
    public md5Hash!: string;
    public createdDate!: string;
    public lastModifiedDate!: string;
    public player2JoinDate!: string;
    public completedDate!: string;
    public winner!: string;
    public gameStats!: GameStats;
    public endzone!: Card[];
    public opponentEndzone!: Card[];
    public gameConfiguration!: GameConfiguration;
    public currentTimestamp!: string;
    public isAi!: boolean;

    constructor() {
        this.id = '';
        this.username = '';
        this.opponentName = '';
        this.board = [[]];
        this.transitionBoard = [[]];
        this.previousBoard = [[]];
        this.cards = [];
        this.currentTurn = false;
        this.points = -1;
        this.energy = -1;
        this.status = '';
        this.opponentPoints = -1;
        this.md5Hash = '';
        this.createdDate = '';
        this.lastModifiedDate = '';
        this.player2JoinDate = '';
        this.completedDate = '';
        this.winner = '';
        this.gameStats = new GameStats();
        this.endzone = [];
        this.opponentEndzone = [];
        this.gameConfiguration = new GameConfiguration();
        this.currentTimestamp = '';
        this.isAi = false;
    }
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
    createdDate!: string;
    lastActivity!: string;
    numWins!: number;
    numGames!: number;
    canAdd!: boolean;
    currentTimestamp!: string;
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
    isGuest!: boolean;

    constructor() {
        this.username = '';
        this.sessionToken = '';
        this.isGuest = false;
    }
}