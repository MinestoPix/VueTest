import Vue from 'vue';
import Vuex from 'vuex';
import storage from 'electron-json-storage';
import types from './types.js'


Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        // TODO entries should be a Map
        entries: [],
        hiId: 0,
        editId: null
    },
    getters: {
        // TODO Getters should have "entries" name instead of "getEntries"
        getEntries: function (state) {
            return state.entries
        },
        getEntryById: (state) => {
            (id) => {
                return state.entries.find(entry => {
                    return entry.id == id
                })
            }
        },
        getHighestEntryId(state) {
            if (state.hiId) {
                return state.hiId
            } else {
                var hi = 0
                state.entries.map(entry => {
                    if (hi < entry.id) hi = entry.id
                })
                return hi
            }
        },
        editId(state) {
            return state.editId
        }
    },
    mutations: {
        setEntries: function (state, entries) {
            state.entries = entries
        },
        setEntryText: function(state, payload){
            state.entries[state.entries.indexOf(payload.entry)].text = payload.text
        },
        deleteEntry: function(state, entry){
            state.entries.splice(state.entries.indexOf(entry), 1)
        },
        setHiId: function (state, hiId) {
            state.hiId = hiId
        },
        incrementId: function (state) {
            state.hiId++
        },
        setEditId(state, id) {
            state.editId = id
        },
        clearEditId(state) {
            state.editId = null
        }
    },
    actions: {
        // Get entries from storage
        [types.INIT_ENTRIES]: function (context) {
            storage.get("notes", (err, data) => {
                if (err) {
                    console.log(err);
                } else if (data.noteArr instanceof Array) {
                    context.commit('setEntries', data.noteArr);
                    context.commit('setHiId', context.getters.getHighestEntryId)
                } else {
                    console.log("store.js action initEntries:\nCannot fetch noteArr from notes", data)
                }
            });
        },
        deleteEntry: function (context, value) {
            context.entries.splice(context.entries.indexOf(value), 1);
            context.commit('setEntries', context.entries)
            storage.get("notes", (err, data) => {
                if (err) {
                    console.log(err);
                } else if (data) {
                    data.noteArr = context.entries;
                    storage.set("notes", data, err => {
                        if (err) {
                            console.log(err);
                        }
                    });
                }
            });
        },
        addEntry: function (context, value) {
            var hiId = context.getters.getHighestEntryId + 1
            context.state.entries.push({
                id: hiId,
                text: value
            });
            storage.get("notes", (err, data) => {
                if (err) {
                    console.log(err);
                } else if (data) {
                    if (data.noteArr) {
                        data.noteArr.push({
                            id: hiId,
                            text: value
                        });
                    } else {
                        data.noteArr = [{
                            id: hiId,
                            text: value
                        }]
                    }
                    storage.set("notes", data, err => {
                        if (err) {
                            console.log(err);
                        } else {
                            context.commit('incrementId')
                        }
                    });
                }
            });
        },
        saveEntry: function(context, newValue, oldValue){
            
        },
        saveEntries: function(context){
            // console.log("store.js: Saving Entries")
            storage.get("notes", (err, data) => {
                if (err) {
                    console.log(err);
                } else if (data) {
                    data.noteArr = context.getters.getEntries
                    storage.set("notes", data, err => {
                        if (err) {
                        console.log(err);
                        }
                    });
                }
            });
        }
    }
})
export default store