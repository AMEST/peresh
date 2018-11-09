<template>
    <div class="container">
        <h4 v-if="mode == 'create'" class="text-center mb-4">{{ $Lang.createTask }}</h4>
        <h4 v-else class="text-center mb-4">{{ $Lang.editTask }}</h4>
        <div class="row mb-3">
            <div class="col-2"> {{ $Lang.title }}</div>
            <div class="col-10"><input class="form-control" type="text" v-model="currentTask['title']" v-bind:placeholder="$Lang.title"></div>
        </div>
        <div class="row mb-3">
            <div class="col-2"> {{ $Lang.priority.priority }}</div>
            <div class="col-10">
                <select class="form-control" v-model="currentTask.priority">
                    <option selected>low</option>
                    <option>medium</option>
                    <option>hight</option>
                </select>
            </div>
        </div>
        <div class="row mb-3">
            <div class="col-2"> {{ $Lang.endDate }}</div>
            <div class="col-10"><input class="form-control" type="text" v-model="currentTask.expiry" v-bind:placeholder="$Lang.endDate"></div>
        </div>
        <div class="row mb-3">
            <div class="col-2"> {{ $Lang.summary }}</div>
            <div class="col-10"><textarea class="form-control" v-model="currentTask.summary" v-bind:placeholder="$Lang.summary+' Markdown works'" rows="7"></textarea></div>
        </div>
        <div align="right">
            <button v-if="mode == 'create'" class="btn btn-outline-secondary border-1 mb-1" type="button" v-on:click="createNewTask" @click="activeMenuItem = 'taskView'">{{ $Lang.createTask }}</button>
            <button v-else class="btn btn-outline-secondary border-1 mb-1" type="button" v-on:click="editTask" @click="activeMenuItem = 'taskView'">{{ $Lang.save }}</button>
        </div>
        {{ currentTask }}
    </div>
</template>
<script>
export default {
    name:"taskCreateView",
    props: ["mode"],
    methods:{
        createNewTask: function(){
            var self = this;
            var allTasks = JSON.parse(localStorage.tasks);
            var nameNewTask = self.rand_name()
            self.currentTask.id = nameNewTask
            allTasks[nameNewTask] = self.currentTask
            localStorage.tasks = JSON.stringify(allTasks)
        },
        editTask: function(){
            var self = this;
            var allTasks = JSON.parse(localStorage.tasks);
            allTasks[self.currentTask.id] = self.currentTask
            localStorage.tasks = JSON.stringify(allTasks)
        },
        rand_name: function(){
            var chars = ["A","P","C","X","E","T","O","B"]
            var name = "";
            for(var i = 0;i<7;i++){
                name += chars[Math.floor(Math.random() * 8)];
            }
            return name;
        }
    },
    created: function(){
        var self = this;
        console.log(self.mode)
        if( self.mode == "create"){
            self.currentTask.title = ""
            self.currentTask.summary = ""
            self.currentTask.priority = "medium"
            self.currentTask.created = new Date().getTime()
        }
    },
    watch: { 
        mode: function(newVal, oldVal) { // watch it
          var self = this;
          console.log('Prop changed: ', newVal, ' | was: ', oldVal)
          if( newVal == "create"){
            self.currentTask.title = ""
            self.currentTask.summary = ""
            self.currentTask.priority = "medium"
            self.currentTask.created = new Date().getTime()
            console.log("run force update")
            this.$forceUpdate()
          }
        }
    }
}
</script>
