<template>
  <div class="container pb-for-oneline">
    <h4 v-if="mode == 'create'" class="text-center mb-4">{{ $Lang.createTask }}</h4>
    <h4 v-else class="text-center mb-4">{{ $Lang.editTask }}</h4>
    <!--Titile-->
    <div class="row mb-3">
      <div class="col-lg-10 min-width-col">{{ $Lang.title }}</div>
      <div class="col-lg-12">
        <input
          class="form-control"
          type="text"
          v-model="currentTask['title']"
          v-bind:placeholder="$Lang.title"
        />
      </div>
    </div>
    <!--Priority-->
    <div class="row mb-3">
      <div class="col-lg-10 min-width-col">{{ $Lang.priority.priority }}</div>
      <div class="col-lg-12">
        <select class="form-control" v-model="currentTask.priority">
          <option selected>low</option>
          <option>medium</option>
          <option>hight</option>
        </select>
      </div>
    </div>
    <!--End date-->
    <div class="row mb-3">
      <div class="col-lg-10 min-width-col">{{ $Lang.endDate }}</div>
      <div class="col-lg-12">
        <date-time-picker v-model="date" :config="options" @dp-change="endDateChanged"></date-time-picker>
      </div>
    </div>
    <!--Todo-->
    <div class="row mb-3">
      <div class="col-lg-10 min-width-col">{{ $Lang.todo }}</div>
      <div class="col-lg-12">

        <div class="input-group mb-3" v-for="(item,key) in currentTask.todo" :key="key">
          <div class="input-group-prepend">
            <div class="input-group-text todo-style">
              <input type="checkbox" v-model="item.state">
            </div>
          </div>
          <input type="text" class="form-control todo-style"  v-model="item.text">
          <div class="input-group-append">
            <button class="btn btn-outline-secondary todo-style" type="button" @click="removeTodo(key)">
              <font-awesome-icon icon="trash" />
            </button>
          </div>
        </div>

        <button
          class="btn btn-outline-secondary btn-sm border-0 pr-2"
          data-toggle="tooltip"
          data-placement="bottom"
          @click="addTodo()"
        >
          <font-awesome-icon icon="plus" />
          {{$Lang.addItem}}
        </button>

      </div>
    </div>
    <!--Summary-->
    <div class="row mb-3">
      <div class="col-lg-10 min-width-col">{{ $Lang.summary }}</div>
      <div class="col-lg-12">
        <vue-simplemde v-model="currentTask.summary" ref="markdownEditor" />
      </div>
    </div>
    <!--Save buttons-->
    <div class="row mb-3">
      <div class="col-lg-10 min-width-col"></div>
      <div class="col-lg-12">
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
    },
    addTodo: function(){
      if(!this.currentTask.todo){
        this.currentTask.todo = [{"text":"","state":false}]
        this.$forceUpdate();
        return
      }
      this.currentTask.todo.push({"text":"","state":false})
      this.$forceUpdate();
    },
    removeTodo: function(id){
      this.currentTask.todo.splice(id, 1);
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
      delete this.currentTask.todo;
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
        delete this.currentTask.todo;
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
  min-width: 120px;
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
.todo-style {
  background-color: transparent !important;
  border-color: #6c757d !important;
  color: #6c757d !important;
}
</style>
