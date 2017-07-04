<template>
  <div>
    <toolbar-header :actions="actions"></toolbar-header>
    <div class="page">
      <player :id="videoId"></player>
      <video-list :items="relatedVideos"></video-list>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component'
import Header from './Header.vue';
import Player from './Player.vue';
import { State } from '../store';
import VideoList from './VideoList.vue';

@Component({
  components: {
    "toolbar-header": Header,
    "player": Player,
    "video-list": VideoList
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

  get relatedVideos() {
    return this.state.relatedVideos;
  }
}
</script>
<style scoped>
 .page {
   overflow-y: scroll;
   max-height: calc(100vh - 48px);
 }
</style>
