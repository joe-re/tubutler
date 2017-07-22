<template>
  <mini-player :id="id" :actions="actions" :state="state" :getters="getters"></mini-player>
</template>

<script lang="ts">
import miniPlayer from '../components/miniPlayerPage.vue'
import { Component, Vue, Prop } from 'vue-property-decorator'
import { actions } from '../store/actions';
import { remote } from 'electron';

@Component({
  components: { miniPlayer }
})
export default class miniPlayerContainer extends Vue {
  @Prop({ type: Object, required: true })
  actions: typeof actions;

  @Prop({ type: Object, required: true })
  state: any;

  @Prop({ type: Object, required: true })
  getters: any;

  mounted() {
    if (this.id) {
      this.actions.fetchRelatedVideos({ videoId: this.id });
    }
    const player = this.$el.querySelector('#player');
    if (player) {
      remote.getCurrentWindow().setSize(Math.max(player.clientWidth, 700), Math.max(player.clientHeight, 392));
    }
  }

  get id() {
    return this.$route.params.id;
  }
}
</script>
