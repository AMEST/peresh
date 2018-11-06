<template>
    <div class="container">
        <h4 class="text-center mb-4">{{ $Lang.settings }}</h4>
        <div class="row mb-3">
            <div class="col-4"> {{ $Lang.theme}}</div>
            <div class="col-8"><theme-change-button/></div>
        </div>
        <div class="row mb-3">
            <div class="col-4"> {{ $Lang.lang}}</div>
            <div class="col-8"><lang-button/></div>
        </div>
        <div class="row mb-3">
            <div class="col-4"> {{ $Lang.removeData}}</div>
            <div class="col-8"><button class="btn btn-outline-danger border-0 mb-1" type="button" @click="$isAppStarted=undefined; activeMenuItem = ''">{{ $Lang.removeData }}</button></div>
        </div>
    </div>
</template>
<script>
import langButton from './langButton.vue'
import themeChangeButton from './themeChangeButton.vue'
export default {
  name: "settings",
  components:{
      langButton,
      themeChangeButton
  },
  methods:{
  }
};
</script>
<style>
    .h-100vh{
        height: 100vh;
    }
    .button-default-width{
        min-width: 200px;
    }
</style>
