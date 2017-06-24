<template>
  <div>
    <search-input></search-input>
    <hello></hello>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from 'vue-class-component'
import SearchInput from "./SearchInput.vue";
import Hello from "./Hello.vue";

@Component({
  components: {
    "search-input": SearchInput,
    "hello": Hello
  }
})
export default class Home extends Vue {
}
</script>


