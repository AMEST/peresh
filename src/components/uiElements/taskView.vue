<template>
    <div>
        <!--title-->
        <h4 class="mb-4 mt-3"> {{ currentTask.title }}  </h4>
        <!--end-->
        <!--menu-->
        <div class="card" v-bind:class="[ $bgStyle == 'bg-dark'? 'dark-item bg-dark': 'light-item']">
            <div class="card-body">
                <div align="right">
                    <button class="btn btn-outline-secondary btn-sm border-0 pr-2 mr-2" data-toggle="tooltip" data-placement="bottom" v-bind:title="$Lang.editTask"> {{ $Lang.complited }} </button>
                    <button class="btn btn-outline-secondary btn-sm border-0 pr-2 mr-2" data-toggle="tooltip" data-placement="bottom" v-bind:title="$Lang.editTask"> {{ $Lang.editTask }} <font-awesome-icon icon="pen" /></button>
                    <button class="btn btn-outline-secondary btn-sm border-0 pr-2" data-toggle="tooltip" data-placement="bottom" v-bind:title="$Lang.deleteTask">{{ $Lang.deleteTask }} <font-awesome-icon icon="trash" /></button>
                </div>
            </div>
        </div>
        <!--end-->
        <div class="row mt-3">
            <div v-if="currentTask.priority" class="col">{{ $Lang.priority.priority }}: <span class="ml-5 badge badge-secondary">{{ $Lang.priority[currentTask.priority] }}</span></div>
            <div v-if="currentTask.status" class="col">{{ $Lang.status.status }}: <span class="ml-5 badge badge-secondary">{{ $Lang.status[currentTask.status] }}</span></div>
        </div>
        <div class="row mt-2">
            <div v-if="currentTask.priority" class="col">{{ $Lang.creationDate }}</div>
            <div v-if="currentTask.status" class="col">{{ $Lang.endDate }}</div>
        </div>
    </div>
</template>
<script>
export default {
    name:"tasksView"
}
</script>
