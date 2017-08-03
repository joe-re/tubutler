<template>
  <header class="toolbar toolbar-header" :class="mode">
    <form @submit.prevent="search" class="search-form">
      <span class="icon icon-search"></span>
      <input
        ref="searchInput"
        class="search-input form-control"
        type="text"
        v-model="text"
        v-on:change="onChangeSearchText"
        placeholder="Seach..."
      >
    </form>
  </header>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { actions } from '../store/actions';

@Component({})
export default class Header extends Vue {
  @Prop({ type: Object, required: true})
  actions: typeof actions;

  @Prop({ type: String, required: true })
  searchText: string;

  @Prop({ type: Boolean, required: true })
  miniPlayerMode: boolean;

  text: string = "";

  mounted() {
    (this.$refs.searchInput as HTMLInputElement).focus();
  }

  onChangeSearchText(e: HTMLInputElement) {
    this.actions.changeSearchText({ searchText: this.text });
  }

  search(e: MouseEvent) {
    if (this.$router.currentRoute.path === '/') {
      this.actions.search({ q: this.searchText, pageToken: '' });
    } else {
      this.$router.push('/', () => this.actions.search({ q: this.searchText, pageToken: '' }));
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
    color: black;
  }
</style>


