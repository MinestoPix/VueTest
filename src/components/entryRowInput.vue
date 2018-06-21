<template>
    <form v-on:submit.prevent="$emit('submit')">
        <input class="editInput entryRow" ref="rowInput"
            v-bind:value="value"
            v-on:input="$emit('input', $event.target.value)"
            v-on:blur="$emit('submit', value.id)" />
    </form>
</template>

<script>
export default {
    props: ["value"],
    mounted(){
        this.$refs.rowInput.focus()
    }
}
</script>
