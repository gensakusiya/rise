'use strict';

let modules = {},
  runModules = {},
  moduleDescriptions = {};

const MODULESELECTOR = 'data-module';
const MODULEDESCRIPTIONSELECTOR = 'data-module-desc';

let ModuleEng = function (opts) {
  this.moduleSelector = (opts && opts.moduleSelector) || MODULESELECTOR;
  this.moduleDescriptionSelector = (opts && opts.moduleDescriptionSelector) || MODULEDESCRIPTIONSELECTOR;
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

  addDescription(name, descriptionObj) {
    moduleDescriptions[name] = descriptionObj;
  },
  getDescription(name) {
    return moduleDescriptions[name];
  },

  createAll(box, context) {
    let modulesEl = null;

    if (typeof box === 'string') {
      modulesEl = document.querySelector(box).querySelectorAll(`[${this.moduleSelector}]`);
    } else {
      modulesEl = box.querySelectorAll(`[${this.moduleSelector}]`);
    }

    if (modulesEl && modulesEl.length) {
      if (!modulesEl.forEach) modulesEl.forEach = Array.prototype.forEach;

      modulesEl.forEach(el => {
        const moduleName = el.attributes[this.moduleSelector].value;
        const moduleDescriptorAttr = el.attributes[this.moduleDescriptionSelector];
        const moduleDescriptionName = moduleDescriptorAttr ? moduleDescriptorAttr.name : {};

        this.create(moduleName, context, {
          box: el,
          description: moduleDescriptions[moduleDescriptionName]
        });
      });
    }
  },
  deleteAll(box) {
    let modulesEl = null;

    if (typeof box === 'string') {
      modulesEl = document.querySelector(box).querySelectorAll(`[${this.moduleSelector}]`);
    } else {
      modulesEl = box.querySelectorAll(`[${this.moduleSelector}]`);
    }

    if (modulesEl && modulesEl.length) {
      if (!modulesEl.forEach) modulesEl.forEach = Array.prototype.forEach;
      
      modulesEl.forEach(el => {
        const moduleName = el.attributes[this.moduleSelector].value;
        this.destroyModule(moduleName);
      });
    }
  },

  create(name, context, opts) {
    if (!name) return null;

    let constructorModule = modules[name],
      instance = runModules[name],
      createModuleInstance = () => {
        runModules[name] = new constructorModule(name, context, opts);
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

    if (instance && typeof instance.destroy === 'function') {
      instance.destroy();
    }

    delete runModules[name];
  }
});

export default function () {
  return new ModuleEng();
}
