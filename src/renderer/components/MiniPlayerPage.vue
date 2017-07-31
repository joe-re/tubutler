<template>
  <div class="mini-player-page" @mouseover="mouseOver" @mouseout="mouseOut">
    <toolbar-header
       class="header" ref="header" v-if="isEnableHeader" :actions="actions" :searchText="searchText" :miniPlayerMode="true"></toolbar-header>
    <transition name="fade">
      <div class="shortcuts" v-if="isShowShortcuts">
        command/ctrl + f : toggle search bar
      </div>
    </transition>
    <player :id="id" :nextId="nextVideoId" :actions="actions"></player>
  </div>
</template>

<script lang="ts">
import Player from './Player.vue';
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Getters } from '../store/getters';
import { State } from '../store';
import { actions } from '../store/actions';
import Header from './Header.vue';
import Mousetrap from 'mousetrap';
import 'mousetrap/plugins/global-bind/mousetrap-global-bind';

@Component({
  components: {
    player: Player,
    'toolbar-header': Header
  }
})
export default class miniPlayPage extends Vue {
  @Prop({ type: Object, required: true })
  actions: typeof actions;

  @Prop({ type: Object, required: true })
  state: State;

  @Prop({ type: Object, required: true })
  getters: Getters;

  @Prop({ type: String })
  id?: string;

  isEnableHeader = false;
  isShowShortcuts = false;

  mounted() {
    Mousetrap.bindGlobal('mod+f', () => this.toggleEnableHeader());
  }

  beforeDestroy() {
    Mousetrap.unbind('mod+f');
  }

  mouseOver() {
    this.isShowShortcuts = true;
  }

  mouseOut() {
    this.isShowShortcuts = false;
  }

  toggleEnableHeader() {
    this.isEnableHeader = !this.isEnableHeader;
  }

  get searchText() {
    return this.state.searchText;
  }

  get nextVideoId() {
    return this.getters.nextVideoId;
  }
}
</script>

<style>
.mini-player-page #player {
  width: 100vw;
  height: 100vh;
}
</style>
<style scoped>
.header {
}
.shortcuts {
  position: absolute;
  color: white;
  background-color: #333;
  padding: 16px;
  right: 16px;
  top: 60px;
  border-radius: 6px;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0
}
</style>
