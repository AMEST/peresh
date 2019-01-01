<template>
    <div class="pb-for-oneline">
        <h4 class="text-center mb-4">{{ title }}</h4>
        <div  v-if="!tasks[0]" class="row align-items-center h-100vh-no-tasks-in-list">
            <div v-if="activeMenuItem != 'trashCan'" class="col text-center">
                <span class="text-muted"> {{ $Lang.tasksListNone }}</span><br/>
                <button class="btn btn-outline-danger border-0 mb-1 button-default-width" type="button" @click="activeMenuItem = 'taskCreateView'">{{ $Lang.createTask }}</button><br>
            </div>
            <div v-else class="col text-center">
                <span class="text-muted"> {{ $Lang.trashClean }}</span>
            </div>
        </div>
        <ul class="list-group">
            <li v-for="(item,key) in tasks" :key="item,key" v-bind:id="item.id" class="list-group-item d-flex justify-content-between align-items-center" v-bind:class="[ $bgStyle == 'bg-dark'? 'dark-item bg-dark': 'light-item']">
                <span class="pointer" v-if="activeMenuItem != 'trashCan'"  @click="currentTask = item, activeMenuItem = 'taskView'">{{ item.title }}</span>
                <span v-else >{{ item.title }}</span>
                <div>
                <button class="btn btn-outline-secondary btn-sm border-0 pr-2 mr-2" data-toggle="tooltip" data-placement="bottom" v-if="activeMenuItem != 'trashCan'"  v-bind:title="$Lang.editTask" @click="currentTask = item, activeMenuItem = 'taskEditView'"><font-awesome-icon icon="pen" /></button>
                <button class="btn btn-outline-secondary btn-sm border-0 pr-2" data-toggle="tooltip" data-placement="bottom" v-bind:title="$Lang.deleteTask" @click="selectedTask = item" v-on:click="setTrash"><font-awesome-icon icon="trash" /></button>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name:"tasksList",
    props: ["tasks","title"],
    methods:{
        setTrash: function(task){
            var self = this;
            var allTasks = JSON.parse(self.getTasks());
            if( self.activeMenuItem ===  'trashCan'){
                delete allTasks[self.selectedTask.id];
            }else{
                self.selectedTask.isDeleted = true;
                allTasks[self.selectedTask.id] = self.selectedTask;
            }
            localStorage.tasks = JSON.stringify(allTasks);
            var ami = self.activeMenuItem;
            self.activeMenuItem = "blank";
            self.$forceUpdate();
            self.activeMenuItem = ami;
            self.$forceUpdate();
            self.uploadToDropBox()
        }
    }
}
</script>
<style>
    .h-100vh-no-tasks-in-list{
        height: calc( 100vh / 1.4 );
    }
    .pb-for-oneline{
        padding-bottom: 60px;
    }
</style>
