<template>
   <div>
     <div
       v-for="item in items"
       :key="item.id"
     >
       <thumbnail :item="item"></thumbnail>
     </div>
   </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from 'vue-class-component'
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
  items: FullItem[]
  text: string = "";
}
</script>


