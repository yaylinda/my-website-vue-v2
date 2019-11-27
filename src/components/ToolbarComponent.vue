<template>
<md-toolbar>

      <div v-if="!isAuthenticated">
        <md-button @click="doLogin">Login</md-button>
        <md-button @click="doRegister">Register</md-button>
        <md-button @click="doGuest">Guest</md-button>
        <md-button @click="doOverview">Overview</md-button>
      </div>

      <div v-if="isAuthenticated" class="md-title" style="flex: 1"></div>

      <div v-if="isAuthenticated">
        <md-button v-if="showGameBoard" @click="goToGamesList" class="md-icon-button">
          <md-icon>
            <i class="fa fa-arrow-left"></i>
          </md-icon>
          <md-tooltip>Back to Games List</md-tooltip>
        </md-button>

        <md-button v-if="showGameBoard" @click="nextActiveGame" class="md-icon-button">
          <md-icon>
            <i class="fa fa-arrow-right"></i>
          </md-icon>
          <md-tooltip>Next Active Game</md-tooltip>
        </md-button>

        <md-button v-if="showGamesList" @click="newAiGame" class="md-icon-button">
          <md-icon>
            <i class="fa fa-android"></i>
          </md-icon>
          <md-tooltip>{{'New AI Game'}}</md-tooltip>
        </md-button>

        <md-button v-if="showGamesList || showMyProfile" @click="addNew" class="md-icon-button">
          <md-icon>
            <i class="fa fa-plus"></i>
          </md-icon>
          <md-tooltip>{{showGamesList ? 'New 2-Player Game' : 'Add Friend'}}</md-tooltip>
        </md-button>

        <md-button @click="refresh" class="md-icon-button">
          <md-icon>
            <i class="fa fa-refresh"></i>
          </md-icon>
          <md-tooltip>Refresh</md-tooltip>
        </md-button>

        <md-menu md-direction="bottom-end">
          <md-button md-menu-trigger>
            <md-icon>
              <i class="fa fa-bars"></i>
            </md-icon>
          </md-button>

          <md-menu-content>
            <md-menu-item v-if="!showGamesList" @click="goToGamesList">My Games</md-menu-item>
            <md-menu-item v-if="!showMyProfile" @click="goToMyProfile">My Profile</md-menu-item>
            <md-menu-item @click="logout">Log Out</md-menu-item>
          </md-menu-content>

        </md-menu>
      </div>
    </md-toolbar>
    
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ToolbarComponent extends Vue {
    
    // TODO - not currently used. will do later

}
</script>

<style scoped lang="scss">

</style>