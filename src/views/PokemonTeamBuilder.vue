<template>
  <div>
      <md-toolbar class="md-primary">
      <h3 class="md-title">Pokemon Sword and Shield Team Builder</h3>
    </md-toolbar>

    <div class="md-layout md-gutter">
      <div v-for="i of 6" :key="i" class="md-layout-item md-xsmall-size-100 md-small-size-50 md-medium-size-33 md-large-size-15 md-xlarge-size-15">
        <md-card-header>
          <md-avatar>
            <md-icon>
              <i class="fa fa-map-marker"></i>
            </md-icon>
          </md-avatar>
          <div class="md-title">Select Pokemon</div>
          <div class="md-subhead">Pokemon Type</div>
        </md-card-header>
        <md-card-content class="md-layout md-gutter">
            <div class="md-layout-item md-size-100">
                <md-field>
                <md-select v-model="selectedPokemon" :name="'pokemon_' + i" :id="'pokemon_' + i">
                  <md-option v-for="(p, index) in pokemonNames" :key="(p, index)" value="p">{{p}}</md-option>
              </md-select>
                </md-field>
            </div>
          <div v-for="j of 4" :key="j" class="md-layout-item md-size-50">Select move ({{j}})</div>
        </md-card-content>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import pokedex from '../utils/pokedex.json';

@Component
export default class PokemonTeamBuilder extends Vue {

    data() {
        return {
            'pokedex' : pokedex,
            'pokemonNames' : pokedex.map(p => p['name']),
            'selectedPokemon' : []
            };
    }

}
</script>

<style lang="scss" scoped>
</style>