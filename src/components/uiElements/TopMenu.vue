<template>
     <nav class="navbar shadow topmenu" v-bind:class="[ $bgStyle , $bgStyle == 'bg-dark'? 'navbar-dark': 'navbar-light']">
        <div class="container">
            <div>
                <a class="d-lg-none navbar-brand" href="#" @click="$isMenuOpened = !$isMenuOpened"> <font-awesome-icon icon="bars" /></a>
                <a class="navbar-brand" href="#" @click="activeMenuItem = 'none'"><img class="topicon" src="../../assets/peresh.png"/> {{ $AppName }}</a>
            </div>
            <div align="right">
                <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                    <button class="btn btn-outline-secondary btn-sm border-0 pr-2" data-toggle="tooltip" data-placement="bottom" v-bind:title="$Lang.createTask" @click="activeMenuItem = 'taskCreateView'"><font-awesome-icon icon="plus" /></button>
                    <div class="dropdown">
                        <button class="btn btn-outline-secondary dropdown-toggle btn-sm border-0 info-but-size" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {{ ($isDropBoxMode)?dropBoxUser:$Lang.localProfile }}
                        </button>
                        <div class="dropdown-menu shadow" aria-labelledby="dropdownMenuButton">
                            <a v-if="$bgStyle=='bg-light'" @click="$bgStyle='bg-dark';uploadToDropBox()" class="dropdown-item" href="#">{{ $Lang.themeTumbler }} <font-awesome-icon icon="moon" /> </a><a v-else @click="$bgStyle='bg-light'" class="dropdown-item" href="#">{{ $Lang.themeTumbler }} <font-awesome-icon icon="sun" /> </a>
                            <a class="dropdown-item" href="#"  @click="activeMenuItem = 'settings'">{{ $Lang.settings }}</a>
                            <a v-if="!$isDropBoxMode" class="dropdown-item" href="#"  v-on:click="goAuthDropBox()">DropBox</a>
                            <a v-if="$isDropBoxMode" class="dropdown-item" href="#" @click="$isDropBoxMode = false">{{ $Lang.exit }}</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>
<script>
export default {
    name:"TopMenu",
    computed:{
        dropBoxUser:{
            get:function(){return localStorage.dropBoxUser}
        }
    }
}
</script>
<style>
    .topmenu{
        position: fixed !important;
        top: 0;
        left: 0;
        z-index: 9999;
        width: 100%;
    }
    .info-but-size{
        max-width: 130px;
        overflow: hidden;
    }
    .topicon{
        padding-bottom: 5px;
        max-width: 20px;
    }
</style>