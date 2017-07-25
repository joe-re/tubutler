<template>
  <root-page :actions="actions" :state="state" :getters="getters"></root-page>
</template>

<script lang="ts">
import Vue from "vue";
import Component from 'vue-class-component'
import RootPage from '../components/RootPage.vue'

@Component({
  components: { "root-page": RootPage },
  props: {
    actions: { type: Object, required: true },
    state: { type: Object, required: true },
    getters: { type: Object, required: true }
  }
})
export default class RootContainer extends Vue {

}
</script>
