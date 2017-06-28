<template>
  <div class="page">
    <search-input :actions="actions"></search-input>
    <video-list :items="state.items"></video-list>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from 'vue-class-component'
import SearchInput from "./SearchInput.vue";
import VideoList from "./VideoList.vue";

@Component({
  components: {
    "search-input": SearchInput,
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
    margin: 20px;
  }
</style>
