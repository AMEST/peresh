<template>
  <div id="app" v-bind:class="[$bgStyle, $textStyle]">
    <tracker v-if="$isAppStarted"/>
    <welcome v-else v-bind:msg="$Lang.welcomeMessage"/>
  </div>
</template>

<script>
import Welcome from './components/Welcome.vue'
import Tracker from './components/Tracker.vue'

export default {
  name: 'app',
  components: {
    Welcome,
    Tracker
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow: hidden;
}
</style>
