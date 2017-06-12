<template>
  <div>
    <div>Hello {{name}}{{exclamationMarks}}</div>
    <button @click="decrement">-</button>
    <button @click="increment">+</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from 'vue-class-component'
import {
  State,
  Getter,
  Action,
  Mutation,
  namespace
} from 'vuex-class'

@Component({
  props: { name: String }
})
export default class Hello extends Vue {
  @Action increment: () => void
  @Action decrement: () => void
  @State enthusiasm: number

  get exclamationMarks(): string {
    return Array(this.enthusiasm + 1).join('!');
  }
}
</script>
