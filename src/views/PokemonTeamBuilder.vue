<template>
  <div>
    <md-toolbar class="md-primary">
      <h3 class="md-title">Pokemon Sword and Shield Team Builder</h3>
    </md-toolbar>

    <div class="md-layout md-gutter md-alignment-top-center">
      <div
        v-for="i of 6"
        :key="i"
        class="md-layout-item md-xsmall-size-100 md-small-size-50 md-medium-size-33 md-large-size-15 md-xlarge-size-15"
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
          <!-- <md-field v-if="pokemonMap.get(selectedPokemonNames[i-1])">
            <label :for="`moves_${i}`">Moves</label>
            <md-select
              v-model="selectedPokemonMoves[i-1]"
              :name="`moves_${i}`"
              :id="`moves_${i}`"
              multiple
            >
              <md-option v-for="(m, index) in pokemonMap.get(selectedPokemonNames[i-1]).moves" :key="index" :value="m.name">{{m.name}}</md-option>
            </md-select>
          </md-field> -->

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
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Pokemon, SelectedPokemon, Move } from "../models/pokemon";

@Component
export default class PokemonTeamBuilder extends Vue {
  @Prop() public pokemonData!: Pokemon[];

  private selectedPokemonNames: string[] = ["", "", "", "", "", "", ""];

  private selectedPokemonMoves: string[][] = [
    ["", "", "", ""], 
    ["", "", "", ""], 
    ["", "", "", ""], 
    ["", "", "", ""], 
    ["", "", "", ""], 
    ["", "", "", ""], 
  ];

  private selectedPokemon: SelectedPokemon[] = [
    new SelectedPokemon(), 
    new SelectedPokemon(), 
    new SelectedPokemon(), 
    new SelectedPokemon(), 
    new SelectedPokemon(), 
    new SelectedPokemon()
  ];

  get pokemonNames() {
    console.log("get pokemonNames");
    return this.pokemonData.map((p: Pokemon) => p.name).filter(p => !!p);
  }

  get pokemonMap() {
    const map = new Map<string, Pokemon>();
    this.pokemonData.forEach((p: Pokemon) => map.set(p.name, p));
    return map;
  }
}
</script>

<style lang="scss" scoped>
.pokemon-img {
  display: block;
  width: 40px;
  margin: auto;
}
.type-img-container {
  text-align: center;
}
</style>