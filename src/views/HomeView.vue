<template>
  <div class="home-view">

    <home-section-component 
      title="0. Overview" 
      titleAlign="left">
    </home-section-component>

    <home-section-component 
      title="0. Current Employment" 
      titleAlign="right">
    </home-section-component>

    <home-section-component 
      title="0. Education and Internships" 
      titleAlign="left">
    </home-section-component>

    <home-section-component 
      title="0. Personal Projects" 
      titleAlign="right">
    </home-section-component>

    <!-- linda is a versatile, mid-level software engineerin, with an emphasis on backend API development. Including relational database entity modeling, and dabbling in some frontend developments with frameworks such as Vue and Angular.  -->
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

  }
</script>


