import Vue from 'vue'
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import langRu from './assets/lang_ru.json'
import langEng from './assets/lang_en.json'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee, faSun, faMoon, faCube, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
 
/*
*
* Configuration init
*
*/
library.add(faCoffee, faSun, faMoon, faCube, faPlus)
 
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false
if(localStorage.lang == "ru"){
  var lang = langRu;
}else{
  var lang = langEng;
}
if((localStorage.bgStyle == undefined) || (localStorage.bgStyle == "undefined")){
  localStorage.bgStyle = "bg-light"
}
let globalData = new Vue({
  data: { 
    $bgStyle: localStorage.bgStyle,
    $AppName: "Peresh",
    $isAppStarted: ((localStorage.isAppStarted == "undefined")||(localStorage.isAppStarted == undefined)?false:localStorage.isAppStarted)
  }
});
Vue.mixin({
  computed: {
    $bgStyle: {
      get: function () { return globalData.$data.$bgStyle},
      set: function (newColor) { globalData.$data.$bgStyle = newColor; localStorage.bgStyle = newColor;}
    },
    $textStyle:{ get: function(){return (globalData.$data.$bgStyle == "bg-dark")?"text-light":"text-dark"}},
    $AppName:{ get: function(){return globalData.$data.$AppName}},
    $Lang:{ get: function(){return lang}},
    $isAppStarted:{ 
      get: function(){return globalData.$data.$isAppStarted},
      set: function(newValue){globalData.$data.$isAppStarted=newValue; localStorage.isAppStarted = newValue;}
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
