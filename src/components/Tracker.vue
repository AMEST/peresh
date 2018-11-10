<template>
    <main class="h-100vh">
        <top-menu/>
        <div class="container-fluid h-100 mx-auto max-fluid-container-width">
            <div class="row h-100"> 
                <div class="d-none d-sm-none d-md-none d-lg-block col w-25 inrow-menu pt-4 pr-0">
                    <div class="list-group">
                        <a href="#" class="list-group-item list-group-item-action" v-for="(item, key) in getMenu()" :key="key, item" @click="activeMenuItem = key" v-bind:class="[ $bgStyle == 'bg-dark'? 'dark-item': 'light-item', activeMenuItem == key ? ($bgStyle == 'bg-dark' ? 'dark-item-active' : 'light-item-active') : '']">
                            <font-awesome-icon v-bind:icon="item.icon" /><span class="pl-1"> {{ item.text }}</span>
                        </a>
                    </div>
                </div>
                <div class="col work-shadow pt-4 enable-scroll">
                    <!--work
                    <span v-for="gi in getItems()" :key="gi">{{ gi }}</span>
                    <a href="#" v-on:click="test">test</a>-->
                    <div v-if="activeMenuItem == 'tasksList'"> <tasks-list v-bind:tasks="getActiveTasks()"/> </div>
                    <div v-else-if="activeMenuItem == 'tasksToday'"> <tasks-list v-bind:tasks="tasksOnDay(0)"/> </div>
                    <div v-else-if="activeMenuItem == 'tasksTomorrow'"> <tasks-list v-bind:tasks="tasksOnDay(86400000)"/> </div>
                    <div v-else-if="activeMenuItem == 'archiveTasks'"> 4 </div>
                    <div v-else-if="activeMenuItem == 'trashCan'"> 5 </div>
                    <div v-else-if="activeMenuItem == 'settings'"> <settings/> </div>
                    <div v-else-if="activeMenuItem == 'taskView'"><task-view/></div>
                    <div v-else-if="activeMenuItem == 'taskCreateView'"><task-create-view mode="create"/></div>
                    <div v-else-if="activeMenuItem == 'taskEditView'"><task-create-view mode="edit"/></div>
                    <div v-else> <defaultWorkBlock/> </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import TopMenu from './uiElements/TopMenu.vue'
import defaultWorkBlock from './uiElements/defaultWorkBlock.vue'
import settings from './uiElements/settings.vue'
import tasksList from './uiElements/tasksList.vue'
import taskView from './uiElements/taskView.vue'
import taskCreateView from './uiElements/taskCreateView.vue'
export default {
  name: 'Tracker',
  components:{
      TopMenu,
      defaultWorkBlock,
      settings,
      tasksList,
      taskView,
      taskCreateView
  },
  methods:{
      getItems: function(){
          return ["1","2","3",Date()];
      },
      getActiveTasks: function(){
          var allTasks = JSON.parse(localStorage.tasks);
          return this.sortTasks(allTasks,true);
      },
      test: function(){
          var self = this;
          self.$forceUpdate();
      },
      getMenu: function(){
          var self = this;
          return self.$Lang.menu;
      },
      sortTasks: function(tlist, isMap){
          var newTList = [];
          if(isMap){
            for(var key in tlist){
                newTList.push(tlist[key])
            }
          }else{
              newTList = tlist
          }
          var b = undefined;
          for(var j = 0; j < newTList.length; j++){
            for(var i = 0; i < newTList.length-1;i++ ){
                if( parseInt(newTList[i].created) < parseInt(newTList[i+1].created)){
                    b = newTList[i]
                    newTList[i] = newTList[i+1]
                    newTList[i+1] = b
                }
            }
          }
          return newTList
      },
      tasksOnDay: function(dayOffset){
          var tlist = JSON.parse(localStorage.tasks);
          var newTList = [];
          var ds = new Date();
          ds.setHours(0,0,0,0)
          var de = new Date();
          de.setHours(23,59,59)
          for(var key in tlist){
              var task = tlist[key]
              if(( parseInt(task.expiry) >= (ds.getTime()+dayOffset)) && (parseInt(task.expiry) <= (de.getTime()+dayOffset))){
                newTList.push(task)
              }
          }
          return this.sortTasks(newTList,false)
      }
  }
}
</script>

<style>
    .h-100vh{
        height: 100vh;
    }
    .light-tumbler{
        position: fixed;
        top: 16px;
        right: 16px;
        cursor: pointer;
    }
    .inrow-menu{
        max-width: 25% !important;
    }
    .work-shadow{
        box-shadow: inset 0 .5rem 1rem rgba(0,0,0,.35)!important;
    }
    .max-fluid-container-width{
        max-width: 1100px;
    }
    .inrow-menu .list-group .list-group-item{
        border-radius: 5px 0 0 5px;
        background-color: inherit;
        color: inherit;
        border: 0;
    }
    .dark-item:hover, .dark-item-active{
        background-color: rgb(60, 67, 72) !important;
    }
    .light-item:hover, .light-item:active, .light-item-active{
        background-color: rgba(60, 67, 72, 0.1) !important;
    }
    .pointer{
        cursor: pointer;
    }
    .enable-scroll{
        overflow-y: auto !important;
    }
</style>