<template>
  <button @click="doCommit">{{ foo }}</button>
</template>

<script lang="ts">
import Vue from "vue";
import {mapState} from "vuex";

export default Vue.extend({
  computed: { ...mapState(["foo"]) },
  methods: {
    doCommit() {
      this.$store.commit("foo", "amazing foo")
    }
  }
})
</script>
