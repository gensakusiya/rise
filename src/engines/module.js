'use strict';

let modules = {},
  runModules = {},
  moduleDescriptions = {};

const moduleSelector = 'data-module';
const moduleDescriptionSelector = 'data-module-desc';

let ModuleEng = function (opts) {
  this.moduleSelector = (opts && opts.moduleSelector) || moduleSelector;
  this.moduleDescriptionSelector = (opts && opts.moduleDescriptionSelector) || moduleDescriptionSelector;
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
      modulesEl.forEach(el => {
        const moduleName = el.attributes[this.moduleSelector].value,
          moduleDescriptionName = el.attributes[this.moduleDescriptionSelector].value;

        this.create(moduleName, context, {
          box: el,
          description: moduleDescriptions[moduleDescriptionName]
        });
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
