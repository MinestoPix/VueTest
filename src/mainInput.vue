<template>
  <input v-bind:id="id" :autofocus="focus" v-model="text" />
</template>

<script>
export default {
  name: 'mainInput',
  data () {
    return {
      text: '',
      id: 'MainInput',
      focus: true
      }
  }
}
</script>