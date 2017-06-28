<template>
  <div class="thumbnail">
    <div class="image">
      <img v-bind:src="src" width="300px"></img>
    </div>
    <div class="description">
      <span>{{title}}</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from 'vue-class-component'
import { Item } from '../types/Item';

@Component({
  props: {
    item: {
      type: Object,
      required: true
    }
  }
 })
export default class Thumbnail extends Vue {
  item: Item
  get title() {
    return this.item.snippet.title;
  }
  get src() {
    return this.item.snippet.thumbnails.high.url;
  }
}
</script>

<style scoped>
  .thumbnail {
    display: flex;
    padding: 16px;
  }
  img {
    width: 200px;
    margin-right: 16px;
  }
  .description {
  }
</style>
