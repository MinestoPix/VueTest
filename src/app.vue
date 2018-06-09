<template>
    <div>
        <mainInput v-model="text"
            v-on:submit="saveAndDelete" />
        <span v-show="text">{{entryType}} {{text}}</span>
        <ul>
            <li v-bind:key="index" v-for="(value, index) in entries">{{value}}</li>
        </ul>
    </div>
</template>

<script>
import mainInput from './mainInput.vue'
import storage from 'electron-json-storage'
import { strictEqual } from 'assert';

export default {
    name:'app',
    components: {
        mainInput
    },
    watch: {
        text: function(newValue, oldValue){
            this.entryType="Quick note:"
        }
    },
    methods: {
        saveAndDelete: function(){
            this.entries.push(this.text)
            storage.get("notes", (err, data) => {
                if (err){
                    console.log(err)
                }else if(data){
                    var newArr = data.noteArr
                    newArr.push(this.text)
                    storage.set("notes", {noteArr: newArr}, err => {
                        if (err){
                            console.log(err)
                        }else{
                            this.text=""
                        }
                    })
                }
            })
        }
    },
    mounted: function(){
        storage.get("notes", (err, data) => {
            if (err){
                console.log(err)
            }else if(data){
                this.entries = data.noteArr
            }
        })
    },
    data() {
        return {
            text: "",
            entryType: "",
            entries: []
        }
    }
}
</script>
