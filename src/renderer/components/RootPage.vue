<template>
  <div class="page">
    <toolbar-header v-if="isEnableHeader" :actions="actions" :miniPlayerMode="miniPlayerMode"></toolbar-header>
    <img v-if="loading" class="loading" src="../../images/Rolling.png"></img>
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

  @Watch('state.transparentRate')
  changeTransparentRate(rate: number) {
    const opacity = (100 - rate) / 100;
    const backgraund = `rgba(27, 27, 27, ${opacity})`;
    window.document.body.style.backgroundColor = backgraund;
    window.document.body.style.opacity = opacity.toString();
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
