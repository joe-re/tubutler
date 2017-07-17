<template>
  <div class="page">
    <toolbar-header v-if="isEnableHeader" :actions="actions"></toolbar-header>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from 'vue-class-component'
import Header from "./Header.vue";
import ipc from '../ipc';

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
  mounted() {
    ipc.getInstance().addListener('onChangeMinPlayer', this.changePlayerMode);
  }

  beforeDestroy() {
    ipc.getInstance().removeListener('onChangeMinPlayer', this.changePlayerMode)
  }

  changePlayerMode(val: boolean) {
    if (val) {
      let url = '/min-player';
      if (this.$route.params.id) {
        url += `/${this.$route.params.id}`
      }
      this.$router.push(url);
    } else {
      this.$router.push('/');
    }
  }

  get isEnableHeader() {
    return !this.$route.path.startsWith('/min-player');
  }
}
</script>
<style scoped>
 .page {
   height: calc(100vh - 48px);
 }
</style>
