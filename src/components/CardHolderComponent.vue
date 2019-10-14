<template>
    <div class="card-holder">

        <card-component 
          :activeCard="activeCard" 
          cardId="default" 
          title="Select a Point of Interest"
          subtitle="Click one of the blue circles to explore!">
        </card-component>

        <card-component 
          :activeCard="activeCard" 
          cardId="childhood" 
          title="Childhood"
          subtitle="Ages 0-18">
        </card-component>

        <card-component 
          :activeCard="activeCard" 
          cardId="education" 
          title="Education"
          subtitle="Rice University - Class of 2016">
        </card-component>

        <card-component 
          :activeCard="activeCard" 
          cardId="internships" 
          title="Internships"
          subtitle="Summers of 2013, 2014, 2015">
        </card-component>

        <card-component 
          :activeCard="activeCard" 
          cardId="capitalone" 
          title="At Capital One"
          subtitle="First full-time career!">
        </card-component>

    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import CardComponent from '@/components/CardComponent.vue';

@Component({
  components: {
    CardComponent,
  },
})
export default class CardHolderComponent extends Vue {
  @Prop() public activeCard!: string;
}
</script>

<style scoped lang="scss">

    .card-holder {
      
    }

</style>