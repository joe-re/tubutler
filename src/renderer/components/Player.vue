<template>
   <div id="player"></div>
</template>

<script lang="ts">
import YoutubePlayer from 'youtube-player';
import { FullItem } from '../types/Item';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { Actions } from '../containers/getActions';

@Component
export default class Player extends Vue {
  @Prop({ type: String, required: true })
  id: string;

  @Prop({ type: String })
  nextId?: string;

  @Prop({ type: Object, required: true })
  actions: Actions;

  player: any;

  @Watch('id')
  onChangeId(val: string, oldVal: string) {
    if (val !== oldVal) {
      this.play(val);
    }
  }

  mounted() {
    this.player = YoutubePlayer('player', { videoId: this.id, playerVars: { autoplay: 1, rel: 0 }});
    this.player.on('stateChange', (event: any) => {
      if (event.data === 0 && this.nextId) {
        this.play(this.nextId);
      }
    });
  }

  play(id: string) {
    this.player.loadVideoById(id);
    this.actions.fetchRelatedVideos({ videoId: id });
    this.actions.addHistory({ videoId: id });
  }
}
</script>

<style>
#player {
  width: 100vw;
  height: calc(100vw * 0.56);
}

@media (min-width: 640px) {
  #player {
    width: 75vw;
    height: calc(75vw * 0.56);
  }
}
</style>
