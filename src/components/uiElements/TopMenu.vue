<template>
     <nav class="navbar shadow" v-bind:class="[ $bgStyle , $bgStyle == 'bg-dark'? 'navbar-dark': 'navbar-light']">
        <div class="container">
            <a class="navbar-brand" href="#"><font-awesome-icon icon="cube"/> {{ $AppName }}</a>
            <div align="right">
                <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                    <button class="btn btn-outline-secondary btn-sm border-0 pr-2" data-toggle="tooltip" data-placement="bottom" v-bind:title="$Lang.createTask"><font-awesome-icon icon="plus" /></button>
                    <div class="dropdown">
                        <button class="btn btn-outline-secondary dropdown-toggle btn-sm border-0" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {{ $Lang.localProfile }}
                        </button>
                        <div class="dropdown-menu shadow" aria-labelledby="dropdownMenuButton">
                            <a v-if="$bgStyle=='bg-light'" @click="$bgStyle='bg-dark'" class="dropdown-item" href="#">{{ $Lang.themeTumbler }} <font-awesome-icon icon="moon" /> </a><a v-else @click="$bgStyle='bg-light'" class="dropdown-item" href="#">{{ $Lang.themeTumbler }} <font-awesome-icon icon="sun" /> </a>
                            <a class="dropdown-item" href="#">Settings</a>
                            <a class="dropdown-item" href="#">Exit</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>
<script>
export default {
    name:"TopMenu"
}
</script>
