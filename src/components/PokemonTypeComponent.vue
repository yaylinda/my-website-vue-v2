<template>
  <div>
    <img class="pokemon-img" :src="`https://www.serebii.net${pokemonImgSrc}`" />
    <div class="type-img-container">
      <img
        class="type-img"
        v-for="type in types"
        :key="type"
        :src="`https://www.serebii.net/pokedex-bw/type/${type}.gif`"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

@Component
export default class PokemonTypeComponent extends Vue {
  @Prop() private pokemonImgSrc!: string;
  @Prop() private types!: string[];
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