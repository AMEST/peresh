<template>
    <div>
        <h4 class="text-center mb-4">{{ $Lang.menu.tasksList.text }}</h4>
        <ul class="list-group">
            <li v-for="(item , key) in tasks" :key="item, key" v-bind:id="key" class="list-group-item d-flex justify-content-between align-items-center" v-bind:class="[ $bgStyle == 'bg-dark'? 'dark-item bg-dark': 'light-item']">
                <span class="pointer"  @click="currentTask = item, activeMenuItem = 'taskView'">{{ item.title }}</span>
                <div>
                <button class="btn btn-outline-secondary btn-sm border-0 pr-2 mr-2" data-toggle="tooltip" data-placement="bottom" v-bind:title="$Lang.editTask"><font-awesome-icon icon="pen" /></button>
                <button class="btn btn-outline-secondary btn-sm border-0 pr-2" data-toggle="tooltip" data-placement="bottom" v-bind:title="$Lang.deleteTask"><font-awesome-icon icon="trash" /></button>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name:"tasksList",
    props: ["tasks"]
}
</script>
