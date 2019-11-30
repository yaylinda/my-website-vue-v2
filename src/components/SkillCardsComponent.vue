<template>
  <div class="md-layout">
    <md-card
      class="md-layout-item md-xsmall-size-100 md-small-size-100 md-medium-size-50 md-large-size-25"
    >
      <md-card-header>
        <md-avatar>
          <md-icon>
            <i class="fa fa-server"></i>
          </md-icon>
        </md-avatar>
        <div class="md-title">Backend Skills</div>
        <div class="md-subhead">Languages, Frameworks, etc.</div>
      </md-card-header>
      <md-card-content>
        <ul>
          <li>Java, Spring Framework, SpringBoot</li>
          <li>Python</li>
          <li>Relational databases: MemSQL, PostgreSQL</li>
          <li>Non-relational databases: Redis, MongoDB, ElastiCache</li>
          <li>Docker</li>
          <li>Kotlin (learning)</li>
          <li>Go (learning)</li>
        </ul>
      </md-card-content>
    </md-card>

    <md-card
      class="md-layout-item md-xsmall-size-100 md-small-size-100 md-medium-size-50 md-large-size-25"
    >
      <md-card-header>
        <md-avatar>
          <md-icon>
            <i class="fa fa-desktop"></i>
          </md-icon>
        </md-avatar>
        <div class="md-title">Frontend Skills</div>
        <div class="md-subhead">Languages, Frameworks, etc.</div>
      </md-card-header>
      <md-card-content>
        <ul>
          <li>JavaScript, TypeScript, HTML/CSS</li>
          <li>NodeJS</li>
          <li>Express, Restify</li>
          <li>Angular 7</li>
          <li>Vue 2</li>
          <li>Flutter, Dart (Learning)</li>
        </ul>
      </md-card-content>
    </md-card>

    <md-card
      class="md-layout-item md-xsmall-size-100 md-small-size-100 md-medium-size-50 md-large-size-25"
    >
      <md-card-header>
        <md-avatar>
          <md-icon>
            <i class="fa fa-database"></i>
          </md-icon>
        </md-avatar>
        <div class="md-title">Data Skills</div>
        <div class="md-subhead">Analysis and Visualizations</div>
      </md-card-header>
      <md-card-content>
        <ul>
          <li>R</li>
          <li>RStudio</li>
          <li>Python</li>
          <li>Julia (learning)</li>
        </ul>
      </md-card-content>
    </md-card>

    <md-card
      class="md-layout-item md-xsmall-size-100 md-small-size-100 md-medium-size-50 md-large-size-25"
    >
      <md-card-header>
        <md-avatar>
          <md-icon>
            <i class="fa fa-cloud"></i>
          </md-icon>
        </md-avatar>
        <div class="md-title">Cloud Skills</div>
        <div class="md-subhead">Various AWS services</div>
      </md-card-header>
      <md-card-content>
        <ul>
          <li>EC2, Security Groups, Load Balancers, Target Groups</li>
          <li>S3</li>
          <li>ECS</li>
          <li>SQS</li>
          <li>Route 53</li>
          <li>Cloud Formation Templates</li>
        </ul>
      </md-card-content>
    </md-card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class SkillCardsComponent extends Vue {}
</script>

<style scoped lang="scss">
.fa {
  color: #ff4495;
}
</style>