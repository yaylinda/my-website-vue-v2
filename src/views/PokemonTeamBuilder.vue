<template>
  <div class="pokemon-team-builder">

    <h3 class="md-title">Sword and Shield Team Builder</h3>

    <div class="md-layout md-gutter">
      <md-card
        v-for="i of 6"
        :key="i"
        class="pokemon-card md-layout-item"
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
              :showPokemonType="true"
              :pokemonImgSrc="pokemonMap.get(selectedPokemonNames[i-1]).image_src"
              :types="pokemonMap.get(selectedPokemonNames[i-1]).types"
            ></pokemon-type-component>
          </div>
        </md-card-header>
        <md-card-content class="md-layout md-gutter">
          <div v-for="j of 4" :key="j" class="md-layout-item md-size-100">
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

    <!-- <div class="button-container">
      <md-button @click="evaluateTeam" class="eval-btn md-accent md-raised">Evaluate Team</md-button>
    </div> -->

    <div>
      <md-chip class="md-accent" md-clickable>{{selectedPokemonUrl}}</md-chip>
    </div>

    <br/><br/>

    <h3 class="md-title">Team Evaluation</h3>

    <div class="md-layout md-gutter">
      <md-card
        v-for="(type, index) in allTypes"
        :key="index"
        class="pokemon-card md-layout-item"
      >
        <md-card-area md-inset>
          <md-card-header>
            <div class="md-title">
              <img class="type-title" :src="`https://www.serebii.net/pokedex-bw/type/${type}.gif`" />
            </div>
          </md-card-header>
        </md-card-area>

        <md-card-area md-inset>
          <md-card-content>
            <div v-if="evalResults.get(type) && evalResults.get(type).pokemonWeakToType.length">
              <div>
                <i class="fa fa-times-circle"></i> Type Disadvantage
              </div>
              <div>
                <pokemon-type-component
                  v-for="pokemonName in evalResults.get(type).pokemonWeakToType"
                  :key="pokemonName"
                  :showPokemonTypeChip="true"
                  :pokemonImgSrc="pokemonMap.get(pokemonName).image_src"
                  :types="pokemonMap.get(pokemonName).types"
                ></pokemon-type-component>
              </div>
            </div>
            <div v-else>
              <div>
                <i class="fa fa-check-circle"></i> No Type Disadvantage
              </div>
            </div>
          </md-card-content>
        </md-card-area>

        <md-card-area md-inset>
          <md-card-content>
            <div
              v-if="evalResults.get(type) && evalResults.get(type).pokemonWithMovesEffectiveAgainstType.size"
            >
              <div>
                <i class="fa fa-check-circle"></i> Super Effective Attacks
              </div>
              <div>
                <pokemon-type-component
                  v-for="pokemonName in evalResults.get(type).pokemonWithMovesEffectiveAgainstType.keys()"
                  :key="pokemonName"
                  :pokemonImgSrc="pokemonMap.get(pokemonName).image_src"
                  :types="pokemonMap.get(pokemonName).types"
                  :showPokemonMoveTypeChip="true"
                  :moves="evalResults.get(type).pokemonWithMovesEffectiveAgainstType.get(pokemonName)"
                  :moveTypes="evalResults.get(type).pokemonWithMovesEffectiveAgainstType.get(pokemonName).map(m => movesMap.get(m).type)"
                ></pokemon-type-component>
              </div>
            </div>
            <div v-else>
              <i class="fa fa-times-circle"></i> No Super Effective Attacks
            </div>
          </md-card-content>
        </md-card-area>
      </md-card>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import PokemonTypeComponent from '@/components/PokemonTypeComponent.vue';
import {
  Pokemon,
  SelectedPokemon,
  Move,
  TypeEvaluationResults,
} from '../models/pokemon';
import {
  pokemonData,
  allTypes,
  typeWeaknesses,
  typeEffectivenesses,
} from '../utils/pokemonData';

@Component({
  components: {
    PokemonTypeComponent,
  },
})
export default class PokemonTeamBuilder extends Vue {

  // constants from importing

  private allTypes: string[] = allTypes;

  // variables to hold input

  private baseUrl: string = 'https://www.lindazheng.me/poke-team?team=';

  private selectedPokemonUrl: string = '';

  private selectedPokemonNames: string[] = ['', '', '', '', '', '', ''];

  private selectedPokemonMoves: string[][] = [
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', ''],
  ];

  private evalResults: Map<string, TypeEvaluationResults> = new Map<
    string,
    TypeEvaluationResults
  >();

  mounted() {
    console.log('mounted PokemonTeamBuilder');
    console.log(`team: ${this.$route.query.team}`);
    
    if (this.$route.query.team) {
      this.generatedSelectedPokemonAndMovesFromUrl()
    }
  }

