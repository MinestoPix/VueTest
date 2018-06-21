<template>
    <li>
        <component v-bind:is="editing"
        v-on:delete="$emit('delete')"
        v-on:edit="$emit('edit')"
        v-on:input="$emit('input', $event)"
        v-on:submit="$emit('submit')"
        v-bind:value="value">
            <slot></slot>
        </component>
    </li>
</template>

<script>
import entryRowInput from "./entryRowInput.vue"
import entryRowText from "./entryRowText.vue"

export default {
    props: ["myId", "editingId", "value"],
    computed: {
        editing: function(){
            return this.myId === this.editingId ? entryRowInput : entryRowText
        }
    }
};
</script>
