<template>
  <div class="btn-group pr-2">
    <button
      type="button"
      class="btn btn-outline-danger dropdown-toggle btn-sm border-0"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
    >{{ $Lang.lang }}</button>
    <div class="dropdown-menu">
      <a class="dropdown-item" href="#" v-on:click="changeRus">{{ $Lang.russian }}</a>
      <a class="dropdown-item" href="#" v-on:click="changeEng">{{ $Lang.english }}</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "langButton",
  methods: {
    changeRus() {
      var self = this;
      localStorage.lang = "ru";
      self.uploadToDropBox(false);
      location.reload();
    },
    changeEng() {
      var self = this;
      localStorage.lang = "en";
      self.uploadToDropBox(false);
      location.reload();
    }
  }
};
</script>