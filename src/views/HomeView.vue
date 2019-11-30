<template>
  <div class="home-view">
    <div class="home-view-section">
      <h1>Overview</h1>
      <overview-map-info-card-component></overview-map-info-card-component>
    </div>

    <div class="home-view-section">
      <h1>Skills</h1>
      <skill-cards-component></skill-cards-component>
    </div>

    <div class="home-view-section">
      <h1>Projects</h1>
      <projects-component></projects-component>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import OverviewMapInfoCardComponent from "@/components/OverviewMapInfoCardComponent.vue";
import SkillCardsComponent from "@/components/SkillCardsComponent.vue";
import ProjectsComponent from "@/components/ProjectsComponent.vue";

@Component({
  components: {
    OverviewMapInfoCardComponent,
    SkillCardsComponent,
    ProjectsComponent
  }
})
export default class HomeView extends Vue {}
</script>

<style lang="scss" scoped>
.home-view {
  margin-left: 5%;
  margin-right: 5%;

  .home-view-section {
    margin-bottom: 7%;
  }
}
</style>

