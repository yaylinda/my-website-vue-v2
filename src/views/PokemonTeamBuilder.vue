<template>
  <div class="pokemon-team-builder">
    <h3 class="md-title">Sword and Shield Team Builder</h3>

    <div class="md-layout md-gutter md-alignment-top-center">
      <div
        v-for="i of 6"
        :key="i"
        class="pokemon-card md-layout-item md-xsmall-size-50 md-small-size-25 md-medium-size-25 md-large-size-15 md-xlarge-size-15"
      >
        <md-card-header>
          <div class="md-title">
            <md-autocomplete
              v-model="selectedPokemonNames[i-1]"
              :md-options="pokemonNames"
              :md-open-on-focus="false"
              md-dense
            >
              <label>Pokemon #{{i}}</label>
            </md-autocomplete>
          </div>
          <div v-if="pokemonMap.get(selectedPokemonNames[i-1])" class="md-subhead img-container">
            <img
              class="pokemon-img"
              :src="'https://www.serebii.net' + pokemonMap.get(selectedPokemonNames[i-1]).image_src"
            />
            <div class="type-img-container">
              <img
                class="type-img"
                v-for="type in pokemonMap.get(selectedPokemonNames[i-1]).types"
                :key="type"
                :src="`https://www.serebii.net/pokedex-bw/type/${type}.gif`"
              />
            </div>
          </div>
        </md-card-header>
        <md-card-content class="md-layout md-gutter">
          <div v-for="j of 4" :key="j" class="md-layout-item md-size-50">
            <md-autocomplete
              v-if="pokemonMap.get(selectedPokemonNames[i-1])"
              v-model="selectedPokemonMoves[i-1][j-1]"
              :md-options="pokemonMap.get(selectedPokemonNames[i-1]).moves.map(m => m.name)"
              :md-open-on-focus="false"
              md-dense
            >
              <label>Move #{{j}}</label>
            </md-autocomplete>
          </div>
        </md-card-content>
      </div>
    </div>

    <div class="button-container">
      <md-button @click="evaluateTeam" class="eval-btn md-accent md-raised">Evaluate Team</md-button>
    </div>

    <div v-if="showEvaluationResults">
      <h3 class="md-title">Team Evaluation</h3>

      <!-- offensive effectiveness -->
      <div class="md-layout md-gutter md-alignment-top-center">
        <!-- When attacking Pokemon of the below types, your Team has effective moves.  -->

        <div
          v-for="(type, index) in allTypes"
          :key="index"
          class="type-eval-card md-layout-item md-xsmall-size-100 md-small-size-33 md-medium-size-33 md-large-size-15 md-xlarge-size-15"
        >
          <md-card-header>
            <div class="md-title">
              <img :src="`https://www.serebii.net/pokedex-bw/type/${type}.gif`" />
            </div>
          </md-card-header>
          <md-card-content>
            <div v-if="evalResults.get(type)">
              <h6>Team member weak against {{type}}</h6>
              <img
                v-for="pokemonName in evalResults.get(type).pokemonWeakToType"
                :key="pokemonName"
                class="pokemon-img"
                :src="`https://www.serebii.net${pokemonMap.get(pokemonName).image_src}`"
              />
            </div>
          </md-card-content>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import {
  Pokemon,
  SelectedPokemon,
  Move,
  TypeEvaluationResults
} from "../models/pokemon";

@Component
export default class PokemonTeamBuilder extends Vue {
  @Prop() public pokemonData!: Pokemon[];

  private showEvaluationResults: boolean = false;

  private selectedPokemonNames: string[] = ["", "", "", "", "", "", ""];

