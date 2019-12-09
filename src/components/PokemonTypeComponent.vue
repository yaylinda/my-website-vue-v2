<template>
  <div>
    <div v-if="showPokemonType">
      <img class="pokemon-img" :src="`https://www.serebii.net${pokemonImgSrc}`" />
      <div class="type-img-container">
      <img
        v-for="type in types"
        :key="type"
        :src="`https://www.serebii.net/pokedex-bw/type/${type}.gif`"
      />
      </div>
    </div>

    <div v-if="showPokemonTypeChip">
      <md-chip>
        <img class="chip-pokemon-img" :src="`https://www.serebii.net${pokemonImgSrc}`" />
        <img
          class="chip-move-type-img"
          v-for="type in types"
          :key="type"
          :src="`https://www.serebii.net/pokedex-bw/type/${type}.gif`"
        />
      </md-chip>
    </div>

    <div v-if="showPokemonMoveTypeChip">
      <md-chip v-for="(m, index) in moves" :key="index">
        <img class="chip-pokemon-img" :src="`https://www.serebii.net${pokemonImgSrc}`" />
        {{m}}
        <img class="chip-move-type-img" :src="`https://www.serebii.net/pokedex-bw/type/${moveTypes[index]}.gif`" />
      </md-chip>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

@Component
export default class PokemonTypeComponent extends Vue {
  @Prop() private pokemonImgSrc!: string;
  @Prop() private types!: string[];
  @Prop() private moves!: string;
  @Prop() private moveTypes!: string[];

  @Prop() private showPokemonType!: boolean;
  @Prop() private showPokemonTypeChip!: boolean;
  @Prop() private showPokemonMoveTypeChip!: boolean;
}
</script>

<style lang="scss" scoped>
.pokemon-img {
  width: 30px;
  display: block;
  margin: auto;
}
.type-img-container {
  text-align: center;
}

.chip-pokemon-img {
  width: 30px;
  right: 0;
}

.chip-move-type-img {
  position: absolute;
  top: 10px;
  right: 20px;
}

.md-chip {
  font-size: 12px;
  margin-top: 5px;
  display: block;
}

.md-chip+.md-chip {
margin-left: 0;
}
</style>