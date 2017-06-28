<template>
  <header class="toolbar toolbar-header">
    <form @submit.prevent="search">
      <input class="form-control" v-model="text" type="text" placeholder="Seach...">
    </form>
  </header>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component'
import { Actions } from '../containers/getActions';

@Component({
  props: {
    actions: {
      type: Object,
      required: true
    }
  }
})
export default class Header extends Vue {
  text: string = "";
  actions: Actions;
  search(e: MouseEvent) {
    this.actions.search({ q: this.text });
  }
}
</script>
<style scoped>
  header {
    padding: 8px;
  }
</style>


