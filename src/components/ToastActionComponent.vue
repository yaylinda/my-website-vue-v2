<template>
    <div>
        HI!!!
        <!-- <div v-if="toastType === ToastType.END_TURN">
            <span>It is now your turn in Simple War against {{msgObj.username}}!</span>
            <button class="action" @click="goToGame(msgObj.gameId)">Go to Game</button>
        </div>

        <div v-if="toastType === ToastType.FRIEND_REQUEST_RECEIVED">
        </div>

        <div v-if="toastType === ToastType.FRIEND_REQUEST_RESPONSE">
        </div>

        <div v-if="toastType === ToastType.INVITED_TO_GAME">
        </div> -->
        
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { ToastType } from '../utils/constants';

@Component({})
export default class ToastActionComponent extends Vue {

    // @Prop() toastType!: ToastType;
    // @Prop() msgObj!: any;

    // mounted() {
    //     console.log('mounted ToastActionComponent');
    // }

    // goToGame(gameId: string) {
    //     console.log(`[ToastActionComponent] goToGame, gameId: ${gameId}`);
    // }

}

</script>

<style lang="scss" scoped>

</style>