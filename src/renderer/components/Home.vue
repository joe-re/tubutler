<template>
  <div class="video-list">
    <video-list
      :items="state.items"
      :minPlayerMode="minPlayerMode"
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

  get minPlayerMode() {
    return this.state.minPlayerMode;
  }
}
</script>
<style scoped>
 .video-list {
   overflow-y: scroll;
   max-height: calc(100vh - 48px);
 }
</style>
