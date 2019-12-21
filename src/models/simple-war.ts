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
    public might!: number;
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
    public id!: string;
    public requester!: string;
    public requestee!: string;
    public requestDate!: string;
    public responseDate!: string;
    public status!: string;
    public currentTimestamp!: string;
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
    public numTurns!: number;
    public totalCardsPlayed!: number;
    public totalEnergyUsed!: number;
    public totalMightPlaced!: number;
    public totalAdvancementPoints!: number;
}

export class Player {
    public username!: string;
    public lastActiveDate!: string;
    public createdDate!: string;
    public lastActivity!: string;
    public numWins!: number;
    public numGames!: number;
    public canAdd!: boolean;
    public currentTimestamp!: string;
}

export class Profile {
    public username!: string;
    public bio!: string;
    public image!: string;
    public following!: boolean;
}

export class PutCardResponse {
    public game!: Game;
    public status!: string;
    public message!: string;
}

export class StartGameResponse {
    public games!: Game[];
    public newGame!: Game;
}

export class LogRegForm {
    public username!: string;
    public password!: string;
    public passwordConfirmation!: string;
    public email!: string;

    constructor() {
        this.username = '';
        this.password = '';
        this.passwordConfirmation = '';
        this.email = '';
    }
}

export class User {
    public username!: string;
    public sessionToken!: string;
    public isGuest!: boolean;

    constructor() {
        this.username = '';
        this.sessionToken = '';
        this.isGuest = false;
    }
}

const tutortialStates:string[] = [

]
export { tutortialStates } ;