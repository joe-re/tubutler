<template>
  <play-video-page :actions="actions" :state="state" :id="id"></play-video-page>
</template>

<script lang="ts">
import Vue from "vue";
import Component from 'vue-class-component'
import SearchInput from "./SearchInput.vue";
import PlayVideoPage from '../components/PlayVideoPage.vue'
import store from '../store';
import getActions from './getActions';
import { Route } from 'vue-router';

@Component({
  components: { "play-video-page": PlayVideoPage }
})
export default class PlayVideoContainer extends Vue {
  state = store.state;
  actions = getActions();
  $route: Route;
  mounted() {
    this.actions.fetchRelatedVideos({ videoId: this.id });
  }
  get id() {
    return this.$route.params.id;
  }
}
</script>
