<template>
  <div>
   <div id="player"></div>
   <input class="dummy" ref="dummy"/>
 </div>
</template>

<script lang="ts">
import YoutubePlayer from 'youtube-player';
import { FullItem } from '../types/Item';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { actions } from '../store/actions';

@Component
export default class Player extends Vue {
  @Prop({ type: String })
  id?: string;

  @Prop({ type: String })
  nextId?: string;

  @Prop({ type: Object, required: true })
  actions: typeof actions;

  player: any;

  @Watch('id')
  onChangeId(val: string, oldVal: string) {
    if (val !== oldVal) {
      this.play(val);
    }
  }

  mounted() {
    if (this.id) {
      this.player = YoutubePlayer('player', { videoId: this.id, playerVars: { autoplay: 1, rel: 0, fs: 0 }});
    } else {
      this.player = YoutubePlayer('player', { playerVars: { autoplay: 1, rel: 0, fs: 0 }});
    }
    this.player.on('stateChange', (event: any) => {
      if (event.data === 0 && this.nextId) {
        this.$router.push({ name: this.$route.name, params: { id: this.nextId } });
      }
    });
    this.player.on('ready', (hoge: any) => {
      const dom = document.querySelector('#player');
      if (dom && dom instanceof HTMLIFrameElement) {
        dom.contentDocument.addEventListener('keydown', () => {
          const dummy = this.$refs.dummy;
          if (dummy && dummy instanceof HTMLInputElement) {
            // be enable to parent document events
            dummy.focus();
          }
        });
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

<style scoped>
  .dummy {
    position: absolute;
    top: -100px;
    z-index: -1;
  }
</style>
