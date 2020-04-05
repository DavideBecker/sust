class Store {
  _loadStore() {
    const storage = localStorage.getItem("store");

    if (storage) {
      try {
        this._populate(JSON.parse(storage));
      } catch (err) {
        localStorage.setItem("store", "{}");
        console.error("Could not parse persistent storage", storage, err);
      }
    } else {
      localStorage.setItem("store", "{}");
    }

    console.log("[🏬 STORE•LOAD] Loaded store", this._data);
  }

  _saveStore() {
    console.log("[🏬 STORE•SAVE] Saving store", this._data);
    localStorage.setItem("acnh", JSON.stringify(this._data));
  }

  _populate(data) {
    this._data = Object.assign({}, this._data, data);
  }

  _set(key, value) {
    this._data[key] = value;
    this._saveStore();
    return this._data[key];
  }

  constructor() {
    this._subscriptions = {};
    this._data = {};
    this._actions = {};
    this._loadStore();
  }

  addAction(key, func) {
    this._actions[key] = func;
  }

  invoke(key) {
    if (["function", "object"].indexOf(typeof this._actions[key]))
      return this._actions[key];
    else return () => false;
  }

  populate(obj) {
    Object.keys(obj).forEach(key => this.set(key, obj[key]));
  }

  set(key, value) {
    this._set(key, value);
    console.log("[🏬 STORE•SET] Setting", key, "to", value);
    return this.pub(key);
  }

  get(key) {
    console.log("[🏬 STORE•GET] Getting", key, " -> ", this._data[key]);
    return this._data[key];
  }

  increment(key, diff) {
    this._set(key, this._data[key] + diff);
    console.log(
      "[🏬 STORE•INC] Incrementing",
      key,
      "by",
      diff,
      "(New value: ",
      this._data[key],
      ")"
    );
    return this.pub(key);
  }

  push(key, ...elems) {
    key.push(elems);
    console.log(
      "[🏬 STORE•PUSH] Pushed",
      elems,
      "to",
      key,
      "(New value: ",
      this._data[key],
      ")"
    );
    return this.pub(key);
  }

  sub(key, callback) {
    console.log("[🏬 STORE•SUB 👂] Subscribing to", key);
    this._subscriptions[key] = callback;
  }

  unsub(key) {
    console.log("[🏬 STORE•UNSUB] Unsubscribing from", key);
    delete this._subscriptions[key];
  }

  pub(key) {
    console.log("[🏬 STORE•PUB] Calling events for", key);
    if (this._subscriptions[key])
      return this._subscriptions[key](this._data[key]);
    else return false;
  }
}

export default new Store();
