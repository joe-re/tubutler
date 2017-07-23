<template>
  <header class="toolbar toolbar-header" :class="mode">
    <form @submit.prevent="search" class="search-form">
      <span class="icon icon-search"></span>
      <input ref="searchInput" class="search-input form-control" v-model="text" type="text" placeholder="Seach...">
    </form>
  </header>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { actions } from '../store/actions';

@Component({ })
export default class Header extends Vue {
  @Prop({ type: Object, required: true})
  actions: typeof actions;

  @Prop({ type: Boolean, required: true })
  miniPlayerMode: boolean;

  text: string = "";

  mounted() {
    (this.$refs.searchInput as HTMLInputElement).focus();
  }
  search(e: MouseEvent) {
    if (this.$router.currentRoute.path === '/') {
      this.actions.search({ q: this.text });
    } else {
      this.$router.push('/', () => this.actions.search({ q: this.text }));
    }
  }

  get mode() {
    return this.miniPlayerMode ? 'mini-player' : 'normal';
  }
}
</script>
<style scoped>
  header.normal {
    width: 50vw;
    padding: 4px;
    height: 40px;
    border-radius: 6px;
    margin-left: auto;
  }

  header.mini-player {
    width: 200px;
    padding: 4px;
    height: 40px;
    position: absolute;
    right: 0;
    border-radius: 6px;
  }
  .search-form {
    position: relative;
  }
  .icon-search {
    position: absolute;
    top: 3px;
    left: 6px;
    font-size: 16px;
    z-index: 10;
  }
  .search-input {
    text-indent: 12px;
  }
</style>


