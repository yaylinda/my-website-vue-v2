<template>
  <div
    class="requests-list-component md-xsmall-size-100 md-small-size-100 md-medium-size-100 md-large-size-100 md-xlarge-size-100"
  >
    <md-card class="requests-list-card">
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
          v-if="requests.length === 0"
          md-icon="phonelink"
          :md-label="emptyTitle"
          :md-description="emptySubtitle"
        ></md-empty-state>

        <div
          v-for="(r, index) in requests"
          :key="(r, index)"
          class="md-layout-item md-xsmall-size-100 md-small-size-100 md-medium-size-50 md-large-size-50 md-xlarge-size-50"
        >
          <md-card class="one-request-card">
            <md-card-header>
              <md-avatar>
                <md-icon>
                  <i v-if="r.status === 'REQUESTED'" class="fa fa-question"></i>
                  <i v-if="r.status === 'ACCEPTED'" class="fa fa-check"></i>
                  <i v-if="r.status === 'DECLINED'" class="fa fa-times"></i>
                </md-icon>
              </md-avatar>
              <div v-if="isIncoming" class="md-title">From: {{r.requester}}</div>
              <div v-else class="md-title">To: {{r.requestee}}</div>

              <div v-if="isIncoming" class="md-subtitle">{{r.requester}} wants to be your friend!</div>
              <div v-else class="md-subtitle">You want to be {{r.requestee}}'s friend!</div>
            </md-card-header>

            <md-card-content>
              <md-chip>
                <i class="fa fa-calendar-o pad-right"></i>
                {{getAgoTime(r.requestDate, r.currentTimestamp)}}
                <md-tooltip>Requested Date</md-tooltip>
              </md-chip>
              <md-chip>
                <i class="fa fa-calendar-o pad-right"></i>
                {{getAgoTime(r.responseDate, r.currentTimestamp)}}
                <md-tooltip>Response Date</md-tooltip>
              </md-chip>
              <md-chip v-if="isIncoming && r.status === 'REQUESTED'" @click="respondToRequest(r.id, true)">
                <i class="fa fa-check"></i>
                <md-tooltip>Accept</md-tooltip>
              </md-chip>
              <md-chip v-if="isIncoming && r.status === 'REQUESTED'" @click="respondToRequest(r.id, false)">
                <i class="fa fa-times"></i>
                <md-tooltip>Reject</md-tooltip>
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
import { FriendRequest } from "../models/simple-war";
import { getAgoTime } from "../utils/utilities";

@Component({
  components: {}
})
export default class RequestsListComponent extends Vue {
  @Prop() private requests!: FriendRequest[];
  @Prop() private title!: string;
  @Prop() private subtitle!: string;
  @Prop() private emptyTitle!: string;
  @Prop() private emptySubtitle!: string;
  @Prop() private isIncoming!: boolean;

  respondToRequest(requestId: string, response: boolean) {
    console.log(`respond to requestId=${requestId}: ${response}`);
    this.$emit('respondToFriendRequest', requestId, response);
  }

  getAgoTime(dateStr: string, currentStr: string) {
      return getAgoTime(dateStr, currentStr);
  }

}
</script>

<style lang="scss" scoped>
.outer-card-content {
  overflow-y: scroll;
}

.requests-list-card {
  border-top: white 4px solid;
}

.card-section-actions {
  justify-content: center !important;
}

.one-request-card {
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

.fa-times {
  color: #ff6961;
}

.fa-check {
  color: lightgreen;
}
</style>