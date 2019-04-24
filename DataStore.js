const Store = require('electron-store')

class DataStore extends Store {
    constructor (settings) {
        // sme as new Store(settings)
        super(settings)

        // initialize with ids or empty array
        this.ids = this.get('ids') || []        
    }

    saveids () {
        // save ids to JSON file
        this.set('ids', this.ids)

        // returning 'this' allows method chaining
        return this
    }

    getids () {
        // set objects ids to ids in JSON file
        this.ids = this.get('ids') || []

        return this
    }

    addid (id) {
        this.ids = [ ...this.ids, id ]

        return this.saveids()
    }

    deleteid (id) {
        // filter out the target id
        this.ids = this.ids.filter(t => t !== id)

        return this.saveids()
    }
}

module.exports = DataStore