<template>
  <div>
    <toolbar-header :actions="actions"></toolbar-header>
    <div class="page">
      <div class="video-list">
        <video-list :items="state.items"></video-list>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from 'vue-class-component'
import Header from "./Header.vue";
import VideoList from "./VideoList.vue";

@Component({
  components: {
    "toolbar-header": Header,
    "video-list": VideoList
  },
  props: {
    actions: Object,
    state: Object
  }
})
export default class Home extends Vue {
}
</script>
<style scoped>
 .page {
   max-height: calc(100vh - 48px);
 }
 .video-list {
   overflow-y: scroll;
   max-height: calc(100vh - 48px);
 }
</style>
