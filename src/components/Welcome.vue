<template>
  <div class="row align-items-center h-100vh">
    <div class="col text-center">
      <img alt="App logo" src="../assets/peresh.png" />
      <h3>{{ msg }} {{ $AppName }}</h3>
      <button
        type="button"
        class="btn btn-info welcome-element-width"
        @click="$isAppStarted=true"
        v-on:click="welcomeMess"
      >{{ $Lang.buttonGetStartedLocal }}</button>
      <br />
      <small class="text-muted welcome-element-width">{{ $Lang.localProfileSmall }}</small>
      <h5>{{ $Lang.or }}</h5>
      <button
        type="button"
        class="btn btn-info welcome-element-width"
        v-on:click="goAuthDropBox();welcomeMess()"
      >
        {{ $Lang.buttonGetStartedDropBox }}
        <font-awesome-icon :icon="{ prefix: 'fab', iconName: 'dropbox' }" />
      </button>
      <br />
      <small class="text-muted welcome-element-width">{{ $Lang.dropboxProfileSmall }}</small>
      <div v-bind:class="[ themeButtonClass ]">
        <a class="text-muted" href="https://github.com/AMEST/peresh" style="padding-right: 5px;">
          Fork me on GitHub
          <font-awesome-icon :icon="{ prefix: 'fab', iconName: 'github' }" />
        </a>
        <langButton />
        <themeChangeButton />
      </div>
    </div>
  </div>
</template>
<script>
import langButton from "./settings/langButton.vue";
import themeChangeButton from "./settings/themeChangeButton.vue";
export default {
  name: "Welcome",
  props: {
    msg: String
  },
  components: {
    langButton,
    themeChangeButton
  },
  data: function() {
    return {
      themeButtonClass: "light-tumbler"
    };
  },
  methods: {
    welcomeMess() {
      this.showMessage(this.$Lang.fullAppName);
    }
  }
};
</script>
<style>
.h-100vh {
  height: 100vh;
}
.welcome-element-width {
  width: 260px;
}
.light-tumbler {
  position: fixed;
  top: 16px;
  right: 16px;
  cursor: pointer;
}
</style>
