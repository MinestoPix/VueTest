<template>
    <div>
        <mainInput v-model="text"
        v-on:submit="saveNew"/>
        <span v-show="text">{{entryType}} {{text}}</span>
        <entryList />
    </div>
</template>

<script>
import mainInput from "./components/mainInput.vue";
import entryList from "./components/entryList.vue";
import { setTimeout, clearTimeout } from "timers";
import store from "./store/store.js";

export default {
  store,
  name: "app",
  components: {
    mainInput,
    entryList
  },
  mounted: function() {
    this.$store.dispatch("initEntries");
  },
  /*
  watch: {
    text: function(
      newValue,
      oldValue
    ) {},
        idCounter: function(newValue, oldValue){
            console.log("idCounter updated:", newValue, oldValue)
        }
  },
  */
  methods: {
    saveNew: function() {
      if (this.text) {
        this.$store.dispatch("addEntry", this.text);
        this.text = "";
      }
    }
  },
  computed: {
    entries: function() {
      return this.$store.getters.getEntries;
    }
  },
  data() {
    return {
      text: "",
      entryType: "Quick note:"
    };
  }
};
</script>
