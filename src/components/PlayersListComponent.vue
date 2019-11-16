<template>
  <div
    class="players-list-component md-xsmall-size-100 md-small-size-100 md-medium-size-100 md-large-size-100 md-xlarge-size-100"
  >
    <md-card class="players-list-card">
      <md-card-header>
        <md-avatar>
          <md-icon>
            <i class="fa fa-star-half-o"></i>
          </md-icon>
        </md-avatar>
        <div class="md-title">{{title}}</div>
        <div class="md-subtitle">{{subtitle}}</div>
      </md-card-header>

      <md-card-content class="outer-card-content md-layout md-alignment-top-center md-gutter">
        <md-empty-state
          v-if="players.length === 0"
          md-icon="phonelink"
          :md-label="emptyTitle"
          :md-description="emptySubtitle"
        ></md-empty-state>

        <div
          v-for="(p, index) in players"
          :key="(p, index)"
          class="md-layout-item md-xsmall-size-100 md-small-size-100 md-medium-size-50 md-large-size-50 md-xlarge-size-50"
        >
          <md-card class="one-player-card">
            <md-card-header>
              <md-avatar>
                <md-icon>
                  <i class="fa fa-user"></i>
                </md-icon>
              </md-avatar>
              <div class="md-title">{{p.username}}</div>
              <div class="md-subtitle">
                <span>
                  <i class="fa fa-gamepad pad-right"></i>
                  {{p.numGames}}
                  <md-tooltip md-direction="bottom">Number of Games</md-tooltip>
                </span>
                <span>
                  <i class="fa fa-trophy pad-right"></i>
                  {{p.numWins}}
                  <md-tooltip md-direction="bottom">Number of Wins</md-tooltip>
                </span>
              </div>
            </md-card-header>

            <md-card-content>
              <md-chip>
                <i class="fa fa-calendar-o pad-right"></i>
                {{getAgoTime(p.lastActiveDate, p.currentTimestamp)}}
                <md-tooltip>Last Active</md-tooltip>
              </md-chip>
              <md-chip>
                <i class="fa fa-play-circle-o pad-right"></i>
                {{p.lastActivity}}
                <md-tooltip>Last Activity</md-tooltip>
              </md-chip>
              <md-chip>
                <i class="fa fa-calendar-o pad-right"></i>
                {{getAgoTime(p.createdDate, p.currentTimestamp)}}
                <md-tooltip>Created</md-tooltip>
              </md-chip>
            </md-card-content>
          </md-card>
        </div>
      </md-card-content>
    </md-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Player } from "../models/simple-war";

@Component({
  components: {}
})
export default class PlayersListComponent extends Vue {
    @Prop() private players!: Player[];
    @Prop() private title!: string;
    @Prop() private subtitle!: string;
    @Prop() private emptyTitle!: string;
    @Prop() private emptySubtitle!: string;

    getAgoTime(dateStr: string, currentStr: string) {
        const now = new Date(Date.parse(currentStr.replace(' ', 'T'))).getTime(); 
        const then = new Date(Date.parse(dateStr.replace(' ', 'T'))).getTime();
        const difference = (now as any) - then;

        const minutes = difference / (1000 * 60);
        if (minutes < 60) {
          return Math.floor(minutes) + 'm';
        }

        const hours = difference / (1000 * 60 * 60);
        if (hours < 24) {
          return Math.floor(hours) + 'h';
        }

        const days = difference / (1000 * 60 * 60 * 24);
        if (days < 7) {
          return Math.floor(days) + 'd';
        }

        const weeks = difference / (1000 * 60 * 60 * 24 * 7);
        if (weeks < 5) {
          return Math.floor(weeks) + 'w';
        }

        const months = difference / (1000 * 60 * 60 * 24 * 30);
        if (months < 12) {
          return Math.floor(months) + 'mon';
        }

        const years = difference / (1000 * 60 * 60 * 24 * 365);
        return Math.floor(years) + 'yr';
      }
}
</script>

<style lang="scss" scoped>
.outer-card-content {
  overflow-y: scroll;
}

.players-list-card {
  border-top: white 4px solid;
}

.card-section-actions {
  justify-content: center !important;
}

.one-player-card {
  border-radius: 10px;
  border: white 1px solid;
  margin-top: 10px;

  .md-title {
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
  }
}

.md-chip {
  margin-bottom: 5px;
  cursor: pointer;
  .pad-right {
    margin-right: 5px;
  }
}

.fa-star-half-o {
    color: gold;
}

.fa-user {
    color: #50e3c2;
}

.fa-gamepad {
      color: lightgreen;
    }

.fa-trophy {
    color: gold;
}

.fa-calendar-o {
    color: #ff6961;
}

.fa-play-circle-o {
    color: #ff6961;
}


</style>