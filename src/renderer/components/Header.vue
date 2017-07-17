<template>
  <header class="toolbar toolbar-header">
    <form @submit.prevent="search">
      <input ref="searchInput" class="form-control" v-model="text" type="text" placeholder="Seach...">
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
}
</script>
<style scoped>
  header {
    padding: 8px;
    height: 48px;
  }
</style>


