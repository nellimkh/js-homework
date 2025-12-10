function ensureRepositoryInterface(obj) {
    const required = ["add", "remove", "find", "findAll"];
    for (let method of required) {
        if (typeof obj[method] !== "function") {
            throw new Error(`Missing required method: ${method}()`);
        }
    }
}

class BaseRepository {
    constructor() {
        if (new.target === BaseRepository) {
            throw new Error("BaseRepository is abstract");
        }
        this._items = [];
        this._idCounter = 1;
    }
}
class UserRepository extends BaseRepository {
    constructor() {
        super();
        ensureRepositoryInterface(this);
    }

    add(item) {
        item.id = this._idCounter++;
        this._items.push(item);
        console.log("User added:", item);
        return item.id;
    }

    remove(id) {
        const index = this._items.findIndex(i => i.id === id);
        if (index === -1) return false;
        const removed = this._items.splice(index, 1)[0];
        console.log("User removed:", removed);
        return true;
    }

    find(id) {
        return this._items.find(i => i.id === id) || null;
    }

    findAll() {
        return [...this._items];
    }
}
class ProductRepository extends BaseRepository {
    constructor() {
        super();
        ensureRepositoryInterface(this);
    }

    add(item) {
        item.id = this._idCounter++;
        this._items.push(item);
        console.log("Product added:", item);
        return item.id;
    }

    remove(id) {
        const index = this._items.findIndex(i => i.id === id);
        if (index === -1) return false;
        const removed = this._items.splice(index, 1)[0];
        console.log("Product removed:", removed);
        return true;
    }

    find(id) {
        return this._items.find(i => i.id === id) || null;
    }

    findAll() {
        return [...this._items];
    }
}
class ProductRepository extends BaseRepository {
    constructor() {
        super();
        ensureRepositoryInterface(this);
    }

    add(item) {
        item.id = this._idCounter++;
        this._items.push(item);
        console.log("Product added:", item);
        return item.id;
    }

    remove(id) {
        const index = this._items.findIndex(i => i.id === id);
        if (index === -1) return false;
        const removed = this._items.splice(index, 1)[0];
        console.log("Product removed:", removed);
        return true;
    }

    find(id) {
        return this._items.find(i => i.id === id) || null;
    }

    findAll() {
        return [...this._items];
    }
}
