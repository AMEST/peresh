<template>
    <main class="h-100vh">
        <top-menu/>
        <div class="container">
            Tracker
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
</style>