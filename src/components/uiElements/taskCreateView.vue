<template>
  <div class="container pb-for-oneline">
    <h4 v-if="mode == 'create'" class="text-center mb-4">{{ $Lang.createTask }}</h4>
    <h4 v-else class="text-center mb-4">{{ $Lang.editTask }}</h4>
    <div class="row mb-3">
      <div class="col-2 min-width-col">{{ $Lang.title }}</div>
      <div class="col-10">
        <input
          class="form-control"
          type="text"
          v-model="currentTask['title']"
          v-bind:placeholder="$Lang.title"
        />
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-2 min-width-col">{{ $Lang.priority.priority }}</div>
      <div class="col-10">
        <select class="form-control" v-model="currentTask.priority">
          <option selected>low</option>
          <option>medium</option>
          <option>hight</option>
        </select>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-2 min-width-col">{{ $Lang.endDate }}</div>
      <div class="col-10">
        <date-time-picker v-model="date" :config="options" @dp-change="endDateChanged"></date-time-picker>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-2 min-width-col">{{ $Lang.summary }}</div>
      <div class="col-10">
        <vue-simplemde v-model="currentTask.summary" ref="markdownEditor" />
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-2 min-width-col"></div>
      <div class="col-10">
        <div align="right">
          <button
            v-if="mode == 'create'"
            class="btn btn-outline-secondary border-1 mb-1"
            type="button"
            v-on:click="createNewTask"
            @click="activeMenuItem = 'taskView'"
          >{{ $Lang.createTask }}</button>
          <button
            v-else
            class="btn btn-outline-secondary border-1 mb-1"
            type="button"
            v-on:click="editTask"
            @click="activeMenuItem = 'taskView'"
          >{{ $Lang.save }}</button>
        </div>
      </div>
    </div>
    <div style="display: block;width: 10px;height: 24px;"></div>
  </div>
</template>
<script>
// Import this component
import dateTimePicker from "vue-bootstrap-datetimepicker";
// Import date picker css
import "pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css";
import VueSimplemde from "vue-simplemde";
export default {
  name: "taskCreateView",
  props: ["mode"],
  data() {
    return {
      date: new Date(),
      options: {
        format: "MM/DD/YYYY HH:mm",
        useCurrent: false
      }
    };
  },
  components: {
    dateTimePicker,
    VueSimplemde
  },
  methods: {
    createNewTask: function() {
      var allTasks = JSON.parse(this.getTasks());
      var nameNewTask = this.rand_name();
      this.currentTask.id = nameNewTask;
      this.currentTask.status = "do";
      this.currentTask.created = new Date().getTime();
      allTasks[nameNewTask] = this.currentTask;
      localStorage.tasks = JSON.stringify(allTasks);
      this.uploadToDropBox();
      this.showMessage(this.$Lang.push.created);
      sessionStorage.currentTask = JSON.stringify(this.currentTask);
    },
    editTask: function() {
      var allTasks = JSON.parse(this.getTasks());
      allTasks[this.currentTask.id] = this.currentTask;
      localStorage.tasks = JSON.stringify(allTasks);
      this.uploadToDropBox();
      this.showMessage(this.$Lang.push.updated);
    },
    rand_name: function() {
      var chars = ["A", "P", "C", "X", "E", "T", "O", "B"];
      var name = "";
      for (var i = 0; i < 7; i++) {
        name += chars[Math.floor(Math.random() * 8)];
      }
      return name;
    },
    // eslint-disable-next-line
    endDateChanged: function(event) {
      this.currentTask.expiry = new Date(this.date).getTime();
      this.$forceUpdate();
    }
  },
  created: function() {
    if (this.mode == "create") {
      this.currentTask.title = "";
      this.currentTask.summary = "";
      this.currentTask.priority = "medium";
      this.currentTask.status = "do";
      delete this.currentTask.customStatus;
      this.currentTask.created = new Date().getTime();
    } else {
      this.date = new Date(this.currentTask.expiry);
    }
  },
  watch: {
    mode: function(newVal, oldVal) {
      // watch it
      if (newVal == "create" && newVal != oldVal) {
        this.currentTask.title = "";
        this.currentTask.summary = "";
        this.currentTask.priority = "medium";
        this.currentTask.status = "do";
        delete this.currentTask.customStatus;
        this.currentTask.created = new Date().getTime();
        this.$forceUpdate();
      }
    }
  }
};
</script>
<style>
@import "~simplemde/dist/simplemde.min.css";
.min-width-col {
  min-width: 85px;
}
.pb-for-oneline {
  padding-bottom: 80px;
}
.editor-toolbar {
  background-color: #f8f9fa;
}
.CodeMirror,
.CodeMirror-scroll {
  max-height: 330px !important;
  min-height: 200px !important;
}
</style>
