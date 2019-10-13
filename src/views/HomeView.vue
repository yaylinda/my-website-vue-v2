<template>
  <div class="home-view">
    <home-section-component v-for="(title, index) in sectionTitles" :title="index + '. ' + title">
      
    </home-section-component>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import HomeSectionComponent from '@/components/HomeSectionComponent.vue';

  @Component({
    components: {
      HomeSectionComponent,
    },
  })
  export default class HomeView extends Vue {
    
    private sectionTitles!: string[];

    constructor() {
      super();

      this.sectionTitles = [
        'Overview',
        'Education',
        'Current Employment',
        'Personal Projects',
      ];
    }

  }
</script>


