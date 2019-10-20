<template>
  <div class="md-layout md-gutter">

    <md-card class="md-layout-item md-medium-size-100 md-small-size-50">
      <md-card-media>
        <div class="map-marker-wrapper">
          <img src="../assets/background.png" alt="Map">

          <marker-component 
            v-for="m in Object.values(markerDataMap)"
            v-bind:key="m.markerId"
            :markerId="m.markerId" 
            :position="m.position" 
            @marker-click="goToMarker">
          </marker-component>

          <person-component :position="currentMarker.position"></person-component>
        </div>
      </md-card-media>
    </md-card>

    <md-card class="md-layout-item md-medium-size-100 md-small-size-50">

      <md-card-header>
        <md-avatar>
          <img src="../assets/circle-icon.svg" alt="Avatar">
        </md-avatar>
        <div class="md-title">{{currentMarker.cardData.title}}</div>
        <div class="md-subhead">{{currentMarker.cardData.subtitle}}</div>
      </md-card-header>

      <md-card-content v-html="currentMarker.cardData.content"></md-card-content>

      <md-card-actions>
        <md-button v-if="Object.keys(markerDataMap).indexOf(currentMarker.markerId) === 0" class="md-disabled" disabled>Previous</md-button>
        <md-button v-else class="md-primary" @click="updateCard(-1)">Previous</md-button>

        <md-button v-if="Object.keys(markerDataMap).indexOf(currentMarker.markerId) === Object.keys(markerDataMap).length - 1" class="md-disabled" disabled>Next</md-button>
        <md-button v-else class="md-primary" @click="updateCard(1)">Next</md-button>
      </md-card-actions>

    </md-card>

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import MarkerComponent from '@/components/MarkerComponent.vue';
import PersonComponent from '@/components/PersonComponent.vue';
import { MarkerData, CardData } from '@/models/overview-component-data';

@Component({
  components: {
    MarkerComponent,
    PersonComponent,
  },
})
export default class OverviewMapInfoCardComponent extends Vue {

  private markerDataMap: any = {};
  private currentMarker!: MarkerComponent;

  constructor() {
    super();

    this.markerDataMap['default'] = new MarkerData('default', 'top: 280px; left: 93px', 
      new CardData('Introduction', 'Hi, I\'m Linda!', 
        '<p>Linda is a versatile software engineer with an emphasis on back-end development. From relational database entity modeling to API design and implementation.</p>' +
        '<p>Linda also has experience in front-end development, including frameworks such as Vue and Angular.</p>' +
        '<p>Although not part of her day-job, Linda also dabbles in data visualizations. A picture\'s worth a thousand words, and a graph is the best type of picture.</p>'));

    this.markerDataMap['childhood'] = new MarkerData('childhood', 'top: 203px; left: 137px;', 
      new CardData('Childhood', 'Ages 0-18', 
        '<p><b>1994: </b>born (Wuhan, China)</p>' +
        '<p><b>1999: </b>moved to Portland, OR with parents; started elementary school</p>' +
        '<p><b>2001: </b>obtained a little brother</p>' +
        '<p><b>2002: </b>started serious piano lessons (first long-term activity)</p>' +
        '<p><b>2003: </b>moved to a house for the first time</p>' +
        '<p><b>2005: </b>graduated elementary school; started middle school (new school district)</p>' +
        '<p><b>2008: </b>graduated middle school; started high school</p>' +
        '<p><b>2010: </b>started IB Diploma program; took first programming class (C++)</p>' +
        '<p><b>2011: </b>quit piano lessons; first job (Kumon Tutor)</p>' +
        '<p><b>2012: </b>completed IB Diploma; graduated high school; started college</p>'));

    this.markerDataMap['education'] = new MarkerData('education', 'top: 145px; left: 233px;', 
      new CardData('Education', 'Rice University', 
        'Linda attended Rice University (Houston, TX) from August 2012 and graduated May 2016. Double-majored in Computer Science and Statistics.'));

    this.markerDataMap['internships'] = new MarkerData('internships', 'top: 187px; left: 353px;', 
      new CardData('Internships', 'Summers 2013, 2014, 2015', 
        '<p><b>Shape Security (Summer 2015)</b></p>' +
        '<ul>' +
        '  <li>Selected for the KPCB Engineering Fellowship</li>' +
        '  <li>Experienced the Silicon Valley start-up life</li>' +
        '  <li>Developed Java tools for ES6</li>' +
        '  <li>Contributed to the Shift open-source project</li>' +
        '</ul>' +
        '<p><b>Pros Inc. (Summer 2014)</b></p>' +
        '<ul>' +
        '  <li>Learned how to develop enterprise-level applications in Java</li>' +
        '  <li>Learned the Spring Framework, and fundamentals of API development</li>' +
        '  <li>Gained experience in relational databases and SQL</li>' +
        '</ul>' +
        '<p><b>Jones McClure Publishing (Summer 2013)</b></p>' +
        '<ul>' +
        '  <li>Learned C#, JavaScript, HTML, CSS, and stand-ups</li>' +
        '  <li>Built my first web application</li>' +
        '</ul>'));

    this.markerDataMap['capitalone'] = new MarkerData('capitalone', 'top: 161px; left: 433px;', 
      new CardData('Capital One', 'First step into a full-time career', 
        '<p><b>Senior Software Engineer (2019-Present)</b><p>' +
        '<ul>' +
        '<li>Re-Imagining Digital Marketing v2</li>' +
        '</ul>' +
        '<p><b>Software Engineer (2017-2019)</b><p>' +
        '<ul>' +
        '<li>Re-Imagining Digital Marketing v1</li>' +
        '<li>Patent-pending on display ad server</li>' +
        '<li>Handwriting robot</li>' +
        '</ul>' +
        '<p><b>Associate Software Engineer (2016-2017)</b><p>' +
        '<ul>' +
        '<li>Developed web app and API to capture customer feedback</li>' +
        '<li>Worked on open-source project, "Zeppelin", from Apache</li>' +
        '</ul>'));

    this.currentMarker = this.markerDataMap['default'];
  }

  public goToMarker(markerId: string) {
    console.log(`clicked on markerId=${markerId}, markerData=`, this.markerDataMap[markerId]);
    this.currentMarker = this.markerDataMap[markerId];
  }

  public updateCard(offset: number) {
    console.log(`update card by ${offset}`);
    const currentIndex = Object.keys(this.markerDataMap).indexOf(this.currentMarker.markerId);
    const newIndex = currentIndex + offset;
    this.goToMarker(Object.keys(this.markerDataMap)[newIndex]);
  }

}
</script>

<style scoped lang="scss">

  .points {
    position: absolute;
  }

  .md-card {
    max-height: 335px;
  }

  .md-card-content {
    min-height: 200px;
    max-height: 200px;
    overflow-y: scroll;
  }

  .md-disabled {
    opacity: 0.54;
  }

.map-marker-wrapper {
  width: 562px;
  height: 335px;
  margin: auto;
  display: block;
  position: relative;
}

</style>
