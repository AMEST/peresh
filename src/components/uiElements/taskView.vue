<template>
    <div>
        <!--title-->
        <h4 class="mb-4 mt-3"> {{ currentTask.title }}  </h4>
        <!--end-->
        <!--menu-->
        <div class="card" v-bind:class="[ $bgStyle == 'bg-dark'? 'dark-item bg-dark': 'light-item']">
            <div class="card-body">
                <div align="right">
                    <button class="btn btn-outline-secondary btn-sm border-0 pr-2 mr-2" data-toggle="tooltip" data-placement="bottom" v-bind:title="$Lang.editTask"> {{ $Lang.complited }} </button>
                    <button class="btn btn-outline-secondary btn-sm border-0 pr-2 mr-2" data-toggle="tooltip" data-placement="bottom" v-bind:title="$Lang.editTask" @click="activeMenuItem = 'taskEditView'"> {{ $Lang.editTask }} <font-awesome-icon icon="pen" /></button>
                    <button class="btn btn-outline-secondary btn-sm border-0 pr-2" data-toggle="tooltip" data-placement="bottom" v-bind:title="$Lang.deleteTask">{{ $Lang.deleteTask }} <font-awesome-icon icon="trash" /></button>
                </div>
            </div>
        </div>
        <!--end-->
        <div class="row mt-3">
            <div v-if="currentTask.priority" class="col">{{ $Lang.priority.priority }}: <span class="ml-5 badge" v-bind:class="priorityColor">{{ $Lang.priority[currentTask.priority] }}</span></div>
            <div v-if="currentTask.status" class="col">{{ $Lang.status.status }}: <span class="ml-5 badge badge-secondary">{{ $Lang.status[currentTask.status] }}</span></div>
        </div>
        <div class="row mt-2">
            <div class="col">{{ $Lang.creationDate }}:  <span class="ml-5">{{ getCreated() }}</span></div>
            <div class="col">{{ $Lang.endDate }}:  <span class="ml-5">{{ getExpiry() }}</span></div>
        </div>
        <div class="row mt-2">
            <div v-if="currentTask.summary" class="col"> {{ $Lang.summary }}: </div>
        </div>
        <div class="row ml-3">
            <div v-if="currentTask.summary" class="col" style="min-height: 350px;"><vue-markdown> {{ currentTask.summary }} </vue-markdown></div>
        </div>
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
        }
    },
    computed:{
        priorityColor: {
            get: function(){
                if(this.currentTask.priority == "low"){
                    return "badge-secondary"
                }else{
                    if(this.currentTask.priority == "medium"){
                        return "badge-warning"
                    }else{
                        return "badge-danger"
                    }
                }
            }
        }
    }
}
</script>
