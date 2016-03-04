'use strict';

let modules = {},
  moduleDescriptions = {};

let ModuleEng = function () {
};

ModuleEng.prototype = Object.create({
  add(name, moduleObj) {
    let addModule = modules[name];

    if (addModule) throw Error(`Modules must be unique - ${name}`);

    modules[name] = moduleObj;
  },
  get(name) {
    return modules[name];
  },

  createModule(name) {

  }
});

export default function () {
  return new ModuleEng();
}
