import Vue from "vue";
import Home from "./containers/HomeContainer.vue";
import router from './router';
import IPC from './ipc';

let v = new Vue({
  el: "#app",
  router,
  template: "<router-view></router-view>"
});

IPC.getInstance().listenStart();
