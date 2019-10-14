<template>
  <div class="home-view">

    <home-section-component 
      title="0. Overview" 
      titleAlign="left">
      <overview-map-info-card-component></overview-map-info-card-component>
    </home-section-component>

    <home-section-component 
      title="1. Skills" 
      titleAlign="right">
    </home-section-component>

    <home-section-component 
      title="2. Personal Projects" 
      titleAlign="left">
    </home-section-component>

    <!-- linda is a versatile, mid-level software engineerin, with an emphasis on backend API development. Including relational database entity modeling, and dabbling in some frontend developments with frameworks such as Vue and Angular.  -->
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import HomeSectionComponent from '@/components/HomeSectionComponent.vue';
  import OverviewMapInfoCardComponent from '@/components/OverviewMapInfoCardComponent.vue';

  @Component({
    components: {
      HomeSectionComponent,
      OverviewMapInfoCardComponent
    },
  })
  export default class HomeView extends Vue {

  }
</script>


