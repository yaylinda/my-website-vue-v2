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
      <personal-projects-component></personal-projects-component>
    </home-section-component>

  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import HomeSectionComponent from '@/components/HomeSectionComponent.vue';
  import OverviewMapInfoCardComponent from '@/components/OverviewMapInfoCardComponent.vue';
  import SkillCardsComponent from '@/components/SkillCardsComponent.vue';
  import PersonalProjectsComponent from '@/components/PersonalProjectsComponent.vue';

  @Component({
    components: {
      HomeSectionComponent,
      OverviewMapInfoCardComponent,
      SkillCardsComponent,
      PersonalProjectsComponent
    },
  })
  export default class HomeView extends Vue {

  }
</script>


