<template>
  <router-link tag="div" :to="link">
    <div class="thumbnail">
      <div class="image">
        <img v-bind:src="src" width="300px"></img>
      </div>
      <div class="description">
        <div class="title">
          <span>{{title}}</span>
        </div>
        <div class="channel">
          <span>{{channel}}</span>
        </div>
        <div class="published-at">
          <span>{{publishedAt}} ago</span>
        </div>
        <div class="view-count">
          <span>{{viewCount}} views</span>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { FullItem } from '../types/Item';
import { State } from '../store';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';

@Component({ })
export default class Thumbnail extends Vue {
  @Prop({ type: Boolean })
  miniPlayerMode: boolean;
  @Prop({ type: Object, required: true})
  item: FullItem;

  get title() {
    return this.item.snippet.title;
  }
  get src() {
    return this.item.snippet.thumbnails.high.url;
  }
  get channel() {
    return this.item.snippet.channelTitle;
  }
  get viewCount() {
    return this.item.statistics.viewCount;
  }
  get publishedAt() {
    return distanceInWordsToNow(new Date(this.item.snippet.publishedAt));
  }
  get link() {
    if (this.miniPlayerMode) {
      return `/mini-player/${this.item.id.videoId}`;
    }
    return `/${this.item.id.videoId}`;
  }
}
</script>

<style scoped>
  .thumbnail {
    display: flex;
  }
  img {
    width: 100px;
    margin-right: 16px;
    cursor: pointer;
  }
  .title {
    color: #ddd;
  }
</style>
