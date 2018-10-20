import Vue from 'vue'
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import langRu from './assets/lang_ru.json'
import langEng from './assets/lang_en.json'
/*
*
* Configuration init
*
*/
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
    $AppName: "Shedule You Do"
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
      get: function(){return ((localStorage.isAppStarted == "undefined")||(localStorage.isAppStarted == undefined)?false:localStorage.isAppStarted)},
      set: function(newValue){localStorage.isAppStarted = newValue;}
    }
  }
})
/*
*
* Application Init
*
*/
let app = new Vue({
  render: h => h(App)
}).$mount('#app')
