<template>
  <div>
    <div class="play-video-page">
      <div class="player">
        <player
          :id="videoId"
          :nextId="nextVideoId"
          :actions="actions"
          :miniPlayerMode="miniPlayerMode"
        > </player>
      </div>
      <div class="candidate-videos">
        <div class="next-video">
          <div>Up Next</div>
          <thumbnail
            v-if="nextVideo"
            :item="nextVideo"
            :miniPlayerMode="miniPlayerMode"
          ></thumbnail>
        </div>
        <video-list :items="relatedVideos"></video-list>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Player from './Player.vue';
import { State } from '../store';
import VideoList from './VideoList.vue';
import Thumbnail from './Thumbnail.vue';
import { Getters } from '../store/getters';
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  components: { Player, VideoList, Thumbnail },
})
export default class PlayVideoPage extends Vue {
  @Prop({ type: Object, required: true})
  actions: any;

  @Prop({ type: Object, required: true })
  state: State;

  @Prop({ type: String, required: true })
  id: string;

  @Prop({ type: Object, required: true })
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

  get miniPlayerMode() {
    return this.state.miniPlayerMode;
  }
}
</script>
<style scoped>
.candidate-videos {
  overflow-y: scroll;
  height: calc(100vh - 100vw * 0.56 - 40px);
}

.next-video {
  margin: 0 16px;
  padding: 16px 0;
  border-bottom: 1px solid #bbb;
}


@media (min-width: 640px) {
  .play-video-page {
    display: flex;
    flex-direction: row;
  }
  .player {
    flex: 0.75;
  }
  .candidate-videos {
    flex: 0.25;
    height: calc(100vh - 40px);
  }
}
</style>

<style>
.play-video-page #player {
  width: 100vw;
  height: calc(100vw * 0.56);
}

@media (min-width: 640px) {
  .play-video-page #player {
    width: 75vw;
    height: calc(100vh - 40px);
  }
}
</style>
