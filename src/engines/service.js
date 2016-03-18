'use strict';

let services = {},
  runServices = {},
  mixin;

let ServiceEngine = function () {
};

let createService = (name) => {
  if (!runServices[name]) {
    let constructor = services[name];

    if (mixin) {
      constructor.prototype = Object.create(mixin);
    }

    runServices[name] = new constructor();
  }

  return runServices[name];
};

ServiceEngine.prototype = Object.create({
  add(name, constructor) {
    services[name] = constructor;
  },
  get(name) {
    return createService(name);
  }
});

export default function (prototypeMixin) {
  mixin = prototypeMixin;
  return new ServiceEngine();
}
