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
                <div class="col work-shadow pt-4">
                    <!--work
                    <span v-for="gi in getItems()" :key="gi">{{ gi }}</span>
                    <a href="#" v-on:click="test">test</a>-->
                    <div v-if="activeMenuItem == 'tasksList'"> <tasks-list v-bind:tasks="getActiveTasks()"/> </div>
                    <div v-else-if="activeMenuItem == 'tasksToday'"> 2 </div>
                    <div v-else-if="activeMenuItem == 'tasksTomorrow'"> 3 </div>
                    <div v-else-if="activeMenuItem == 'archiveTasks'"> 4 </div>
                    <div v-else-if="activeMenuItem == 'trashCan'"> 5 </div>
                    <div v-else-if="activeMenuItem == 'settings'"> <settings/> </div>
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
export default {
  name: 'Tracker',
  components:{
      TopMenu,
      defaultWorkBlock,
      settings,
      tasksList
  },
  methods:{
      getItems: function(){
          return ["1","2","3",Date()];
      },
      getActiveTasks: function(){
          return JSON.parse(localStorage.tasks);
      },
      test: function(){
          var self = this;
          self.$forceUpdate();
      },
      getMenu: function(){
          var self = this;
          return self.$Lang.menu;
      },
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
    
</style>