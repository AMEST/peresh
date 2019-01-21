import Vue from 'vue'
import App from './App.vue'
import Vue2TouchEvents from 'vue2-touch-events'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import langRu from './assets/lang_ru.json'
import langEng from './assets/lang_en.json'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee, faSun, faMoon, faCube, faPlus, faTrash, faArchive, faTasks, faCalendar, faCalendarAlt, faColumns, faPen, faBars, faSync } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import './registerServiceWorker'
/*
*
* Configuration init
*
*/
// Parse data in hash
var hash = window.location.hash.substring(1)
var params = {}
hash.split('&').map(hk => {
  let temp = hk.split('=')
  params[temp[0]] = temp[1]
})
/*eslint-disable */
// Write dropbox access token to local storage & reload page
if ( params.access_token !== undefined ) {
  localStorage.dropBoxToken = params.access_token
  localStorage.dropBoxMode = "enable"
  var request = new XMLHttpRequest();
  request.open("POST","https://api.dropboxapi.com/2/users/get_current_account",true)
  request.setRequestHeader("Authorization","Bearer "+localStorage.dropBoxToken)
  request.onload = function(){
    var profile = JSON.parse(request.response)
    localStorage.dropBoxUser = profile.name.display_name
    localStorage.isAppStarted = true
    window.location = window.location.protocol +"//" + window.location.host
  }
  request.send(null)
}
window.addEventListener('beforeinstallprompt', function (event) {
  console.log("prompt")
  event.prompt()
})
library.add(faCoffee, faSun, faMoon, faCube, faPlus, faTrash, faArchive, faTasks, faCalendar, faCalendarAlt, faColumns, faPen, faBars, faSync)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(Vue2TouchEvents)
Vue.config.productionTip = false
//Set Language
var lang = undefined
if (localStorage.lang === 'ru') {
  lang = langRu
} else {
  lang = langEng
}
//Set default theme
if ((localStorage.bgStyle === undefined) || (localStorage.bgStyle === 'undefined')) {
  localStorage.bgStyle = 'bg-light'
}
//Set default tasks
if ((localStorage.tasks === undefined) || (localStorage.tasks === 'undefined')) {
  localStorage.tasks = JSON.stringify({})
}
//Set default dropBox mode
if ((localStorage.dropBoxMode === undefined) || (localStorage.dropBoxMode === 'undefined')) {
  localStorage.dropBoxMode = "disable"
}
let globalData = new Vue({
  data: {
    $activeMenuItem: "TrackerMain",//((sessionStorage.activeMenuItem === 'undefined')||(sessionStorage.activeMenuItem === undefined)) ? 'TrackerMain' : sessionStorage.activeMenuItem,
    $bgStyle: localStorage.bgStyle,
    $AppName: 'Peresh',
    $currentTask: {"title":"","summary":"","priority":"medium","status":"do","created":new Date().getTime(),"expiry":new Date().getTime()+16000},
    $isAppStarted: ((localStorage.isAppStarted === 'undefined') || (localStorage.isAppStarted === undefined) ? false : localStorage.isAppStarted),
    $isMenuOpened: false,
    $isDropBoxMode: (localStorage.dropBoxMode == "enable")?true:false,
    $isSync: false
  }
});

