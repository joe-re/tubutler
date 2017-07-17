import Vue from 'vue';
import VueRouter from 'vue-router';
import Root from './containers/RootContainer.vue';
import Home from './containers/HomeContainer.vue';
import PlayVideo from './containers/PlayVideoContainer.vue';
import store from './store/index';
import inject from './containers/inject';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: inject(Root, store),
    children: [
      { path: '/', component: inject(Home, store) },
      { path: '/:id', component: inject(PlayVideo, store) }
    ]
  }
];

export default new VueRouter({ routes });
