<template>
  <md-dialog>
          <md-dialog-title>Advanced Configurations</md-dialog-title>
          <md-dialog-content>
            <md-field>
              <label>Troop Drop Rate</label>
              <md-input
                v-model="advancedGameConfigs.dropRates.TROOP"
                placeholder="Default: 0.5"
                type="number"
                required
              ></md-input>
            </md-field>
            <md-field>
              <label>Defense Drop Rate</label>
              <md-input
                v-model="advancedGameConfigs.dropRates.DEFENSE"
                placeholder="Default: 0.3"
                type="number"
                required
              ></md-input>
            </md-field>
            <md-field>
              <label>Wall Drop Rate</label>
              <md-input
                v-model="advancedGameConfigs.dropRates.WALL"
                placeholder="Default: 0.2"
                type="number"
                required
              ></md-input>
            </md-field>
            <md-field>
              <label>Maximum Cards per Cell</label>
              <md-input
                v-model="advancedGameConfigs.maxCardsPerCell"
                placeholder="Default: 1"
                type="number"
                required
              ></md-input>
            </md-field>
          </md-dialog-content>
          <md-dialog-actions>
            <md-button class="md-primary" @click="cancelAdvancedConfig">Cancel</md-button>
            <md-button class="md-primary" @click="confirmAdvancedConfig">Confirm</md-button>
          </md-dialog-actions>
        </md-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { GameConfiguration } from '../models/simple-war';

@Component
export default class AdvGameConfigComponent extends Vue {
    
    @Prop() host!: string;
    private advancedGameConfigs!: GameConfiguration;

    mounted() {
      console.log('GET advancedGameConfigs');
      this.$http.get(`${this.host}/games/default-configs`).then(
          result => {
            if (result.ok && result.data) {
              console.log('successfully got advancedGameConfigs');
              this.advancedGameConfigs = result.data;
              this.advancedGameConfigs.isAdvanced = true;
            } else {
              throw new Error(JSON.stringify(result));
            }
          },
          error => {
            console.log(error);
            this.$emit('showError', error.body.message)
          }
        );
    }

    cancelAdvancedConfig() {
      this.$emit('cancelAdvancedConfig');
    }

    confirmAdvancedConfig() {
      console.log(`emitting 'confirmAdvancedConfig', with value: ${this.advancedGameConfigs}`)
      this.$emit('confirmAdvancedConfig', this.advancedGameConfigs);
    }


}
</script>

<style scoped lang="scss">

</style>