import Vue from 'vue';
import VueRouter from 'vue-router';
import Root from './containers/RootContainer.vue';
import Home from './containers/HomeContainer.vue';
import PlayVideo from './containers/PlayVideoContainer.vue';
import miniPlayer from './containers/miniPlayerContainer.vue';
import store from './store/index';
import { inject } from 'battle-ax'

Vue.use(VueRouter);

const routes = [
  { path: '/', component: inject(Root, store),
    children: [
      { path: '/mini-player/:id?', name: 'miniPlayer', component: inject(miniPlayer, store) },
      { path: '/', name: 'home', component: inject(Home, store) },
      { path: '/:id', name: 'player', component: inject(PlayVideo, store) },
    ]
  },
];

export default new VueRouter({ routes });
