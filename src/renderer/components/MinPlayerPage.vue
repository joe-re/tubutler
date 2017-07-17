<template>
  <div class="min-player-page" @mouseover="mouseOver" @mouseout="mouseOut">
    <toolbar-header
       class="header" ref="header" v-if="isEnableHeader" :actions="actions"></toolbar-header>
    <player :id="id" :nextId="nextVideoId" :actions="actions"></player>
  </div>
</template>

<script lang="ts">
import Player from './Player.vue';
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Getters } from '../store/getters';
import Header from "./Header.vue";

@Component({
  components: {
    player: Player,
    'toolbar-header': Header
  }
})
export default class MinPlayPage extends Vue {
  @Prop({ type: Object, required: true })
  actions: Object;

  @Prop({ type: Object, required: true })
  getters: Getters;

  @Prop({ type: String })
  id?: string;

  isEnableHeader = false;

  mouseOver() {
    this.isEnableHeader = true;
  }

  mouseOut() {
    this.isEnableHeader = false;
  }

  get nextVideoId() {
    return this.getters.nextVideoId;
  }
}
</script>

<style>
.min-player-page #player {
  width: 100vw;
  height: 100vh;
}
</style>
<style scoped>
.header {
  position: absolute;
  width: 100vw;
}
</style>
