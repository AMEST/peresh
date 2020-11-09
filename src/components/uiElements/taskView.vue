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
                    
                    <div class="dropdown pr-2 mr-2" v-if="customStatuses.length != 0">
                        <button class="btn btn-outline-secondary dropdown-toggle btn-sm border-0 info-but-size" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {{ $Lang.changeToCustomStatus }}
                        </button>
                        <div class="dropdown-menu shadow" aria-labelledby="dropdownMenuButton">
                            <a v-for="(item,key) in customStatuses" :key="item,key" class="dropdown-item" href="#" @click="setCustomStatus(item)">{{ item }}</a>
                        </div>
                    </div>

                    <button class="btn btn-outline-secondary btn-sm border-0 pr-2 mr-2" data-toggle="tooltip" data-placement="bottom" v-bind:title="$Lang.editTask" @click="activeMenuItem = 'taskEditView'"> {{ $Lang.editTask }} <font-awesome-icon icon="pen" /></button>
                    <button class="btn btn-outline-secondary btn-sm border-0 pr-2" data-toggle="tooltip" data-placement="bottom" v-bind:title="$Lang.deleteTask" v-on:click="setTrash">{{ $Lang.deleteTask }} <font-awesome-icon icon="trash" /></button>
                </div>
            </div>
        </div>
        <!--end-->
        <div class="row mt-3">
            <div v-if="currentTask.priority" class="col">{{ $Lang.priority.priority }}: <span class="float-right badge" v-bind:class="priorityColor">{{ $Lang.priority[currentTask.priority] }}</span></div>
            
            <div v-if="currentTask.status" class="col">{{ $Lang.status.status }}: 
                <span v-if="currentTask.customStatus && currentTask.status == 'do'" class="float-right badge badge-warning">{{ currentTask.customStatus }}</span>
                <span v-else-if="currentTask.status == 'do'" class="float-right badge badge-secondary">{{ $Lang.status[currentTask.status] }}</span>
                <span v-else class="float-right badge badge-success">{{ $Lang.status[currentTask.status] }}</span>
            </div>
        </div>
        <div class="row mt-2">
            <div class="col">{{ $Lang.creationDate }}:  <span class="float-right">{{ getCreated() }}</span></div>
            <div class="col">{{ $Lang.endDate }}:  <span class="float-right">{{ getExpiry() }}</span></div>
        </div>
        <div class="row mt-2">
            <div class="col"> {{ $Lang.estimation }}: </div>
        </div>
        <div class="row mt-2">
            <div class="col"> 
                <div class="progress">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" v-bind:class="[taskEstimation.bg]" v-bind:style="[taskEstimation.style]"> {{ taskEstimation.days }} {{$Lang.days}}</div>
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
        setCustomStatus: function(status){
            var allTasks = JSON.parse(this.getTasks());
            this.currentTask.customStatus = status
            allTasks[this.currentTask.id] = this.currentTask
            localStorage.tasks = JSON.stringify(allTasks)
            this.$forceUpdate()
            this.uploadToDropBox()
            this.showMessage("Set cutom status: "+status)
        },
        setArchived: function(){
            var allTasks = JSON.parse(this.getTasks());
            this.currentTask.status = "archiv"
            allTasks[this.currentTask.id] = this.currentTask
            localStorage.tasks = JSON.stringify(allTasks)
            this.$forceUpdate()
            this.uploadToDropBox()
            this.showMessage(this.$Lang.push.archiv)
        },
        setRework: function(){
            var allTasks = JSON.parse(this.getTasks());
            this.currentTask.status = "do"
            allTasks[this.currentTask.id] = this.currentTask
            localStorage.tasks = JSON.stringify(allTasks)
            this.$forceUpdate()
            this.uploadToDropBox()
            this.showMessage(this.$Lang.push.rework)
        },
        setTrash: function(){
            var allTasks = JSON.parse(this.getTasks());
            this.currentTask.isDeleted = true
            allTasks[this.currentTask.id] = this.currentTask
            localStorage.tasks = JSON.stringify(allTasks)
            this.$forceUpdate()
            this.uploadToDropBox()
            this.showMessage(this.$Lang.push.trashed)
            this.activeMenuItem = "trashCan"
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
        taskEstimation:{
            get: function() {
                var max = new Date(parseInt(this.currentTask.expiry)) - new Date(parseInt(this.currentTask.created))
                var current = new Date(parseInt(this.currentTask.expiry)) - new Date()
                var currentPercent = Math.abs(100 - (( current * 100 ) / max))
                var currentDays = Math.round(current / 1000 / 60 / 60 / 24)
                var background = (currentPercent < 35)
                    ? "bg-info"
                    : (currentPercent < 70) ? "bg-warning" : "bg-danger"
                background = (this.currentTask.status === "archiv")? "bg-success" : background
                return {
                    "style":{
                            "width":currentPercent + "%"
                    },
                    "bg":background,
                    "days": currentDays
                }
            }
        },
        hasCustomStatus:{
            get: function(){
                return this.currentTask.customStatus !== undefined && this.currentTask.customStatus !== 'undefined' 
            }
        }
    }
}
</script>
<style>
code{
    color: #e83e8c !important;
}
.dropdown{
    display: inline-block !important;
}
</style>