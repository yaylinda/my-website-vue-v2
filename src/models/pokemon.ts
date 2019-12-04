export class Pokemon {
    public stats!: string[];
    public image_src!: string;
    public id!: string;
    public pokemon_url!: string;
    public name!: string;
    public abilities!: string[];
    public types!: string[];
    public moves!: Move[];

    constructor(json: any) {
        this.stats = json['stats'];
        this.image_src = json['image_src'];
        this.id = json['id'];
        this.pokemon_url = json['pokemon_url'];
        this.name = json['name'];
        this.abilities = json['abilities'];
        this.types = json['types'];
        this.moves = json['moves'].map((m: any) => new Move(m));
    }
}

export class Move {
    public name!: string;
    public type!: string;
    public category!: string;

    constructor(json: any) {
        this.name = json['name'];
        this.type = json['type'];
        this.category = json['category'];
    }
}

export class SelectedPokemon {
    public name!: string;
    public types!: string[];
    public image_src!: string;
    public moves!: Move[];

    constructor() {
        this.name = '';
        this.types = [];
        this.image_src = '';
        this.moves = [];
    }
}

export class TypeEvaluationResults {
    public type!: string;
    public pokemonWeakToType!: string[]; // pokemon img urls
    public pokemonWithMovesEffectiveAgainstType!: Map<string, string[]>; // pokemon img url -> moves

    constructor() {
        this.type = '';
        this.pokemonWeakToType = [];
        this.pokemonWithMovesEffectiveAgainstType = new Map<string, string[]>();
    }
}