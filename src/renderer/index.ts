import Vue from "vue";
import HelloComponent from "./components/Hello.vue";
import store from "./store";

let v = new Vue({
  el: "#app",
  store,
  template: `
    <div>
        Name: <input v-model="name" type="text">
        <hello-component :name="name" :initialEnthusiasm="5" />
    </div>
    `,
  data: { name: "World" },
  components: {
    HelloComponent
  }
});