  // getters

  get pokemonNames() {
    // console.log('get pokemonNames');
    return pokemonData.map((p: Pokemon) => p.name).filter((p) => !!p);
  }

  get pokemonMap() {
    // console.log('get pokemonMap');
    const map = new Map<string, Pokemon>();
    pokemonData.forEach((p: Pokemon) => map.set(p.name, p));
    return map;
  }

  get movesMap() {
    // console.log('get movesMap');
    const map = new Map<string, Move>();
    pokemonData.forEach((p: Pokemon) => {
      p.moves.forEach((m: Move) => {
        if (!map.has(m.name)) {
          map.set(m.name, m);
        }
      });
    });
    return map;
  }

  // methods

  public evaluateTeam() {
    console.log('evaluating team...');
    this.generateSelectedUrl();

    this.evalResults = new Map<string, TypeEvaluationResults>();

    allTypes.forEach((t: string) => {
      const typeEvalResult: TypeEvaluationResults = new TypeEvaluationResults();

      typeEvalResult.type = t;

      // get pokemon that are weak to type
      typeEffectivenesses!.get(t)!.forEach((weakness: string) => {
        this.selectedPokemonNames.forEach((pokemonName: string) => {
          if (pokemonName && this.pokemonMap.has(pokemonName)) {
            const selectedPokemon: Pokemon = this.pokemonMap.get(pokemonName)!;
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
      typeWeaknesses.get(t)!.forEach((effective: string) => {
        for (const selectedPokemonIndex in this.selectedPokemonMoves) {
          const selectedPokemon = this.selectedPokemonNames[selectedPokemonIndex];
          const selectedMoves = this.selectedPokemonMoves[selectedPokemonIndex];
          selectedMoves.forEach((m: string) => {
            if (
              m &&
              this.movesMap.has(m) &&
              this.movesMap.get(m)!.type === effective
            ) {
              if (
                !typeEvalResult.pokemonWithMovesEffectiveAgainstType.has(
                  selectedPokemon,
                )
              ) {
                typeEvalResult.pokemonWithMovesEffectiveAgainstType.set(
                  selectedPokemon,
                  [],
                );
              }
              typeEvalResult.pokemonWithMovesEffectiveAgainstType!
                .get(selectedPokemon)!
                .push(m);
            }
          });
        }
      });

      this.evalResults.set(t, typeEvalResult);
    });
  }

  public generateSelectedUrl() {
    console.log('generateSelectedUrl');
    let pokemonUrl = '';

    for (let i of [0,1,2,3,4,5]) {
      if (this.selectedPokemonNames[i]) {
        pokemonUrl += `${i > 0 ? '::' : ''}${this.selectedPokemonNames[i]}=${JSON.stringify(this.selectedPokemonMoves[i])}`;
      }
    }
    this.selectedPokemonUrl = `${this.baseUrl}${pokemonUrl}`;
  }

  public generatedSelectedPokemonAndMovesFromUrl() {
    console.log('generatedSelectedPokemonAndMovesFromUrl');
    let i = 0;
    (this.$route.query.team as string).split('::').forEach((s: string) => {
      this.selectedPokemonNames[i] = s.split('=')[0];
      this.selectedPokemonMoves[i] = JSON.parse(s.split('=')[1]);
      i++;
    });
    this.evaluateTeam();
  }

  @Watch('selectedPokemonNames', { deep: true })
  public selectedPokemonUpdate(newValue: string[], oldValue: string[]) {
    // console.log(
    //   `selectedPokemonNames updated from ${oldValue}, to ${newValue}`,
    // );

    let doEval = true;

    for (const val of newValue) {
      if (!this.pokemonMap.get(val) && val) {
        doEval = false;
        break;
      }
    }

    if (doEval) {
      this.evaluateTeam();
    }
  }

  @Watch('selectedPokemonMoves', { deep: true })
  public selectedPokemonMovesUpdate(newValue: string[][], oldValue: string[][]) {
    // console.log(
    //   `selectedPokemonMoves updated from ${oldValue}, to ${newValue}`,
    // );

    let doEval = true;

    loop1: for (const pokeMove of newValue) {
      loop2: for (const move of pokeMove) {
        if (!this.movesMap.get(move) && move) {
          doEval = false;
          break loop1;
        }
      }
    }

    if (doEval) {
      this.evaluateTeam();
    }
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
.md-title {
  margin-top: 0;
  min-width: 250px;
}

.type-title {
  height: 20px;
}

.button-container {
  text-align: center;
}

.md-layout-item {
  padding: 0;
}

.md-input {
  font-size: 12px;
}

.fa-times-circle {
  color: red;
}

.fa-check-circle {
  color: green;
}
</style>