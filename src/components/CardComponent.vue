<template>

    <div @click="cardClicked">
        <md-badge class="md-primary md-square" :md-content="card.clicked ? `MIGHT: ${card.might}` : card.might">
            <md-avatar :class="card.clicked ? 'md-avatar-icon md-large' : 'md-avatar-icon'">
                <md-icon v-if="card.type === 'TROOP'"><i class="fa fa-users"></i></md-icon>
                <md-icon v-else-if="card.type === 'DEFENSE'"><i class="fa fa-shield"></i></md-icon>
                <md-icon v-else><i class="fa fa-th"></i></md-icon>
            </md-avatar>
            <md-badge class="md-accent md-square" md-position="bottom" :md-content="card.clicked ? `COST: ${card.cost}` : card.cost"/>
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

        cardClicked() {
            console.log('card clicked');
            this.$emit('cardClickedEvent');
        }
    }
</script>

<style scoped lang="scss">

</style>