<template>
  <div class="page">
    <toolbar-header v-if="isEnableHeader" :actions="actions" :miniPlayerMode="miniPlayerMode"></toolbar-header>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { State } from '../store';
import Header from "./Header.vue";
import ipc from '../ipc';

@Component({ components: { "toolbar-header": Header } })
export default class Home extends Vue {
  @Prop({ type: Object, required: true })
  actions: any;

  @Prop({ type: Object, required: true })
  state: State;

  @Watch('state.miniPlayerMode')
  changePlayerMode(val: boolean) {
    let url = this.$route.params.id ? `/${this.$route.params.id}` : '/';
    if (val) {
      url = '/mini-player' + url;
      this.$router.push(url);
    } else {
      this.$router.push(`${url}`);
    }
  }

  get isEnableHeader() {
    return !this.$route.path.startsWith('/mini-player');
  }

  get miniPlayerMode() {
    return this.state.miniPlayerMode;
  }
}
</script>
<style scoped>
 .page {
   height: calc(100vh - 48px);
 }
</style>
