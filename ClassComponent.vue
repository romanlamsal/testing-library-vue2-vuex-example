<template>
  <button @click="doCommit">{{ foo }}</button>
</template>

<script lang="ts">
import Vue from "vue";
import {mapState} from "vuex";
import {Component} from "vue-property-decorator";

@Component({
  computed: mapState(['foo'])
})
export default class WithStore extends Vue {
  private foo!: any

  doCommit() {
    this.$store.commit("foo", "amazing foo")
  }
}
</script>
