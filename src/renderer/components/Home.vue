<template>
  <div class="video-list">
    <video-list
      :actions="actions"
      :items="state.items"
      :miniPlayerMode="miniPlayerMode"
      :searchText="searchText"
      :prevPageToken="prevPageToken"
      :nextPageToken="nextPageToken"
    ></video-list>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import VideoList from "./VideoList.vue";
import { State } from '../store';
import { actions } from '../store/actions';

@Component({
  components: {
    "video-list": VideoList
  }
})
export default class Home extends Vue {
  @Prop({ type: Object, required: true })
  actions: typeof actions;
  @Prop({ type: Object, required: true })
  state: State;

  get searchText() {
    return this.state.searchText;
  }

  get prevPageToken() {
    return this.state.prevPageToken;
  }

  get nextPageToken() {
    return this.state.nextPageToken;
  }

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
