'use strict';

import Store from '../components/store';

let stores = {};

let StoreEngine = function () {
  stores = {};
};

StoreEngine.prototype = Object.create({
  get(name) {
    return stores[name];
  },

  create(name, reducer, data) {
    let store = stores[name];

    if (store) throw new Error(`${name} this store created`);

    stores[name] = new Store(reducer, data);
    return stores[name];
  },
  delete(name) {
    let store = stores[name];

    if (store) {
      store && store.destroy && store.destroy();
      delete stores[name];
    }
  }
});

export default function () {
  return new StoreEngine();
};