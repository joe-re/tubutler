<template>
  <div>
    <toolbar-header :actions="actions"></toolbar-header>
    <div class="page">
      <player :id="videoId" :nextId="nextVideoId" :actions="actions"></player>
      <div class="next-video">
        <div>Up Next</div>
        <thumbnail v-if="nextVideo" :item="nextVideo"></thumbnail>
      </div>
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
import Thumbnail from './Thumbnail.vue';
import { Getters } from '../store/getters';

@Component({
  components: {
    "toolbar-header": Header,
    "player": Player,
    "video-list": VideoList,
    "thumbnail": Thumbnail
  },
  props: {
    actions: Object,
    state: Object,
    id: {
      type: String,
      required: true
    },
    getters: Object
  }
})
export default class PlayVideoPage extends Vue {
  state: State;
  id: string;
  getters: Getters;

  get videoId() {
    return this.id;
  }

  get nextVideo() {
    return this.getters.nextVideo;
  }

  get nextVideoId() {
    return this.getters.nextVideoId;
  }

  get relatedVideos() {
    return this.getters.relatedVideos;
  }
}
</script>
<style scoped>
 .page {
   overflow-y: scroll;
   max-height: calc(100vh - 48px);
 }
 .next-video {
   margin: 0 16px;
   padding: 16px 0;
   border-bottom: 1px solid #bbb;
 }
</style>
