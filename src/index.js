'use strict';

import createCore from './engines';

let context, engine;

/**
 * opts - options object {router: {callback: function, routes: {}}}
 * opts.router.callback - callback on change routes
 * opts.router.routes - application routes
 * opts.pageBox - content page box
 * opts.appBox - application box
 * opts.beforeOnRouteChange - pre hook - call before route changed
 * opts.beforeModuleInit - pre hook - call after route changed but before new module initialized
 */
let Rise = function (opts) {
  this.VERSION = '';

  const core = createCore(opts);
  context = core.context;
  engine = core.engine;
};

Rise.prototype = Object.create({
  start() {

  },
  stop() {

  },

  getNamespace(name) {
    return engine.namespace.get(name);
  },
  getService(name) {
    return engine.service.get(name);
  },
  getStore(name) {
    return engine.store.get(name);
  },

  addModule(name, mObj) {
    return engine.module.add(name, mObj);
  },
  addModuleDescription(name, dObj) {
    return engine.module.addDescription(name, dObj);
  },
  addNamespace(name, nObj) {
    return engine.namespace.add(name, nObj);
  },
  addService(name, sObj) {
    return engine.service.add(name, sObj);
  },
  addStore(name, sObj) {
    return engine.store.add(name, sObj);
  }
});

export default Rise;
