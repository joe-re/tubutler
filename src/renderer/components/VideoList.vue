<template>
   <div>
     <div
       v-for="item in items"
       :key="item.id"
     >
       <thumbnail class="thumbnail" :item="item" :mini-player-mode="miniPlayerMode"></thumbnail>
     </div>
     <div class="pagination-container">
       <button class="pagination btn btn-default" v-if="prevPageToken" v-on:click="prevPage">prev</button>
       <button class="pagination btn btn-default" v-if="nextPageToken" v-on:click="nextPage">next</button>
     </div>
   </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { actions } from '../store/actions';
import { FullItem } from '../types/Item';
import Thumbnail from './Thumbnail.vue';

@Component({
  props: {
    items: Array,
    searchText: String,
    prevPageToken: String,
    nextPageToken: String,
    actions: Object
  },
  components: {
    "thumbnail": Thumbnail
  }
})
export default class SearchInput extends Vue {
  @Prop({ type: Object })
  actions: typeof actions;
  @Prop({ type: Boolean })
  miniPlayerMode: boolean;
  @Prop({ type: Array, required: true})
  items: FullItem[];

  @Prop({ type: String })
  searchText: string;
  @Prop({ type: String })
  prevPageToken: string;
  @Prop({ type: String })
  nextPageToken: string;

  prevPage() {
    this.actions.search({ q: this.searchText, pageToken: this.prevPageToken });
  }

  nextPage() {
    this.actions.search({ q: this.searchText, pageToken: this.nextPageToken });
  }
}
</script>

<style scoped>
  .thumbnail {
    padding: 16px;
  }
  .pagination-container {
    text-align: center;
  }
  .pagination {
    margin: 4px;
  }
</style>

