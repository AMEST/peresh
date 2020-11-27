<template>
  <div class="pb-for-oneline">
    <h4 class="text-center mb-4">{{ title }}</h4>
    <div v-if="!tasks[0]" class="row align-items-center h-100vh-no-tasks-in-list">
      <div v-if="activeMenuItem != 'trashCan'" class="col text-center">
        <span class="text-muted">{{ $Lang.tasksListNone }}</span>
        <br />
        <button
          class="btn btn-outline-danger border-0 mb-1 button-default-width"
          type="button"
          @click="activeMenuItem = 'taskCreateView'"
        >{{ $Lang.createTask }}</button>
        <br />
      </div>
      <div v-else class="col text-center">
        <span class="text-muted">{{ $Lang.trashClean }}</span>
      </div>
    </div>
    <ul class="list-group">
      <li
        v-for="(item, key) in tasks"
        :key="item,key"
        v-bind:id="item.id"
        class="list-group-item d-flex justify-content-between align-items-center"
        v-bind:class="[ $bgStyle == 'bg-dark'? 'dark-item bg-dark': 'light-item', taskEstimation(item).bg]"
      >
        <span
          class="pointer roundedTitle"
          v-if="activeMenuItem != 'trashCan'"
          @click="currentTask = item, activeMenuItem = 'taskView'"
        >
          <font-awesome-icon :class="[item.priority]" icon="circle" />
          {{ item.title }}
        </span>
        <span v-else>{{ item.title }}</span>
        <div>
          <button
            class="btn btn-outline-secondary btn-sm border-0 pr-2 mr-2"
            data-toggle="tooltip"
            data-placement="bottom"
            v-if="activeMenuItem != 'trashCan'"
            v-bind:title="$Lang.editTask"
            @click="currentTask = item, activeMenuItem = 'taskEditView'"
          >
            <font-awesome-icon icon="pen" />
          </button>
          <button
            class="btn btn-outline-secondary btn-sm border-0 pr-2"
            data-toggle="tooltip"
            data-placement="bottom"
            v-if="activeMenuItem == 'trashCan'"
            v-bind:title="$Lang.restoreTask"
            @click="selectedTask = item"
            v-on:click="setRestore"
          >
            <font-awesome-icon icon="recycle" />
          </button>
          <button
            class="btn btn-outline-secondary btn-sm border-0 pr-2"
            data-toggle="tooltip"
            data-placement="bottom"
            v-bind:title="$Lang.deleteTask"
            @click="selectedTask = item"
            v-on:click="setTrash"
          >
            <font-awesome-icon icon="trash" />
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "tasksList",
  props: ["tasks", "title"],
  methods: {
    // eslint-disable-next-line
    setTrash: function(task) {
      var allTasks = JSON.parse(this.getTasks());
      if (this.activeMenuItem === "trashCan") {
        delete allTasks[this.selectedTask.id];
        this.showMessage(this.$Lang.push.deleted);
      } else {
        this.selectedTask.isDeleted = true;
        allTasks[this.selectedTask.id] = this.selectedTask;
        this.showMessage(this.$Lang.push.trashed);
      }
      localStorage.tasks = JSON.stringify(allTasks);
      var ami = this.activeMenuItem;
      this.activeMenuItem = "blank";
      this.$forceUpdate();
      this.activeMenuItem = ami;
      this.$forceUpdate();
      this.uploadToDropBox();
    },
    // eslint-disable-next-line
    setRestore: function(task) {
      var allTasks = JSON.parse(this.getTasks());
      if (this.activeMenuItem === "trashCan") {
        this.selectedTask.isDeleted = false;
        allTasks[this.selectedTask.id] = this.selectedTask;
        this.showMessage(this.$Lang.push.restored);
      }
      localStorage.tasks = JSON.stringify(allTasks);
      var ami = this.activeMenuItem;
      this.activeMenuItem = "blank";
      this.$forceUpdate();
      this.activeMenuItem = ami;
      this.$forceUpdate();
      this.uploadToDropBox();
    },
    taskEstimation: function(task) {
      var max =
        new Date(parseInt(task.expiry)) -
        new Date(parseInt(task.created));
      var current = new Date(parseInt(task.expiry)) - new Date();
      var currentPercent = Math.abs(100 - (current * 100) / max);
      var currentDays = Math.round(current / 1000 / 60 / 60 / 24);
      var background =
        currentPercent < 35
          ? "estimation-color-normal"
          : currentPercent < 70
          ? "estimation-color-warn"
          : "estimation-color-danger";
      background = task.status === "archiv" ? "estimation-color-fine" : background;
      return {
        style: {
          width: currentPercent + "%"
        },
        bg: background,
        days: currentDays
      };
    }
  }
};
</script>
<style>
.h-100vh-no-tasks-in-list {
  height: calc(100vh / 1.4);
}
.pb-for-oneline {
  padding-bottom: 60px;
}
.roundedTitle {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 75%;
}
.low {
  color: #6c757d;
}
.medium {
  color: #ffc107;
}
.hight {
  color: #dc3545;
}
.estimation-color-normal{
  border-left-color:#17a2b8!important;
  border-right-color:#17a2b8!important;
}
.estimation-color-warn{
  border-left-color:#ffc107!important;
  border-right-color:#ffc107!important;
}
.estimation-color-danger{
  border-left-color:#dc3545!important;
  border-right-color:#dc3545!important;
}
.estimation-color-fine{
  border-left-color:#28a745!important;
  border-right-color:#28a745!important;
}
</style>
