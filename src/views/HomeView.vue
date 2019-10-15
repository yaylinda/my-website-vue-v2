<template>
  <div md-content class="home-view">

    <home-section-component 
      title="0. Overview" 
      titleAlign="left">
      <overview-map-info-card-component></overview-map-info-card-component>
    </home-section-component>

    <home-section-component 
      title="1. Skills" 
      titleAlign="left">
      <skill-cards-component></skill-cards-component>
    </home-section-component>

    <home-section-component 
      title="2. Personal Projects" 
      titleAlign="left">
      <projects-component></projects-component>
    </home-section-component>

  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import HomeSectionComponent from '@/components/HomeSectionComponent.vue';
  import OverviewMapInfoCardComponent from '@/components/OverviewMapInfoCardComponent.vue';
  import SkillCardsComponent from '@/components/SkillCardsComponent.vue';
  import ProjectsComponent from '@/components/ProjectsComponent.vue';

  @Component({
    components: {
      HomeSectionComponent,
      OverviewMapInfoCardComponent,
      SkillCardsComponent,
      ProjectsComponent
    },
  })
  export default class HomeView extends Vue {

  }
</script>


