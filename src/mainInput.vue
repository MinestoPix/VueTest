<template>
  <input id="MainInput" autofocus
    v-bind:value="value"
    v-on:input="$emit('input', $event.target.value)" />
</template>

<script>
export default {
  props: ['value'],
  name: 'mainInput',
  data () {
    return {
      }
  }
}
</script>