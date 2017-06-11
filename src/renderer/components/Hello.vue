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

@Component({
  props: {
    name: String,
    initialEnthusiasm: Number
  }
})
export default class Hello extends Vue {
  initialEnthusiasm: number
  enthusiasm = this.initialEnthusiasm

  increment() {
    this.enthusiasm++
  }

  decrement() {
    this.enthusiasm--
  }

  get exclamationMarks(): string {
    return Array(this.enthusiasm + 1).join('!');
  }
}
</script>
