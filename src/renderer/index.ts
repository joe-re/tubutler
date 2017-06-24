import Vue from "vue";
import Home from "./components/Home.vue";
import store from "./store";

let v = new Vue({
  el: "#app",
  store,
  data: { name: "World" },
  render: h => h(Home)
});
