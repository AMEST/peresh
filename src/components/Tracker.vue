<template>
    <main class="h-100vh">
        <top-menu/>
        <div class="container-fluid h-100 mx-auto max-fluid-container-width">
            <div class="row h-100"> 
                <div class="d-none d-sm-none d-md-none d-lg-block col w-25 inrow-menu pt-4">
                    menu
                </div>
                <div class="col work-shadow pt-4">
                    work
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import TopMenu from './uiElements/TopMenu.vue'
export default {
  name: 'Tracker',
  components:{
      TopMenu
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
</style>