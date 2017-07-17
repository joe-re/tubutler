<template>
   <div>
     <div
       v-for="item in items"
       :key="item.id"
     >
       <thumbnail class="thumbnail" :item="item" :min-player-mode="minPlayerMode"></thumbnail>
     </div>
   </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { FullItem } from '../types/Item';
import Thumbnail from './Thumbnail.vue';

@Component({
  props: {
    items: Array
  },
  components: {
    "thumbnail": Thumbnail
  }
 })
export default class SearchInput extends Vue {
  @Prop({ type: Boolean })
  minPlayerMode: boolean;
  @Prop({ type: Array, required: true})
  items: FullItem[];

  text: string = ""
}
</script>

<style scoped>
  .thumbnail {
    padding: 16px;
  }
</style>

