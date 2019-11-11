<template>

    <div @click="cardClicked">

        <md-badge v-if="this.card.owner === this.username" class="md-square md-primary" :md-content="card.might">
            <md-avatar :class="[determineClass(), isSmall ? 'md-small' : '']">
                <md-icon v-if="card.type === 'TROOP'"><i class="fa fa-users" :class="determineClass()"></i></md-icon>
                <md-icon v-else-if="card.type === 'DEFENSE'"><i class="fa fa-shield" :class="determineClass()"></i></md-icon>
                <md-icon v-else><i class="fa fa-th" :class="determineClass()"></i></md-icon>
                <md-tooltip md-direction="bottom">{{card.type}}</md-tooltip>
            </md-avatar>
            <md-badge v-if="!isOnBoard" class="md-accent md-square" md-position="bottom" :md-content="card.cost"/>
        </md-badge>

        <md-badge v-else class="md-square md-accent" :md-content="card.might">
            <md-avatar :class="[determineClass(), isSmall ? 'md-small' : '']">
                <md-icon v-if="card.type === 'TROOP'"><i class="fa fa-users" :class="determineClass()"></i></md-icon>
                <md-icon v-else-if="card.type === 'DEFENSE'"><i class="fa fa-shield" :class="determineClass()"></i></md-icon>
                <md-icon v-else><i class="fa fa-th" :class="determineClass()"></i></md-icon>
                <md-tooltip md-direction="bottom">{{card.type}}</md-tooltip>
            </md-avatar>
            <md-badge v-if="!isOnBoard" class="md-accent md-square" md-position="bottom" :md-content="card.cost"/>
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
        @Prop() public isSmall!: boolean;

        cardClicked() {
            this.$emit('cardClickedEvent');
        }

        determineClass() {
            if (this.isOnBoard) {
                if (this.card.owner === this.username) {
                    return 'my-card';
                } else {
                    return 'opponent-card';
                }
            } else {
                if (this.card.clicked) {
                    return 'selected-card';
                } else {
                    '';
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .my-card {
        background: #50e3c2;
    }
    .opponent-card {
        background: #ff4495;
    }
    .selected-card {
        background: #50e3c2;
    }
    .fa {
        color: white;
    }
</style>