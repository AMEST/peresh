import Vue from 'vue'
import App from './App.vue'
import Vue2TouchEvents from 'vue2-touch-events'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import langRu from './assets/lang_ru.json'
import langEng from './assets/lang_en.json'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee, faSun, faMoon, faCube, faPlus, faTrash, faArchive, faTasks, faCalendar, faCalendarAlt, faColumns, faPen, faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import './registerServiceWorker'
/*
*
* Configuration init
*
*/
window.addEventListener('beforeinstallprompt', function(event) {
  event.prompt();
})
library.add(faCoffee, faSun, faMoon, faCube, faPlus, faTrash, faArchive, faTasks, faCalendar, faCalendarAlt, faColumns, faPen, faBars)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(Vue2TouchEvents)
Vue.config.productionTip = false
/*eslint-disable */
var lang = undefined
if (localStorage.lang === 'ru') {
  lang = langRu
} else {
  lang = langEng
}
if ((localStorage.bgStyle === undefined) || (localStorage.bgStyle === 'undefined')) {
  localStorage.bgStyle = 'bg-light'
}
if ((localStorage.tasks === undefined) || (localStorage.tasks === 'undefined')) {
  localStorage.tasks = JSON.stringify({})
}
let globalData = new Vue({
  data: {
    $activeMenuItem: "TrackerMain",//((sessionStorage.activeMenuItem === 'undefined')||(sessionStorage.activeMenuItem === undefined)) ? 'TrackerMain' : sessionStorage.activeMenuItem,
    $bgStyle: localStorage.bgStyle,
    $AppName: 'Peresh',
    $currentTask: {"title":"","summary":"","priority":"medium","status":"do","created":new Date().getTime(),"expiry":new Date().getTime()+16000},
    $isAppStarted: ((localStorage.isAppStarted === 'undefined') || (localStorage.isAppStarted === undefined) ? false : localStorage.isAppStarted),
    $isMenuOpened: false
  }
});

Vue.mixin({
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
