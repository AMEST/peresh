<template>
    <div class="container">
        <h4 class="text-center mb-4">{{ $Lang.settings }}</h4>
        <div class="row mb-3">
            <div class="col-4"> {{ $Lang.theme}}</div>
            <div class="col-8"><theme-change-button/></div>
        </div>
        <div class="row mb-3">
            <div class="col-4"> {{ $Lang.lang}}</div>
            <div class="col-8"><lang-button/></div>
        </div>
        <div class="row mb-3">
            <div class="col-4"> {{ $Lang.export.label}}</div>
            <div class="col-8"><button class="btn btn-outline-danger border-0" type="button" v-on:click="exportTasks">{{ $Lang.export.button }}</button></div>
        </div>
        <div class="row mb-3">
            <div class="col-4"> {{ $Lang.import.label}}</div>
            <div class="col-8">
                <div class="custom-file import-style">
                    <input type="file" class="custom-file-input btn-outline-danger" id="importInput" @change="processFile($event)">
                    <label class="custom-file-label">{{ $Lang.import.fileLabel }}</label>
                </div>
            </div>
        </div>
        <div class="row mb-3">
            <div class="col-4"> {{ $Lang.removeData}}</div>
            <div class="col-8"><button class="btn btn-outline-danger border-0 mb-1" type="button" @click="$isAppStarted=undefined; activeMenuItem = ''">{{ $Lang.removeData }}</button></div>
        </div>
    </div>
</template>
<script>
import langButton from './langButton.vue'
import themeChangeButton from './themeChangeButton.vue'

export default {
  name: "settings",
  components:{
      langButton,
      themeChangeButton
  },
  methods:{
      exportTasks: function () {
        var self = this
        var a = document.createElement("a");
        var file = new Blob([self.getTasks()], {type: "text/plain"});
        a.href = URL.createObjectURL(file);
        a.download = "tasks-"+new Date().toLocaleTimeString() + "-" + new Date().toLocaleDateString()+".json";
        a.id = "downloadA"
        document.body.appendChild(a);
        a.click()
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(file);  
        }, 0); 
      },
      processFile(event) {
          var self = this
          var uploadedFile = event.target.files[0];
          var reader = new FileReader()
          reader.onload = function() {
            alert("Import successful")
            localStorage.tasks = reader.result
            self.uploadToDropBox()
            window.location.reload()
          }
          reader.readAsText(uploadedFile)
      }
  }
};
</script>
<style>
    .h-100vh{
        height: 100vh;
    }
    .button-default-width{
        min-width: 200px;
    }
    .import-style label{
        background-color: transparent;
        color: #dc3545;
        border-color: #dc3545;
    }
    .import-style label:hover{
        background-color: #dc3545;
        color: #fff;
    }
</style>
