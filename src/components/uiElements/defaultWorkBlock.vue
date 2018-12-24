<template>
  <div class="row align-items-center h-100vh-dwb">
    <div class="col text-center">
        <font-awesome-icon style="font-size: 5em" class="mb-2" icon="columns" /><br>
        <button class="btn btn-outline-danger border-0 mb-1 button-default-width" type="button" @click="activeMenuItem = 'taskCreateView'">{{ $Lang.createTask }}</button><br>
        <button class="btn btn-outline-danger border-0 mb-1 button-default-width" type="button" @click="activeMenuItem = 'tasksList'">{{ $Lang.menu.tasksList.text }}</button><br>
        <button class="btn btn-outline-danger border-0 button-default-width" type="button"  @click="activeMenuItem = 'settings'">{{ $Lang.settings }}</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "defaultWorkBlock"
};
</script>
<style>
    .h-100vh-dwb{
        height: calc( 100vh - 81px );
    }
    .button-default-width{
        width: 200px;
    }
</style>
