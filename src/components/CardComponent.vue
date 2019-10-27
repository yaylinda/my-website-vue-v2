<template>

    <md-badge class="md-primary md-square" :md-content="card.might">
        <md-avatar class="md-avatar-icon md-large">
            <md-icon v-if="card.type === 'TROOP'"><i class="fa fa-users"></i></md-icon>
            <md-icon v-else-if="card.type === 'DEFENSE'"><i class="fa fa-shield"></i></md-icon>
            <md-icon v-else><i class="fa fa-th"></i></md-icon>
        </md-avatar> 
    </md-badge>
    
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import { Card } from '../models/simple-war';

    @Component({
        components: {},
        })
    export default class CardComponent extends Vue {
        @Prop() private card!: Card;
    }
</script>

<style scoped lang="scss">

</style>