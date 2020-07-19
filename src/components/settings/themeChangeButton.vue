<template>
    <button  v-if="$bgStyle=='bg-light'" type="button"  @click="$bgStyle='bg-dark'; uploadToDropBox();" class="btn btn-outline-danger btn-sm border-0">{{ $Lang.darkTheme }} <font-awesome-icon icon="moon" /></button>
    <button v-else type="button" @click="$bgStyle='bg-light'; uploadToDropBox();" class="btn btn-outline-danger btn-sm border-0">{{ $Lang.lightTheme }} <font-awesome-icon icon="sun" /></button>
</template>

<script>
export default {
  name: "themeChangeButton",
};
</script>