<template>
    <div>
        <top-menu/>
        <main class="h-100vh overflow-hidden mca" v-touch:swipe.right="swipeRight" v-touch:swipe.left="swipeLeft">
            <div class="container-fluid h-100 mx-auto max-fluid-container-width">
                <div class="row h-100"> 
                    <div v-if="$isMenuOpened" class="ocmenu ocmenu-shadow inrow-menu d-lg-none pt-4 pr-0" v-bind:class="[$bgStyle]">
                        <div class="list-group">
                            <a href="#" class="list-group-item list-group-item-action" v-for="(item, key) in getMenu()" :key="key, item" @click="activeMenuItem = key" v-bind:class="[ $bgStyle == 'bg-dark'? 'dark-item': 'light-item', activeMenuItem == key ? ($bgStyle == 'bg-dark' ? 'dark-item-active' : 'light-item-active') : '']">
                                <font-awesome-icon v-bind:icon="item.icon" /><span class="pl-1"> {{ item.text }}</span>
                            </a>
                        </div>
                    </div>
                    <div class="d-none d-sm-none d-md-none d-lg-block col w-25 inrow-menu pt-4 pr-0">
                        <div class="list-group">
                            <a href="#" class="list-group-item list-group-item-action" v-for="(item, key) in getMenu()" :key="key, item" @click="activeMenuItem = key" v-bind:class="[ $bgStyle == 'bg-dark'? 'dark-item': 'light-item', activeMenuItem == key ? ($bgStyle == 'bg-dark' ? 'dark-item-active' : 'light-item-active') : '']">
                                <font-awesome-icon v-bind:icon="item.icon" /><span class="pl-1"> {{ item.text }}</span>
                            </a>
                        </div>
                    </div>
                    <div class="col work-shadow pt-4 enable-scroll">
                        <div v-if="activeMenuItem == 'tasksList'"> <tasks-list v-bind:title="$Lang.menu.tasksList.text" v-bind:tasks="getActiveTasks()"/> </div>
                        <div v-else-if="activeMenuItem == 'tasksToday'"> <tasks-list v-bind:title="$Lang.menu.tasksToday.text" v-bind:tasks="tasksOnDay(0)"/> </div>
                        <div v-else-if="activeMenuItem == 'tasksTomorrow'"> <tasks-list v-bind:title="$Lang.menu.tasksTomorrow.text" v-bind:tasks="tasksOnDay(86400000)"/> </div>
                        <div v-else-if="activeMenuItem == 'archiveTasks'"><tasks-list v-bind:title="$Lang.menu.archiveTasks.text" v-bind:tasks="getArchivedTasks()"/></div>
                        <div v-else-if="activeMenuItem == 'trashCan'"> <tasks-list v-bind:title="$Lang.menu.trashCan.text" v-bind:tasks="getTrashCan()"/> </div>
                        <div v-else-if="activeMenuItem == 'settings'"> <settings/> </div>
                        <div v-else-if="activeMenuItem == 'taskView'"><task-view/></div>
                        <div v-else-if="activeMenuItem == 'taskCreateView'"><task-create-view mode="create"/></div>
                        <div v-else-if="activeMenuItem == 'taskEditView'"><task-create-view mode="edit"/></div>
                        <div v-else> <defaultWorkBlock/> </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
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
          var self = this
          var allTasks = JSON.parse(self.getTasks());
          var newTList = [];
          for(var key in allTasks){
              if((allTasks[key].status == "do") && ((allTasks[key].isDeleted == undefined) || (allTasks[key].isDeleted == false)))
                newTList.push(allTasks[key])
          }
          return this.sortTasks(newTList,false);
      },
      getArchivedTasks: function(){
          var self = this
          var allTasks = JSON.parse(self.getTasks());
          var newTList = [];
          for(var key in allTasks){
              if((allTasks[key].status == "archiv") && ((allTasks[key].isDeleted == undefined) || (allTasks[key].isDeleted == false)))
                newTList.push(allTasks[key])
          }
          return this.sortTasks(newTList,false);
      },
      getTrashCan: function(){
          var self = this
          var allTasks = JSON.parse(self.getTasks());
          var newTList = [];
          for(var key in allTasks){
              if(allTasks[key].isDeleted)
                newTList.push(allTasks[key])
          }
          return this.sortTasks(newTList,false);
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
          var self = this
          var tlist = JSON.parse(self.getTasks());
          var newTList = [];
          var ds = new Date();
          ds.setHours(0,0,0,0)
          var de = new Date();
          de.setHours(23,59,59)
          for(var key in tlist){
              var task = tlist[key]
              if(( parseInt(task.expiry) >= (ds.getTime()+dayOffset)) && (parseInt(task.expiry) <= (de.getTime()+dayOffset)) && (tlist[key].status == "do") && ((tlist[key].isDeleted == undefined) || (tlist[key].isDeleted == false))){
                newTList.push(task)
              }
          }
          return this.sortTasks(newTList,false)
      },
      swipeRight: function(){
          var self = this;
          console.log('[Swipe]', 'Right')
          console.log(self)
          self.$isMenuOpened = true;
      },
      swipeLeft: function(){
          var self = this;
          self.$isMenuOpened = false;
      }
  },
  created: function(){
      var self = this
      self.syncWithDropBox()
  }
}
</script>

<style>
    .mca{
        padding-top: 56.6px;
    }
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
    .ocmenu{
        max-width: 300px !important;
        position: fixed;
        z-index: 10;
        height: calc( 100% - 56.6px );
    }
    .ocmenu-shadow{
        box-shadow: 0 .5rem 1rem rgba(0,0,0,.35)!important;
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
    .overflow-hidden{
        overflow: hidden;
    }
</style>