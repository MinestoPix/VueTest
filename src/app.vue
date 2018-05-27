<template>
    <div>
        <mainInput v-model="text" />
        {{text}}
    </div>
</template>

<script>
import mainInput from './mainInput.vue'

export default {
    name:'app',
    components: {
        mainInput
    },
    data() {
        return {
            text: ""
        }
    }
}
</script>
