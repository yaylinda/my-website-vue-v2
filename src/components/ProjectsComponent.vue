<template>
    <div>
        <md-card md-with-hover>

            <md-card-header>
                <md-avatar>
                    <md-icon><i class="fa fa-th"></i></md-icon>
                </md-avatar>
                <div class="md-title">Simple War</div>
                <div class="md-subhead">Online, real-time, turn-based, strategic board game</div>
            </md-card-header>

            <md-card-expand>
                <md-card-expand-trigger>
                    <md-button>Learn more</md-button>
                </md-card-expand-trigger>

                <md-card-expand-content>
                    <md-card-content>
                        <p>
                            Simple War is a two-player correspondance game. Players can find matches in the lobby of the game. Once a game
                            has started,
                            players take turns placing cards on a 5x5 board. Cards can either be a defensive Wall, or an offensive Troop.
                            Walls
                            are stationary and will defend a lane with their higher defensive stat. Troops advance forward one square per
                            turn, obliterating
                            any of the opponents' Walls or Troops in the way. Combine Troops on the battlefield for increased offensive
                            strength.
                        </p>
                        <p>
                            Points are scored when a Troop moves all the way across the board, to the opponent's side. 
                            The first player to score 10 points wins.
                        </p>
                        <p>
                            The <a class="github-links" href="https://github.com/yaylinda/generic-backend" target="_blank">backend API</a> and "game-engine" logic layer was written in Java, SpringBoot 2.0. Data for the game states
                            and user data are stored using MongoDB.
                        </p>
                        <p>There are two versions of the client:</p>
                        <ul>
                            <li>
                                <a class="github-links" href="https://github.com/yaylinda/generic-frontend" target="_blank">Web-Client</a> -
                                Originally Angular 4, but recently upgraded to Angular 7
                            </li>
                            <li>
                                <a class="github-links" href="https://github.com/yaylinda/simple_war_client" target="_blank">Mobile-Client</a> -
                                Took advantage of the Flutter Framework to write a single codebase for both Andoid and iPhone. Good opportunity to learn Flutter and Dart.
                            </li>
                        </ul>
                    </md-card-content>
                </md-card-expand-content>
            </md-card-expand>
        </md-card>

        <md-card md-with-hover>
            <md-card-header>
                <md-avatar>
                    <md-icon><i class="fa fa-gamepad"></i></md-icon>
                </md-avatar>
                <div class="md-title">Poporopo</div>
                <div class="md-subhead">Term Project for Advanced Computer Game Design</div>
            </md-card-header>

            <md-card-expand>

                <md-card-expand-trigger>
                    <md-button>Learn more</md-button>
                </md-card-expand-trigger>

                <md-card-expand-content>
                    <md-card-content>
                        <p>
                            A competitive, real-time, cross-platform game combining the simple game mechanics of Doodle Jump, with the
                            multi-player competitive racing nature of Mario Kart. Race your friends to the top by finding the best
                            path up. Or, be lucky enough to encounter useful items.
                        </p>
                        <p>
                            Supports game sizes of one to four. Different maps have different terrains to race on. Try to find the best
                            route!
                        </p>
                    </md-card-content>
                </md-card-expand-content>

            </md-card-expand>
        </md-card>

        <md-card md-with-hover class="md-layout-item">
            <md-card-header>
                <md-avatar>
                    <md-icon><i class="fa fa-heartbeat"></i></md-icon>
                </md-avatar>
                <div class="md-title">Decoding Electrocorticographic Readings (Brain Data)</div>
                <div class="md-subhead">Undergraduate Thesis for Statistics Major</div>
            </md-card-header>

            <md-card-expand>

                <md-card-expand-trigger>
                    <md-button>Learn more</md-button>
                </md-card-expand-trigger>

                <md-card-expand-content>
                    <md-card-content>
                        <p>
                            Electrocorticographic readings were taken along 96 frequencies for 70 different nodes on the brain in response
                            to clear and noisy audio-visual stimulus of a woman saying ’rock’ and ’rain’. The project goal is to produce
                            interpretable models that determines the stimulus based on these readings. Multiple dimensionality reduction
                            methods were tried with an emphasis on partial least squares variants. The data was then projected into a
                            lower dimension where classification methods were used to predict the stimulus. Overall, higher-order sparse
                            partial least squares with linear discriminant analysis was found to be the best combination for accurately
                            determining the stimulus. A sparse model-stacking of these models produced a more accurate, but less
                            interpretable model.

                            <a href="../../assets/ecog.pdf" target="_blank">See write-up.</a>
                        </p>
                    </md-card-content>
                </md-card-expand-content>
                
            </md-card-expand>
        </md-card>

        <md-card md-with-hover class="md-layout-item">
            <md-card-header>
                <md-avatar>
                    <md-icon><i class="fa fa-bar-chart"></i></md-icon>
                </md-avatar>    
                <div class="md-title">Data Visualizations</div>
                <div class="md-subhead">Various Data Visualizations</div>
            </md-card-header>
            <md-card-expand>

                <md-card-expand-trigger>
                    <md-button>Learn more</md-button>
                </md-card-expand-trigger>

                <md-card-expand-content>
                    <md-card-content>
                        <p>See "Data Visualizations" tab.</p>
                    </md-card-content>
                </md-card-expand-content>
            </md-card-expand>
        </md-card>

    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ProjectsComponent extends Vue {

}
</script>

<style scoped lang="scss">

    .md-card-expand-trigger {
        right: 0px;

    }
</style>