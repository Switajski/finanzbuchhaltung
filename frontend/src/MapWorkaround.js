export default class MapWorkaround {
    constructor() {
        this.map = {}
        this.set.bind(this)
        this.get.bind(this)
    }

    set(k, v) {
        this.map['_' + k] = v
    }

    get(k) {
        return this.map['_' + k]
    }
}