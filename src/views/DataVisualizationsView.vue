<template>
  <div class="data-viz-view">
    <h1>Data Visualizations</h1>

    <div class="md-layout md-gutter">
      <md-card
        class="md-layout-item md-xsmall-size-100 md-small-size-50 md-medium-size-33 md-large-size-25 md-xlarge-size-25"
      >
        <md-card-header>
          <md-avatar>
            <md-icon>
              <i class="fa fa-map-marker"></i>
            </md-icon>
          </md-avatar>
          <div class="md-title">Location History through Italy</div>
          <div class="md-subhead">Created: September 2019</div>
        </md-card-header>
        <md-card-media>
          <img src="../assets/data-viz/locations.gif" />
        </md-card-media>
        <md-card-content></md-card-content>
      </md-card>

      <md-card
        class="md-layout-item md-xsmall-size-100 md-small-size-50 md-medium-size-33 md-large-size-25 md-xlarge-size-25"
      >
        <md-card-header>
          <md-avatar>
            <md-icon>
              <i class="fa fa-calendar-o"></i>
            </md-icon>
          </md-avatar>
          <div class="md-title">A Year of Booleans</div>
          <div class="md-subhead">Created: November 2018</div>
        </md-card-header>
        <md-card-media>
          <img src="../assets/data-viz/appropriate_stats.png" />
        </md-card-media>
        <md-card-content></md-card-content>
      </md-card>

      <md-card
        class="md-layout-item md-xsmall-size-100 md-small-size-50 md-medium-size-33 md-large-size-25 md-xlarge-size-25"
      >
        <md-card-header>
          <md-avatar>
            <md-icon>
              <i class="fa fa-hourglass-half"></i>
            </md-icon>
          </md-avatar>
          <div class="md-title">Hourly Activities</div>
          <div class="md-subhead">Created: September 2017</div>
        </md-card-header>
        <md-card-media>
          <img src="../assets/data-viz/hourly_dotplot.png" />
        </md-card-media>
        <md-card-content></md-card-content>
      </md-card>

      <md-card
        class="md-layout-item md-xsmall-size-100 md-small-size-50 md-medium-size-33 md-large-size-25 md-xlarge-size-25"
      >
        <md-card-header>
          <md-avatar>
            <md-icon>
              <i class="fa fa-circle-o"></i>
            </md-icon>
          </md-avatar>
          <div class="md-title">Fun-Sized M&M's</div>
          <div class="md-subhead">Created: July 2017</div>
        </md-card-header>
        <md-card-media>
          <img src="../assets/data-viz/boxplot.png" />
          <img src="../assets/data-viz/heatmap.png" />
        </md-card-media>
        <md-card-content></md-card-content>
      </md-card>

      <md-card
        class="md-layout-item md-xsmall-size-100 md-small-size-50 md-medium-size-33 md-large-size-25 md-xlarge-size-25"
      >
        <md-card-header>
          <md-avatar>
            <md-icon>
              <i class="fa fa-magic"></i>
            </md-icon>
          </md-avatar>
          <div class="md-title">Harry Potter Movies</div>
          <div class="md-subhead">Created: July 2017</div>
        </md-card-header>
        <md-card-media>
          <img src="../assets/data-viz/plot_20_accent.png" />
        </md-card-media>
        <md-card-content></md-card-content>
      </md-card>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class DataVisualizationsView extends Vue {}
</script>

<style scoped lang="scss">
.data-viz-view {
  margin-left: 5%;
  margin-right: 5%;
}

img {
  max-width: 100%;
}

.fa {
  color: #ff4495;
}
</style>
