import Vue from 'vue'
import App from './App.vue'
import Vue2TouchEvents from 'vue2-touch-events'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import langRu from './assets/lang_ru.json'
import langEng from './assets/lang_en.json'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee, faSun, faMoon, faCube, faPlus, faTrash, faRecycle, faArchive, faTasks, faCalendar, faCalendarAlt, faColumns, faPen, faBars, faSync } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faDropbox } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import './registerServiceWorker'
import dropboxClient from '@/dropbox'
import utils from '@/utils'

const issuesFileName = "issues.json"
const settingsFileName = "settings.json"
/*
*
* Configuration init
*
*/

// Parse data in hash
var params = utils.parseHash()
// Write dropbox access token to local storage & reload page
if (params.access_token !== undefined) {
  dropboxClient.auth(params.access_token)
}
utils.installPrompt()
utils.useDefaults()

if (dropboxClient.active()) {
  dropboxClient.download(settingsFileName, (response) => {
    var settings = JSON.parse(response)
    utils.setSettings(settings)
    // eslint-disable-next-line
  }, false, (request) => {
    dropboxClient.upload(settingsFileName, JSON.stringify(utils.getSettings()))
    // eslint-disable-next-line
    console.info('[INIT]', 'Settings not found in dropbox, use defaults')
  })
}

library.add(faCoffee, faSun, faMoon, faCube, faPlus, faTrash, faRecycle, faArchive, faTasks, faCalendar, faCalendarAlt, faColumns, faPen, faBars, faSync, faGithub, faDropbox)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(Vue2TouchEvents)
Vue.config.productionTip = false

// Set Language
var lang
if (utils.getSettings().lang === 'ru') {
  lang = langRu
} else {
  lang = langEng
}

/*eslint-disable*/
let globalData = new Vue({
  data: {
    $activeMenuItem: utils.getActiveItemFromSession(),
    $bgStyle: utils.getSettings().bgStyle,
    $AppName: 'Peresh',
    $currentTask: utils.getCurrentTaskFromSession(),
    $customStatuses: utils.getSettings().statuses,
    $isAppStarted: utils.isAppStarted(),
    $isMenuOpened: false,
    $isDropBoxMode: dropboxClient.isEnabled(),
    $isSync: false
  }
});
/* eslint-enable */
Vue.mixin({
  methods: {
    uploadToDropBox(async = true) {
      if (dropboxClient.active()) {
        dropboxClient.upload(issuesFileName, window.localStorage.tasks, () => this.syncWithDropBox(), async)
        dropboxClient.upload(settingsFileName, JSON.stringify(utils.getSettings()), () => this.syncWithDropBox, async)
      }
    },
    goAuthDropBox() {
      dropboxClient.redirectToAuth()
    },
    getTasks() {

      if (this.checkSleepTime()) {
        this.syncWithDropBox()
      }
      return window.localStorage.tasks
    },
    syncWithDropBox() {
      if (dropboxClient.active()) {
        var selfThis = this
        dropboxClient.download(issuesFileName, (response) => {
          window.localStorage.tasks = response
          selfThis.$isSynchronize = false
          window.sessionStorage.syncTime = new Date().getTime()
        })
        dropboxClient.download(settingsFileName, (response) => {
          var settings = JSON.parse(response)
          utils.setSettings(settings)
          selfThis.$isSynchronize = false
          window.sessionStorage.syncTime = new Date().getTime()
        })
        this.$isSynchronize = true
      }
    },
    checkSleepTime() {
      var oldTime = (window.sessionStorage.syncTime == undefined) ? new Date().getTime() : parseInt(window.sessionStorage.syncTime)
      var curTime = new Date().getTime()
      if ((curTime - oldTime) < 5000) {
        return false
      } else {
        window.sessionStorage.syncTime = new Date().getTime()
        return true
      }
    },
    showMessage(message) {
      utils.showNotification(message)
    }
  },
  computed: {
    $bgStyle: {
      get: function () { return globalData.$data.$bgStyle },
      set: function (newColor) { globalData.$data.$bgStyle = newColor; window.localStorage.bgStyle = newColor }
    },
    $textStyle: { get: function () { return (globalData.$data.$bgStyle === 'bg-dark') ? 'text-light' : 'text-dark' } },
    $AppName: { get: function () { return globalData.$data.$AppName } },
    $Lang: { get: function () { return lang } },
    $isAppStarted: {
      get: function () { return globalData.$data.$isAppStarted },
      set: function (newValue) { globalData.$data.$isAppStarted = newValue; window.localStorage.isAppStarted = newValue }
    },
    activeMenuItem: {
      get: function () { return globalData.$data.$activeMenuItem },
      set: function (newValue) { globalData.$data.$activeMenuItem = newValue; window.sessionStorage.activeMenuItem = newValue }
    },
    currentTask: {
      get: function () { return globalData.$data.$currentTask },
      set: function (newValue) { globalData.$data.$currentTask = newValue; window.sessionStorage.currentTask = JSON.stringify(newValue) }
    },
    customStatuses: {
      get: function () { return globalData.$data.$customStatuses },
      set: function (newValue) { globalData.$data.$customStatuses = newValue; window.sessionStorage.customStatuses = JSON.stringify(newValue) }
    },
    $isMenuOpened: {
      get: function () { return globalData.$data.$isMenuOpened },
      set: function (newValue) { globalData.$data.$isMenuOpened = newValue }
    },
    $isDropBoxMode: {
      get: function () { return globalData.$data.$isDropBoxMode },
      set: function (newValue) { globalData.$data.$isDropBoxMode = newValue; window.localStorage.dropBoxMode = (newValue) ? "enable" : "disable" }
    },
    $isSynchronize: {
      get: function () { return globalData.$data.$isSync },
      set: function (newValue) { globalData.$data.$isSync = newValue }
    }
  }
})
/*
*
* Application Init
*
*/
// eslint-disable-next-line
let app = new Vue({
  render: h => h(App)
}).$mount('#app')
