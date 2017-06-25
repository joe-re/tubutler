<template>
   <div>
     {{items}}
     <button @click="show">show</button>>
   </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from 'vue-class-component'
import { Item } from '../types/Item';

@Component({
  props: {
    items: [Object]
  }
 })
export default class SearchInput extends Vue {
  items: Item[]
  text: string = "";
  show() { console.log(this.items); }
}
</script>


