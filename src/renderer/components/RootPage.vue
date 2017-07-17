<template>
  <div class="page">
    <toolbar-header :actions="actions"></toolbar-header>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from 'vue-class-component'
import Header from "./Header.vue";

@Component({
  components: {
    "toolbar-header": Header,
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
</style>
