<template>
    <div class="entryRow" @click="$emit('edit')">
        <div class="entryDel"
            v-on:click.prevent="$emit('delete')">
            <img src="del.png" alt="X">
        </div>
        <slot />
    </div>
</template>

<script>
export default {
    
}
</script>
