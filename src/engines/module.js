'use strict';

let modules = {},
  runModules = {},
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

  createModule(name, context) {
    if (!name) return null;

    let constructorModule = modules[name],
      instance = runModules[name],
      createModuleInstance = () => {
        runModules[name] = new constructorModule(name, context);
      },
      newModule;

    if (!constructorModule) return null;

    if (instance && typeof instance.refresh === 'function') {
      newModule = instance.refresh(context);
    } else if (instance && !instance.refresh) {
      this.destroyModule(name);
      createModuleInstance(name, context);
    } else {
      createModuleInstance(name, context);
    }

    return runModules[name];
  },

  destroyModule(name) {
    let instance = runModules[name];

    if (typeof instance.destroy === 'function') {
      instance.destroy();
    }

    delete runModules[name];
  }
});

export default function () {
  return new ModuleEng();
}
