<template>
  <form v-on:submit.prevent="$emit('submit')">
    <input id="MainInput" autofocus
      v-bind:value="value"
      v-on:input="$emit('input', $event.target.value)" />
  </form>
</template>

<script>
export default {
  props: ['value'],
  name: 'mainInput'
}
</script>