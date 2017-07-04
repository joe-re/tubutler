<template>
   <div id="player"></div>
</template>

<script lang="ts">
import YoutubePlayer from 'youtube-player';
import { FullItem } from '../types/Item';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

@Component
export default class Player extends Vue {
  @Prop({ type: String, required: true })
  id: string;

  player: any;

  @Watch('id')
  onChangeId(val: string, oldVal: string) {
    if (val !== oldVal) {
      this.player.loadVideoById(val);
    }
  }

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
