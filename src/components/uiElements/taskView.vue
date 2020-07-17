<template>
    <div>
        <!--title-->
        <h4 class="mb-4 mt-3"> {{ currentTask.title }}  </h4>
        <!--end-->
        <!--menu-->
        <div class="card" v-bind:class="[ $bgStyle == 'bg-dark'? 'dark-item bg-dark': 'light-item']">
            <div class="card-body">
                <div align="right">
                    <button v-if="currentTask.status == 'do'" class="btn btn-outline-secondary btn-sm border-0 pr-2 mr-2" data-toggle="tooltip" data-placement="bottom" v-bind:title="$Lang.editTask" v-on:click="setArchived"> {{ $Lang.complited }} </button>
                    <button v-else class="btn btn-outline-secondary btn-sm border-0 pr-2 mr-2" data-toggle="tooltip" data-placement="bottom" v-bind:title="$Lang.editTask" v-on:click="setRework"> {{ $Lang.rework }} </button>

                    <button class="btn btn-outline-secondary btn-sm border-0 pr-2 mr-2" data-toggle="tooltip" data-placement="bottom" v-bind:title="$Lang.editTask" @click="activeMenuItem = 'taskEditView'"> {{ $Lang.editTask }} <font-awesome-icon icon="pen" /></button>
                    <button class="btn btn-outline-secondary btn-sm border-0 pr-2" data-toggle="tooltip" data-placement="bottom" v-bind:title="$Lang.deleteTask" v-on:click="setTrash">{{ $Lang.deleteTask }} <font-awesome-icon icon="trash" /></button>
                </div>
            </div>
        </div>
        <!--end-->
        <div class="row mt-3">
            <div v-if="currentTask.priority" class="col">{{ $Lang.priority.priority }}: <span class="float-right badge" v-bind:class="priorityColor">{{ $Lang.priority[currentTask.priority] }}</span></div>
            <div v-if="currentTask.status" class="col">{{ $Lang.status.status }}: 
                <span v-if="currentTask.status == 'do'" class="float-right badge badge-secondary">{{ $Lang.status[currentTask.status] }}</span>
                <span v-else class="float-right badge badge-success">{{ $Lang.status[currentTask.status] }}</span>
            </div>
        </div>
        <div class="row mt-2">
            <div class="col">{{ $Lang.creationDate }}:  <span class="float-right">{{ getCreated() }}</span></div>
            <div class="col">{{ $Lang.endDate }}:  <span class="float-right">{{ getExpiry() }}</span></div>
        </div>
        <div class="row mt-2">
            <div class="col"> {{ $Lang.progress }}: </div>
        </div>
        <div class="row mt-2">
            <div class="col"> 
                <div class="progress">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" v-bind:class="[taskProgress.bg]" v-bind:style="[taskProgress.style]"></div>
                </div>
            </div>
        </div>
        <div class="row mt-2">
            <div v-if="currentTask.summary" class="col"> {{ $Lang.summary }}: </div>
        </div>
        <div class="row ml-3">
            <div v-if="currentTask.summary" class="col" style="min-height: 350px;"><vue-markdown> {{ currentTask.summary }} </vue-markdown></div>
        </div>
        <div style="display: block;width: 10px;height: 24px;"></div>
    </div>
</template>
<script>
import VueMarkdown from 'vue-markdown'
export default {
    name:"tasksView",
    components:{
        VueMarkdown
    },
    methods:{
        getCreated: function(){
            return new Date(parseInt(this.currentTask.created)).toLocaleTimeString() + " " + new Date(parseInt(this.currentTask.created)).toLocaleDateString();
        },        
        getExpiry: function(){
            return new Date(parseInt(this.currentTask.expiry)).toLocaleTimeString() + " " + new Date(parseInt(this.currentTask.expiry)).toLocaleDateString();
        },
        setArchived: function(){
            var self = this;
            var allTasks = JSON.parse(self.getTasks());
            self.currentTask.status = "archiv"
            allTasks[self.currentTask.id] = self.currentTask
            localStorage.tasks = JSON.stringify(allTasks)
            self.$forceUpdate()
            self.uploadToDropBox()
            self.showMessage(self.$Lang.push.archiv)
        },
        setRework: function(){
            var self = this;
            var allTasks = JSON.parse(self.getTasks());
            self.currentTask.status = "do"
            allTasks[self.currentTask.id] = self.currentTask
            localStorage.tasks = JSON.stringify(allTasks)
            self.$forceUpdate()
            self.uploadToDropBox()
            self.showMessage(self.$Lang.push.rework)
        },
        setTrash: function(){
            var self = this;
            var allTasks = JSON.parse(self.getTasks());
            self.currentTask.isDeleted = true
            allTasks[self.currentTask.id] = self.currentTask
            localStorage.tasks = JSON.stringify(allTasks)
            self.$forceUpdate()
            self.uploadToDropBox()
            self.showMessage(self.$Lang.push.trashed)
            self.activeMenuItem = "trashCan"
        }
    },
    computed:{
        priorityColor: {
            get: function(){
                switch (this.currentTask.priority) {
                    case "low":
                        return "badge-secondary"
                    case "medium":
                        return "badge-warning"
                    case "hight":
                        return "badge-danger"
                    default:
                        return "badge-secondary"
                }
            }
        },
        taskProgress:{
            get: function() {
                var max = new Date(parseInt(this.currentTask.expiry)) - new Date(parseInt(this.currentTask.created))
                var current = new Date(parseInt(this.currentTask.expiry)) - new Date()
                var currentPercent = Math.abs(100 - (( current * 100 ) / max))
                var background = (currentPercent < 35)
                    ? "bg-info"
                    : (currentPercent < 70) ? "bg-warning" : "bg-danger"
                background = (this.currentTask.status === "archiv")? "bg-success" : background
                return {
                    "style":{
                            "width":currentPercent + "%"
                    },
                    "bg":background
                }
            }
        }
    }
}
</script>
<style>
code{
    color: #e83e8c !important;
}
</style>