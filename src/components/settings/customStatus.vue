<template>
    <div>
        <div class="input-group mb-3" v-for="(item,key) in statuses" :key="item,key">
            <input v-model="item.value" type="text" class="form-control status-style" placeholder="Status Name" >
            <div class="input-group-append">
                <button class="btn btn-outline-secondary status-style" type="button" @click="remove(key)" > <font-awesome-icon icon="trash" /></button>
            </div>
        </div>
        <button class="btn btn-outline-secondary btn-sm border-0 pr-2" data-toggle="tooltip" data-placement="bottom" @click="add()"><font-awesome-icon icon="plus" /></button>
        <button class="btn btn-outline-danger border-0 mb-1" type="button" @click="save()">{{ $Lang.save }}</button><br>
    </div>
</template>

<script>
export default {
  name: "customStatus",
  data: function() {
      return {
          statuses:[]
      }
  },
  methods:{
      save: function(){
          var statusList = []
          this.statuses.forEach( function(item,index,data){
            statusList.push(item.value)
          })
          localStorage.customStatuses = JSON.stringify(statusList)
          this.uploadToDropBox()
      },
      add: function(){
          this.statuses.push({"value":""})
          this.$forceUpdate()
      },
      remove: function(id){
          this.statuses.splice(id,1)
      },
      load: function(){
          var self = this
          this.customStatuses.forEach(function(item,index,data){
            self.statuses.push({"value":item})
          })
      }
  },
  created(){
      this.load()
  }
};
</script>
<style>
    .status-style{
        background-color: transparent !important;
        color: #dc3545!important;
        border-color: #dc3545!important;
    }
</style>