Vue.mixin({
  methods: {
    uploadToDropBox() {
      if((localStorage.dropBoxToken !== undefined)||(localStorage.dropBoxToken!=='undefined') && (localStorage.dropBoxMode == "enable")){
        var request = new XMLHttpRequest();
        request.open("POST","https://content.dropboxapi.com/2/files/upload",true)
        request.setRequestHeader("Authorization","Bearer "+localStorage.dropBoxToken)
        request.setRequestHeader("Dropbox-API-Arg",'{"path": "/issues.json","mode": "overwrite","autorename": false,"mute": false,"strict_conflict": false}')
        request.setRequestHeader("Content-Type",'application/octet-stream')
        request.onload = () => {
          this.syncWithDropBox()
          console.log('[DBX]', request.response)
          this.$isSynchronize = false
        }
        this.$isSynchronize = true
        request.send(localStorage.tasks)
      }
    },
    goAuthDropBox(){
      var redirectUrl = window.location.protocol +"//" + window.location.host
      var client_id = "3pap37yp0kr2bei"
      var authUrl = "https://www.dropbox.com/oauth2/authorize?client_id="+client_id+"&response_type=token&redirect_uri="+redirectUrl
      window.location = authUrl
    },
    getTasks(){
      if(this.checkSleepTime())
            this.syncWithDropBox()
      return localStorage.tasks
    },
    syncWithDropBox(){
      if(((localStorage.dropBoxToken !== undefined)||(localStorage.dropBoxToken!=='undefined')) && (localStorage.dropBoxMode == "enable")){
        var selfThis = this;
        var request = new XMLHttpRequest();
        request.open("POST","https://content.dropboxapi.com/2/files/download",true)
        request.setRequestHeader("Authorization","Bearer "+localStorage.dropBoxToken)
        request.setRequestHeader("Dropbox-API-Arg",'{"path": "/issues.json"}')
        request.onload = function(){
          if(request.status == 200){
            localStorage.tasks = request.response;
            selfThis.$isSynchronize = false;
            console.log("[Sync2]",selfThis.$isSynchronize);
          }else{
            console.error('[DROPBOX]', 'Error downloading issues.json!!!!!!!!!')
            console.error('[DROPBOX]', 'Server response code'+ request.status)
            console.error('[DROPBOX]', 'Response: '+request.response)
          }
          sessionStorage.syncTime = new Date().getTime()
        }
        this.$isSynchronize = true
        console.log("[Sync1]",this.$isSynchronize)
        request.send(null)
      }
    },
    checkSleepTime(){
      var oldTime = (sessionStorage.syncTime == undefined)?new Date().getTime():parseInt(sessionStorage.syncTime)
      var curTime = new Date().getTime()
      if((curTime - oldTime) < 5000 ){
        return false
      }else{
        sessionStorage.syncTime = new Date().getTime()
        return true
      }
    }
  },
  computed: {
    $bgStyle: {
      get: function () { return globalData.$data.$bgStyle },
      set: function (newColor) { globalData.$data.$bgStyle = newColor; localStorage.bgStyle = newColor }
    },
    $textStyle: { get: function () { return (globalData.$data.$bgStyle === 'bg-dark') ? 'text-light' : 'text-dark' } },
    $AppName: { get: function () { return globalData.$data.$AppName } },
    $Lang: { get: function () { return lang } },
    $isAppStarted: {
      get: function () { return globalData.$data.$isAppStarted },
      set: function (newValue) { globalData.$data.$isAppStarted = newValue; localStorage.isAppStarted = newValue }
    },
    activeMenuItem: {
      get: function () { return globalData.$data.$activeMenuItem },
      set: function (newValue) { globalData.$data.$activeMenuItem = newValue; sessionStorage.activeMenuItem = newValue }
    },
    currentTask: {
      get: function () { return globalData.$data.$currentTask },
      set: function (newValue) { globalData.$data.$currentTask = newValue; sessionStorage.currentTask = JSON.stringify(newValue)}
    },
    $isMenuOpened: {
      get: function () { return globalData.$data.$isMenuOpened },
      set: function (newValue) { globalData.$data.$isMenuOpened = newValue}
    },
    $isDropBoxMode: {
      get: function () { return globalData.$data.$isDropBoxMode },
      set: function (newValue) { globalData.$data.$isDropBoxMode = newValue; localStorage.dropBoxMode = (newValue)?"enable":"disable"}
    },
    $isSynchronize: {
      get: function () { return globalData.$data.$isSync },
      set: function (newValue) { globalData.$data.$isSync = newValue}
    }
  }
})
/* eslint-enable */
/*
*
* Application Init
*
*/
// eslint-disable-next-line
let app = new Vue({
  render: h => h(App)
}).$mount('#app')
