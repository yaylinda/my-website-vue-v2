<template>

    <div @click="cardClicked">
        <md-badge class="md-primary md-square" :md-content="card.clicked ? `MIGHT: ${card.might}` : card.might">
            <md-avatar :class="card.clicked ? 'md-avatar-icon md-large' : 'md-avatar-icon'">
                <md-icon v-if="card.type === 'TROOP'"><i class="fa fa-users" :class="determineClass()"></i></md-icon>
                <md-icon v-else-if="card.type === 'DEFENSE'"><i class="fa fa-shield" :class="determineClass()"></i></md-icon>
                <md-icon v-else><i class="fa fa-th" :class="determineClass()"></i></md-icon>
                <md-tooltip md-direction="top">{{card.type}} | {{card.movementDirection}}
                </md-tooltip>
            </md-avatar>
            <md-badge v-if="!isOnBoard" class="md-accent md-square" md-position="bottom" :md-content="card.clicked ? `COST: ${card.cost}` : card.cost"/>
        </md-badge>
    </div>
    
</template>

<script lang="ts">
    import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
    import { Card } from '../models/simple-war';

    @Component({
        components: {},
    })
    export default class CardComponent extends Vue {
        @Prop() public card!: Card;
        @Prop() public isOnBoard!: boolean;
        @Prop() public username!: string;

        cardClicked() {
            console.log('card clicked');
            this.card.might += 1;
            this.card.might -=1;
            this.card.clicked = !this.card.clicked;
        }

        determineClass() {
            if (this.isOnBoard) {
                if (this.card.owner === this.username) {
                    return 'my-card';
                } else {
                    return 'opponent-card';
                }
            } else {
                return '';
            }
        }
    }
</script>

<style scoped lang="scss">
    .my-card {
        color: greenyellow;
    }
    .opponent-card {
        color: pink;
    }
</style>