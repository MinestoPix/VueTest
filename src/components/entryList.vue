<template>
    <ul id="entryList">
        <entryRow v-bind:key="value.id"
                  v-bind:value="value.text"
                  v-on:input="onInput($event, value)"
                  v-on:delete="deleteEntry(value)"
                  v-on:edit="editEntry(value.id)"
                  v-on:submit="submitEntry(value)"
                  :myId="value.id"
                  :editingId="editId"
                  v-for="value in entries">
            {{value.text}}
        </entryRow>
    </ul>
</template>

<script>
import entryRow from "./entryRow.vue";
import { setTimeout, clearTimeout } from "timers";

export default {
  components: {
    entryRow
  },
  watch: {
    entries: function(newValue, oldValue) {
      /*
      console.log("Entries changed", newValue)
      console.log("Starting Timeout")
      if(this.timeoutID){
        clearTimeout(this.timeoutID)
      }
      this.timeoutID = setTimeout(this.saveEntries, 5000, newValue)
      */
    }
  },
  methods: {
    editEntry: function(id) {
      this.$store.commit("setEditId", id);
    },
    submitEntry: function() {
      if (this.editId !== null) {
        this.$store.commit("clearEditId");
        this.saveEntriesSlow();
      }
    },
    onInput: function(text, entry) {
      // console.log("onInput ran with text:", text, " and entry:", entry)
      var payload = { entry, text };
      this.$store.commit("setEntryText", payload);
      this.saveEntriesSlow();
    },
    saveEntriesSlow: function() {
      if (this.timeoutID) {
        clearTimeout(this.timeoutID);
      }
      this.timeoutID = setTimeout(this.saveEntries, 2000);
    },
    saveEntries: function() {
      console.log("Entries saved");
      this.$store.dispatch("saveEntries");
      this.timeoutID = null;
    },
    deleteEntry: function(entry) {
      this.$store.commit("deleteEntry", entry);
    }
  },
  computed: {
    entries: function() {
      return this.$store.getters.getEntries;
    },
    editId: function() {
      return this.$store.getters.editId;
    }
  },
  data() {
    return {
      timeoutID: null
    };
  }
};
</script>
