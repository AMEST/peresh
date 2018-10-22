<template>
  <div class="row align-items-center h-100vh">
    <div class="col text-center">
        <img alt="App logo" src="../assets/scheme.png">
        <h3>{{ msg }} {{ $AppName }}</h3>
        <button type="button" class="btn btn-info welcome-element-width" @click="$isAppStarted=true">{{ $Lang.buttonGetStartedLocal }}</button><br>
        <small class="text-muted welcome-element-width">{{ $Lang.localProfileSmall }}</small>
        <div v-bind:class="[ themeButtonClass ]">
            <langButton/>
            <themeChangeButton/>
        </div>
    </div>
  </div>
</template>
<script>
import langButton from './uiElements/langButton.vue'
import themeChangeButton from './uiElements/themeChangeButton.vue'
export default {
  name: "Welcome",
  props: {
    msg: String
  },
  components:{
      langButton,
      themeChangeButton
  },
  data: function(){
      return {
          themeButtonClass: "light-tumbler"
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
    .light-tumbler{
        position: fixed;
        top: 16px;
        right: 16px;
        cursor: pointer;
    }
</style>
