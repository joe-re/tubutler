<template>
  <div class="page">
    <toolbar-header v-if="isEnableHeader" :actions="actions" :searchText="searchText" :miniPlayerMode="miniPlayerMode"></toolbar-header>
    <img v-if="loading" class="loading" src="../../images/Rolling.png"></img>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { State } from '../store';
import { Getters } from '../store/getters';
import Header from "./Header.vue";
import ipc from '../ipc';

@Component({ components: { "toolbar-header": Header } })
export default class Home extends Vue {
  @Prop({ type: Object, required: true })
  actions: any;

  @Prop({ type: Object, required: true })
  state: State;

  @Prop({ type: Object, required: true })
  getters: Getters;

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

  @Watch('state.transparentRate')
  changeTransparentRate(rate: number) {
    const opacity = (100 - rate) / 100;
    const backgraund = `rgba(27, 27, 27, ${opacity})`;
    window.document.body.style.backgroundColor = backgraund;
    window.document.body.style.opacity = opacity.toString();
  }

  mounted() {
    ipc.getInstance().on('PLAY_NEXT', this.playNext);
  }

  beforeDeastory() {
    ipc.getInstance().removeListener('PLAY_NEXT', this.playNext);
  }

  playNext() {
    if (['miniPlayer', 'player'].includes(this.$route.name || '') && this.getters.nextVideoId) {
      this.$router.push({ name: this.$route.name, params: { id: this.getters.nextVideoId } });
    }
  }

  get searchText() {
    return this.state.searchText;
  }

  get isEnableHeader() {
    return !this.$route.path.startsWith('/mini-player');
  }

  get miniPlayerMode() {
    return this.state.miniPlayerMode;
  }

  get loading() {
    return this.state.loading;
  }
}
</script>
<style scoped>
 .page {
   height: calc(100vh - 48px);
 }
.loading {
  position: absolute;
  top: 20%;
  left: 40%;
  animation: spin 1s infinite linear;
}
@keyframes spin {
  0%  {-webkit-transform: rotate(0deg);}
  100% {-webkit-transform: rotate(360deg);}
}
</style>
