<template>
  <div class="video-list">
    <video-list
      :items="state.items"
      :miniPlayerMode="miniPlayerMode"
    ></video-list>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import VideoList from "./VideoList.vue";
import { State } from '../store';

@Component({
  components: {
    "video-list": VideoList
  }
})
export default class Home extends Vue {
  @Prop({ type: Object, required: true })
  actions: any;
  @Prop({ type: Object, required: true })
  state: State;

  get miniPlayerMode() {
    return this.state.miniPlayerMode;
  }
}
</script>
<style scoped>
 .video-list {
   overflow-y: scroll;
   max-height: calc(100vh - 48px);
 }
</style>
