'use strict';

let namespace = {};

let Namespace = function () {
};

Namespace.prototype = Object.create({
  add(name, obj) {
    namespace[name] = obj;
  },
  get(name) {
    return namespace[name];
  }
});

export default function () {
  return new Namespace();
}
