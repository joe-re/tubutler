<template>
  <div>
    <toolbar-header :actions="actions"></toolbar-header>
    <div class="page">
      <player :id="videoId"></player>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from 'vue-class-component'
import Header from "./Header.vue";
import Player from "./Player.vue";
import { State } from "../store";

@Component({
  components: {
    "toolbar-header": Header,
    "player": Player
  },
  props: {
    actions: Object,
    state: Object,
    id: {
      type: String,
      required: true
    }
  }
})
export default class PlayVideoPage extends Vue {
  state: State;
  id: string;

  get videoId() {
    return this.id;
  }
}
</script>
<style scoped>
 .page {
   overflow-y: scroll;
   max-height: calc(100vh - 48px);
 }
</style>
