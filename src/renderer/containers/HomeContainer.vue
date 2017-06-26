<template>
  <home :actions="actions" :state="state"></home>
</template>

<script lang="ts">
import Vue from "vue";
import Component from 'vue-class-component'
import SearchInput from "./SearchInput.vue";
import Home from '../components/Home.vue'
import store from '../store';
import getActions from './getActions';

@Component({
  components: { "home": Home }
})
export default class HomeContainer extends Vue {
  state = store.state;
  actions = getActions();
}
</script>
