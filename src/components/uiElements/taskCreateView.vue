<template>
    <div class="container pb-for-oneline">
        <h4 v-if="mode == 'create'" class="text-center mb-4">{{ $Lang.createTask }}</h4>
        <h4 v-else class="text-center mb-4">{{ $Lang.editTask }}</h4>
        <div class="row mb-3">
            <div class="col-2 min-width-col"> {{ $Lang.title }}</div>
            <div class="col-10"><input class="form-control" type="text" v-model="currentTask['title']" v-bind:placeholder="$Lang.title"></div>
        </div>
        <div class="row mb-3">
            <div class="col-2 min-width-col"> {{ $Lang.priority.priority }}</div>
            <div class="col-10">
                <select class="form-control" v-model="currentTask.priority">
                    <option selected>low</option>
                    <option>medium</option>
                    <option>hight</option>
                </select>
            </div>
        </div>
        <div class="row mb-3">
            <div class="col-2 min-width-col"> {{ $Lang.endDate }}</div>
            <div class="col-10">
                <date-time-picker v-model="date" :config="options" @dp-change="endDateChanged"></date-time-picker> 
            </div>
        </div>
        <div class="row mb-3">
            <div class="col-2 min-width-col"> {{ $Lang.summary }}</div>
            <div class="col-10">
                <textarea hidden class="form-control" v-model="currentTask.summary" v-bind:placeholder="$Lang.summary+' Markdown works'" rows="7"></textarea>
                <vue-simplemde v-model="currentTask.summary" ref="markdownEditor" />
            </div>
        </div>
        <div class="row mb-3">
            <div class="col-2 min-width-col"></div>
            <div class="col-10">
                <div align="right">
                    <button v-if="mode == 'create'" class="btn btn-outline-secondary border-1 mb-1" type="button" v-on:click="createNewTask" @click="activeMenuItem = 'taskView'">{{ $Lang.createTask }}</button>
                    <button v-else class="btn btn-outline-secondary border-1 mb-1" type="button" v-on:click="editTask" @click="activeMenuItem = 'taskView'">{{ $Lang.save }}</button>
                </div>
            </div>
        </div>
        <div style="display: block;width: 10px;height: 24px;"></div>
    </div>
</template>
<script>
// Import this component
import dateTimePicker from 'vue-bootstrap-datetimepicker';
// Import date picker css
import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';
import VueSimplemde from 'vue-simplemde'
export default {
    name:"taskCreateView",
    props: ["mode"],
    data () {
      return {
        date: new Date(),
        options: {
          format: 'MM/DD/YYYY HH:mm',
          useCurrent: false,
        }       
      }
    },
    components:{
        dateTimePicker,
        VueSimplemde
    },
    methods:{
        createNewTask: function(){
            var self = this;
            var allTasks = JSON.parse(self.getTasks());
            var nameNewTask = self.rand_name()
            self.currentTask.id = nameNewTask
            self.currentTask.status = "do"
            self.currentTask.created = new Date().getTime()
            allTasks[nameNewTask] = self.currentTask
            localStorage.tasks = JSON.stringify(allTasks)
            self.uploadToDropBox()
            self.showMessage(self.$Lang.push.created)
            sessionStorage.currentTask = JSON.stringify(self.currentTask)
        },
        editTask: function(){
            var self = this;
            var allTasks = JSON.parse(self.getTasks());
            allTasks[self.currentTask.id] = self.currentTask
            localStorage.tasks = JSON.stringify(allTasks)
            self.uploadToDropBox()
            self.showMessage(self.$Lang.push.updated)
        },
        rand_name: function(){
            var chars = ["A","P","C","X","E","T","O","B"]
            var name = "";
            for(var i = 0;i<7;i++){
                name += chars[Math.floor(Math.random() * 8)];
            }
            return name;
        },
        endDateChanged: function(event){
            var self = this
            self.currentTask.expiry = new Date(self.date).getTime()
            self.$forceUpdate()
        }
    },
    created: function(){
        var self = this;
        if( self.mode == "create"){
            self.currentTask.title = ""
            self.currentTask.summary = ""
            self.currentTask.priority = "medium"
            self.currentTask.status = "do"
            delete self.currentTask.customStatus
            self.currentTask.created = new Date().getTime()
        }else{
            self.date = new Date(self.currentTask.expiry)
        }
    },
    watch: { 
        mode: function(newVal, oldVal) { // watch it
          var self = this;
          if (( newVal == "create") && (newVal != oldVal)){
            self.currentTask.title = ""
            self.currentTask.summary = ""
            self.currentTask.priority = "medium"
            self.currentTask.status = "do"
            delete self.currentTask.customStatus
            self.currentTask.created = new Date().getTime()
            this.$forceUpdate()
          }
        }
    }
}
</script>
<style>
@import '~simplemde/dist/simplemde.min.css';
.min-width-col{
    min-width: 85px;
}
.pb-for-oneline{
    padding-bottom: 80px;
}
.editor-toolbar{
    background-color: #f8f9fa;
}
.CodeMirror, .CodeMirror-scroll {
  max-height: 330px !important;
  min-height: 200px !important;
}
</style>
