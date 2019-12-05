<template>
  <div class="pokemon-team-builder">
    <h3 class="md-title">Sword and Shield Team Builder</h3>

    <div class="md-layout md-gutter">
      <md-card
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
          <div v-if="pokemonMap.get(selectedPokemonNames[i-1])">
            <pokemon-type-component
              :pokemonImgSrc="pokemonMap.get(selectedPokemonNames[i-1]).image_src"
              :types="pokemonMap.get(selectedPokemonNames[i-1]).types"
            ></pokemon-type-component>
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
      </md-card>
    </div>

    <div class="button-container">
      <md-button @click="evaluateTeam" class="eval-btn md-accent md-raised">Evaluate Team</md-button>
    </div>

    <div v-if="showEvaluationResults">
      <h3 class="md-title">Team Evaluation</h3>

      <!-- offensive effectiveness -->
      <div class="md-layout md-gutter">
        <!-- When attacking Pokemon of the below types, your Team has effective moves.  -->

        <md-card
          v-for="(type, index) in allTypes"
          :key="index"
          class="type-eval-card md-layout-item md-xsmall-size-100 md-small-size-25 md-medium-size-25 md-large-size-15 md-xlarge-size-15"
        >
          <md-card-header>
            <div class="md-title">
              <img :src="`https://www.serebii.net/pokedex-bw/type/${type}.gif`" />
            </div>
          </md-card-header>
          <md-card-content>
            <div v-if="evalResults.get(type).pokemonWeakToType.length">
              <h6>Team member weak against {{type}}</h6>
              <pokemon-type-component
                v-for="pokemonName in evalResults.get(type).pokemonWeakToType"
                :key="pokemonName"
                :pokemonImgSrc="pokemonMap.get(pokemonName).image_src"
                :types="pokemonMap.get(pokemonName).types"
              ></pokemon-type-component>
            </div>

            <div v-if="evalResults.get(type).pokemonWithMovesEffectiveAgainstType.size">
              <h6>Team member with move effective against {{type}}</h6>
              <div
                v-for="pokemonName in evalResults.get(type).pokemonWithMovesEffectiveAgainstType.keys()"
                :key="pokemonName"
              >
                <img
                  class="pokemon-img"
                  :src="`https://www.serebii.net${pokemonMap.get(pokemonName).image_src}`"
                />
                <p>{{evalResults.get(type).pokemonWithMovesEffectiveAgainstType.get(pokemonName)}}</p>
              </div>
            </div>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import PokemonTypeComponent from "@/components/PokemonTypeComponent.vue";
import {
  Pokemon,
  SelectedPokemon,
  Move,
  TypeEvaluationResults
} from "../models/pokemon";

@Component({
  components: {
    PokemonTypeComponent
  }
})
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
    console.log("get pokemonMap");
    const map = new Map<string, Pokemon>();
    this.pokemonData.forEach((p: Pokemon) => map.set(p.name, p));
    return map;
  }

  get movesMap() {
    console.log("get movesMap");
    const map = new Map<string, Move>();
    this.pokemonData.forEach((p: Pokemon) => {
      p.moves.forEach((m: Move) => {
        if (!map.has(m.name)) {
          map.set(m.name, m);
        }
      });
    });
    return map;
  }

  evaluateTeam() {
    console.log("evaluating team...");
    this.showEvaluationResults = true;
    this.evalResults = new Map<string, TypeEvaluationResults>();

    this.allTypes.forEach((t: string) => {
      let typeEvalResult: TypeEvaluationResults = new TypeEvaluationResults();

      typeEvalResult.type = t;

      // get pokemon that are weak to type
      this.typeEffectivenesses.get(t).forEach((weakness: string) => {
        this.selectedPokemonNames.forEach((pokemonName: string) => {
          if (pokemonName && this.pokemonMap.has(pokemonName)) {
            let selectedPokemon: Pokemon = this.pokemonMap.get(pokemonName);
            if (
              selectedPokemon.types.indexOf(weakness) > -1 &&
              typeEvalResult.pokemonWeakToType.indexOf(selectedPokemon.name) ===
                -1
            ) {
              typeEvalResult.pokemonWeakToType.push(selectedPokemon.name);
            }
          }
        });
      });

      // get pokemon with moves effective against type
      this.typeWeaknesses.get(t).forEach((effective: string) => {
        for (let selectedPokemonIndex in this.selectedPokemonMoves) {
          let selectedPokemon = this.selectedPokemonNames[selectedPokemonIndex];
          let selectedMoves = this.selectedPokemonMoves[selectedPokemonIndex];
          selectedMoves.forEach((m: string) => {
            if (
              m &&
              this.movesMap.has(m) &&
              this.movesMap.get(m).type === effective
            ) {
              if (
                !typeEvalResult.pokemonWithMovesEffectiveAgainstType.has(
                  selectedPokemon
                )
              ) {
                typeEvalResult.pokemonWithMovesEffectiveAgainstType.set(
                  selectedPokemon,
                  []
                );
              }
              typeEvalResult.pokemonWithMovesEffectiveAgainstType
                .get(selectedPokemon)
                .push(m);
            }
          });
        }
      });

      this.evalResults.set(t, typeEvalResult);
    });
  }

  // @Watch('selectedPokemonNames', { deep: true } )
  selectedPokemonUpdate(newValue: string[], oldValue: string[]) {
    console.log(
      `selectedPokemonNames updated from ${oldValue}, to ${newValue}`
    );
    this.evaluateTeam();
  }
}
</script>

<style lang="scss" scoped>
.pokemon-team-builder {
  margin-left: 5%;
  margin-right: 5%;
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