  private selectedPokemonMoves: string[][] = [
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""]
  ];

  private evalResults: Map<string, TypeEvaluationResults> = new Map<
    string,
    TypeEvaluationResults
  >();

  private allTypes: string[] = [
    "normal",
    "fighting",
    "flying",
    "poison",
    "ground",
    "rock",
    "bug",
    "ghost",
    "steel",
    "fire",
    "water",
    "grass",
    "electric",
    "psychic",
    "ice",
    "dragon",
    "dark",
    "fairy"
  ];

  private typeWeaknesses: Map<string, string[]> = new Map<string, string[]>();

  private typeEffectivenesses: Map<string, string[]> = new Map<
    string,
    string[]
  >();

  constructor() {
    super();
    this.typeWeaknesses.set("fairy", ["poison", "steel"]);
    this.typeWeaknesses.set("steel", ["fire", "fighting", "ground"]);
    this.typeWeaknesses.set("dark", ["fighting", "bug", "fairy"]);
    this.typeWeaknesses.set("dragon", ["ice", "dragon", "fairy"]);
    this.typeWeaknesses.set("ghost", ["ghost", "dark"]);
    this.typeWeaknesses.set("rock", [
      "water",
      "grass",
      "fighting",
      "ground",
      "steel"
    ]);
    this.typeWeaknesses.set("bug", ["fire", "flying", "rock"]);
    this.typeWeaknesses.set("psychic", ["bug", "ghost", "dark"]);
    this.typeWeaknesses.set("flying", ["electic", "ice", "rock"]);
    this.typeWeaknesses.set("ground", ["water", "ice", "grass"]);
    this.typeWeaknesses.set("poison", ["ground", "psychic"]);
    this.typeWeaknesses.set("fighting", ["flying", "psychic", "fairy"]);
    this.typeWeaknesses.set("ice", ["fire", "fighting", "rock", "steel"]);
    this.typeWeaknesses.set("grass", [
      "fire",
      "ice",
      "poison",
      "flying",
      "bug"
    ]);
    this.typeWeaknesses.set("electric", ["ground"]);
    this.typeWeaknesses.set("water", ["electric", "grass"]);
    this.typeWeaknesses.set("fire", ["water", "ground", "rock"]);
    this.typeWeaknesses.set("normal", ["fighting"]);

    this.typeEffectivenesses.set("fairy", ["fighting", "dragon", "dark"]);
    this.typeEffectivenesses.set("steel", ["ice", "rock", "fairy"]);
    this.typeEffectivenesses.set("dark", ["ghost", "psychic"]);
    this.typeEffectivenesses.set("dragon", ["dragon"]);
    this.typeEffectivenesses.set("ghost", ["ghost", "psychic"]);
    this.typeEffectivenesses.set("rock", ["fire", "flying", "ice", "bug"]);
    this.typeEffectivenesses.set("bug", ["grass", "psychic", "dark"]);
    this.typeEffectivenesses.set("psychic", ["fighting", "poison"]);
    this.typeEffectivenesses.set("flying", ["grass", "fighting", "bug"]);
    this.typeEffectivenesses.set("ground", [
      "fire",
      "electric",
      "poison",
      "rock",
      "steel"
    ]);
    this.typeEffectivenesses.set("poison", ["grass", "fairy"]);
    this.typeEffectivenesses.set("fighting", [
      "ice",
      "normal",
      "rock",
      "dark",
      "steel"
    ]);
    this.typeEffectivenesses.set("ice", [
      "grass",
      "ground",
      "flying",
      "dragon"
    ]);
    this.typeEffectivenesses.set("grass", ["water", "ground", "rock"]);
    this.typeEffectivenesses.set("electric", ["water", "flying"]);
    this.typeEffectivenesses.set("water", ["fire", "ground", "rock"]);
    this.typeEffectivenesses.set("fire", ["grass", "ice", "bug", "steel"]);
    this.typeEffectivenesses.set("normal", []);
  }

  get pokemonNames() {
    console.log("get pokemonNames");
    return this.pokemonData.map((p: Pokemon) => p.name).filter(p => !!p);
  }

  get pokemonMap() {
    const map = new Map<string, Pokemon>();
    this.pokemonData.forEach((p: Pokemon) => map.set(p.name, p));
    return map;
  }

  evaluateTeam() {
    console.log("evaluating team...");
    this.showEvaluationResults = true;
    this.evalResults = new Map<string, TypeEvaluationResults>();

    this.allTypes.forEach((t: string) => {
      let typeEvalResult: TypeEvaluationResults = new TypeEvaluationResults();

      typeEvalResult.type = t;
      console.log(`evaluating type: ${t}`);

      // get pokemon that are weak to type
      this.typeEffectivenesses.get(t).forEach((weakness: string) => {
        this.selectedPokemonNames.forEach((pokemonName: string) => {
          if (pokemonName) {
            let selectedPokemon: Pokemon = this.pokemonMap.get(pokemonName);
            if (selectedPokemon.types.indexOf(weakness) > -1 && typeEvalResult.pokemonWeakToType.indexOf(selectedPokemon.name) === -1) {
              typeEvalResult.pokemonWeakToType.push(selectedPokemon.name);
            }
          }
        });
      });

      // get pokemon with moves effective against type
      // TODO

      this.evalResults.set(t, typeEvalResult);
    });
  }
}
</script>

<style lang="scss" scoped>
.pokemon-team-builder {
  margin-left: 5%;
  margin-right: 5%;
}
.pokemon-img {
  display: block;
  width: 40px;
  margin: auto;
}
.type-img-container {
  text-align: center;
}
.pokemon-card {
  border-radius: 10px;
  border: #ff4495 1px solid;
  margin: 5px;
}

.type-eval-card {
  border-radius: 10px;
  border: #ff4495 1px solid;
  margin: 5px;
}

.button-container {
  text-align: center;
}

.md-layout-item {
  padding: 0;
}

.eval-btn {
}
</style>