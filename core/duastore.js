class duaStore {
    constructor() {
        this.UserStore = {};
    }

    userStore(key, more={}) {
        this.UserStore[key] = {
            ... more
        }
    }
}

module.exports = duaStore;