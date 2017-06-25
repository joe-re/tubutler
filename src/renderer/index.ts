import Vue from "vue";
import Home from "./containers/HomeContainer.vue";
import store from "./store";

let v = new Vue({
  el: "#app",
  data: { name: "World" },
  render: h => h(Home)
});
