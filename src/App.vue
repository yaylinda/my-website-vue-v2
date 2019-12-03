<template>
  <div id="app">

    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/data-viz">Data Viz</router-link> |
      <router-link to="/simple-war">Simple War</router-link> |
      <router-link :to="{ name: 'poke-team', params: pokemonData}">Pokemon Team Builder</router-link> |
      <a href="resume.pdf" target="_blank">Resume</a>
    </div>

    <router-view :pokemonData="pokemonData"/>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import pokedex from './utils/pokedex.json';
import { Pokemon } from './models/pokemon';

@Component
export default class App extends Vue {

  public $material: any;
  public pokemonData: Pokemon[] = [];

  constructor() {
    super();
    console.log('App constructor');
    this.$material.theming.theme = 'myTheme';
  }

  mounted() {
    console.log('App mounted');
    this.pokemonData = pokedex.map((p: any) => new Pokemon(p));
    console.log(`parsed ${this.pokemonData.length} pokemon`);
  }

}
</script>


<style lang="scss">

@import "~vue-material/dist/theme/engine";

@include md-register-theme("myTheme", (
  accent: #ff4495,
  primary: #50e3c2,
  theme: dark
));

@import "~vue-material/dist/theme/all";

#app {
  position: relative;
  font-family: 'Roboto Mono', sans-serif;
  min-height: 100vh;
}
#nav {
  padding: 30px;
  text-align: center;
  a {
    font-weight: bold;
    &.router-link-exact-active {
      color: #ff4495;
    }
  }
}

</style>
