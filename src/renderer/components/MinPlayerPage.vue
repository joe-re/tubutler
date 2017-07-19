<template>
  <div class="min-player-page" @mouseover="mouseOver" @mouseout="mouseOut">
    <toolbar-header
       class="header" ref="header" v-if="isEnableHeader" :actions="actions"></toolbar-header>
    <div class="shortcuts" v-if="isShowShortcuts">
      command + f : show/hide search bar
    </div>
    <player :id="id" :nextId="nextVideoId" :actions="actions"></player>
  </div>
</template>

<script lang="ts">
import Player from './Player.vue';
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Getters } from '../store/getters';
import Header from './Header.vue';
import Mousetrap from 'mousetrap';
import 'mousetrap/plugins/global-bind/mousetrap-global-bind';

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
.shortcuts {
  position: absolute;
  color: white;
  background-color: #333;
  padding: 16px;
  right: 16px;
  top: 60px;
  border-radius: 6px;
}
</style>
