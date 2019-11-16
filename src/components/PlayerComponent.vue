<template>
    <div class="md-size-100">

        <md-card class="my-profile-card">

            <md-card-header>
                <md-avatar>
                    <md-icon><i class="fa fa-user"></i></md-icon>
                </md-avatar>
                <div class="md-title">{{player.username}}</div>
                <div class="md-subtitle">
                    <span>
                        <i class="fa fa-gamepad pad-right"></i>{{player.numGames}}
                        <md-tooltip md-direction="bottom">Number of Games</md-tooltip>
                    </span>
                    <span>
                        <i class="fa fa-trophy pad-right"></i>{{player.numWins}}
                        <md-tooltip md-direction="bottom">Number of Wins</md-tooltip>
                    </span>
                </div>
            </md-card-header>

            <md-card-content>
                <md-chip><i class="fa fa-calendar-o pad-right"></i>{{getAgoTime(player.createdDate, player.currentTimestamp)}}<md-tooltip>Created</md-tooltip></md-chip>
                <md-chip><i class="fa fa-calendar-o pad-right"></i>{{getAgoTime(player.lastActiveDate, player.currentTimestamp)}}<md-tooltip>Last Active</md-tooltip></md-chip>
                <md-chip><i class="fa fa-play-circle-o pad-right"></i>{{player.lastActivity}}<md-tooltip>Last Activity</md-tooltip></md-chip>
            </md-card-content>
        </md-card>

    </div>
</template>

<script lang="ts">

    import { Component, Vue, Prop } from 'vue-property-decorator';
    import { Player } from '../models/simple-war';

    @Component({
        components: {}
    })
    export default class PlayerComponent extends Vue {
        @Prop() player!: Player;

        getAgoTime(dateStr: string, currentStr: string) {
            console.log('dateStr:', dateStr)
            console.log('currentStr:', currentStr)
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
    .my-profile-card {
      border-top: white 4px solid;
    }

    .pad-right {
        margin-right: 5px;
    }


</style>