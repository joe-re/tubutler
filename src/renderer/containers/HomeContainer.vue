<template>
  <home :actions="actions"></home>
</template>

<script lang="ts">
import Vue from "vue";
import Component from 'vue-class-component'
import SearchInput from "./SearchInput.vue";
import Home from '../components/Home.vue'
import store from '../store';
import { actions } from '../store/actions';

@Component({
  components: { "home": Home }
})
export default class HomeContainer extends Vue {
  state = store.state;
  actions = {
    search: (params: { q: string }) => store.dispatch('search', params)
  };
}
</script>
