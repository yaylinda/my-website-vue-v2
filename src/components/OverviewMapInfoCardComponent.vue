<template>
  <div>
    <md-card>

      <md-card-media>
        <img src="../assets/background.png" alt="Map">
        <marker-component markerId="childhood" position="top: 203px; left: 137px;" v-on:marker-click="goToMarker"></marker-component>
        <marker-component markerId="education" position="top: 145px; left: 233px;" v-on:marker-click="goToMarker"></marker-component>
        <marker-component markerId="internships" position="top: 187px; left: 353px;" v-on:marker-click="goToMarker"></marker-component>
        <marker-component markerId="capitalone" position="top: 161px; left: 433px;" v-on:marker-click="goToMarker"></marker-component>
        <person-component :position="personPosition"></person-component>
      </md-card-media>

      <md-card-header>
        <md-avatar>
          <img src="../assets/circle-icon.svg" alt="Avatar">
        </md-avatar>
        <div class="md-title">Title goes here</div>
        <div class="md-subhead">Subtitle here</div>
      </md-card-header>

      <md-card-content>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea nostrum.
      </md-card-content>

      <md-card-actions>
        <md-button>Previous</md-button>
        <md-button>Next</md-button>
      </md-card-actions>

    </md-card>
    
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import MarkerComponent from '@/components/MarkerComponent.vue';
import PersonComponent from '@/components/PersonComponent.vue';

@Component({
  components: {
    MarkerComponent,
    PersonComponent,
  },
})
export default class OverviewMapInfoCardComponent extends Vue {

  private personPosition: string = 'top: 280px; left: 93px';
  private activeCard: string = 'default';

  public goToMarker(position: string, markerId: string) {
    console.log(`clicked on marker with position=${position}, markerId=${markerId}`);
    this.personPosition = position;
    this.$emit('update-card', markerId);

  }

  public updateCard(markerId: string) {
    console.log(`updateCard to markerId=${markerId}`);
    this.activeCard = markerId;
  }
}
</script>

<style scoped lang="scss">

  .points {
    position: absolute;
  }

  .md-card {
    width: 562px;
    margin: 0;
  }

  // .background {
  //   position: relative;
  //   background-image: url("../assets/background.png");
  //   height: 335px;
  //   width: 562px;
  // }

</style>
