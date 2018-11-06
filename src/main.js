import Vue from 'vue'
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import langRu from './assets/lang_ru.json'
import langEng from './assets/lang_en.json'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee, faSun, faMoon, faCube, faPlus, faTrash, faArchive, faTasks, faCalendar, faCalendarAlt, faColumns, faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/*
*
* Configuration init
*
*/
library.add(faCoffee, faSun, faMoon, faCube, faPlus, faTrash, faArchive, faTasks, faCalendar, faCalendarAlt, faColumns, faPen)
Vue.component('font-awesome-icon', FontAwesomeIcon)
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
    $activeMenuItem: ((sessionStorage.activeMenuItem === 'undefined')||(sessionStorage.activeMenuItem === undefined)) ? 'TrackerMain' : sessionStorage.activeMenuItem,
    $bgStyle: localStorage.bgStyle,
    $AppName: 'Peresh',
    $isAppStarted: ((localStorage.isAppStarted === 'undefined') || (localStorage.isAppStarted === undefined) ? false : localStorage.isAppStarted)
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
