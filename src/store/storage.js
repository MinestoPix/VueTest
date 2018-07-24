import storage from "electron-json-storage"

export default class Storage {
    constructor() {
      storage.get("notes", (err, data) => {
        if (err) {
          console.log(err);
        } else if (data.noteArr instanceof Array) {
          this.data = data
          context.commit("setHiId", context.getters.getHighestEntryId);
        } else {
          console.log(
            "store.js action initEntries:\nCannot fetch noteArr from notes",
            data
          );
        }
      });
    }

};
