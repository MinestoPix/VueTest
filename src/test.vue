<template>
  <input v-bind:id="main" :autofocus="focus" v-model="text" />
</template>

<script>
export default {
  name: 'test',
  data () {
    return {
      text: '',
      main: 'MainInput',
      focus: true
      }
  }
}
</script>