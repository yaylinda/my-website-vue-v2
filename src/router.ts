import Vue from 'vue';
import Router from 'vue-router';
import HomeView from './views/HomeView.vue';
import DataVisualizationsView from './views/DataVisualizationsView.vue';
import SimpleWarView from './views/SimpleWarView.vue';
import PokemonTeamBuilder from './views/PokemonTeamBuilder.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/data-viz',
      name: 'data-viz',
      component: DataVisualizationsView,
    },
    {
      path: '/simple-war',
      name: 'simple-war',
      component: SimpleWarView,
    },
    {
      path: '/poke-team',
      name: 'poke-team',
      props: true,
      component: PokemonTeamBuilder,
    },
  ],
});
