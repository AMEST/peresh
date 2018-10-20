<template>
  <div class="row align-items-center h-100vh">
    <div class="col text-center">
        <img alt="App logo" src="../assets/scheme.png">
        <h3>{{ msg }} {{ $AppName }}</h3>
        <button type="button" class="btn btn-info welcome-element-width" @click="$isAppStarted=true" v-on:click="reloadPage">{{ $Lang.buttonGetStartedLocal }}</button><br>
        <small class="text-muted welcome-element-width">{{ $Lang.localProfileSmall }}</small>
        <div v-if="$bgStyle=='bg-light'" @click="$bgStyle='bg-dark'">Set Dark</div><div v-else @click="$bgStyle='bg-light'">Set Light</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Welcome",
  props: {
    msg: String
  },
  methods:{
      reloadPage:()=>{
          location.reload();
      }
  }
};
</script>
<style>
    .h-100vh{
        height: 100vh;
    }
    .welcome-element-width{
        width: 260px;
    }
</style>
