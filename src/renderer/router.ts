import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './containers/HomeContainer.vue';
import PlayVideo from './containers/PlayVideoContainer.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: Home },
  { path: '/:id', component: PlayVideo }
];

export default new VueRouter({ routes });

