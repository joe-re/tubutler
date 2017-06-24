<template>
   <div>
     <input v-model="text" type="text" placeholder="Seach...">
     <button @click="search">Search</button>>
   </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from 'vue-class-component'

@Component({ })
export default class SearchInput extends Vue {
  text: string = "";
  search() { this.$store.dispatch('search'); }
}
</script>

