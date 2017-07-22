<template>
  <play-video-page :actions="actions" :state="state" :id="id" :getters="getters"></play-video-page>
</template>

<script lang="ts">
import Vue from "vue";
import Component from 'vue-class-component'
import SearchInput from "./SearchInput.vue";
import PlayVideoPage from '../components/PlayVideoPage.vue'
import store from '../store';
import VueRouter from 'vue-router';
import { actions } from '../store/actions';

@Component({
  components: { "play-video-page": PlayVideoPage },
  props: {
    actions: { type: Object, required: true },
    state: { type: Object, required: true },
    getters: { type: Object, required: true }
  }
})
export default class PlayVideoContainer extends Vue {
  actions: typeof actions;
  mounted() {
    this.actions.fetchRelatedVideos({ videoId: this.id });
  }
  get id() {
    return this.$route.params.id;
  }
}
</script>
