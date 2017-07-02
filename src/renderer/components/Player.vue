<template>
   <div id="player"></div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from 'vue-class-component'
import YoutubePlayer from 'youtube-player';
import { FullItem } from '../types/Item';

@Component({
  props: {
    id: { type: String, required: true }
  }
 })
export default class Player extends Vue {
  id: string;
  player: any;
  mounted() {
    this.player = YoutubePlayer('player', { videoId: this.id });
  }
}
</script>

<style>
  #player {
    width: 100vw;
    height: calc(100vw * 0.56);
  }
</style>
