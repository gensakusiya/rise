'use strict';

import {createCore} from './engines';
import {changeRoute, renderApp} from './core';

let context = null, engine = null;

/**
 * opts - options object {router: {routes: {}}}
 * opts.router.routes - application routes
 * opts.pageBox - content page box
 * opts.appBox - application box
 * opts.appTemplate - application template
 * opts.beforeOnRouteChange (Promise) - pre hook - call before route changed
 * opts.beforeModuleInit (Promise) - pre hook - call after route changed but before new module initialized
 */
let Rise = function (opts) {
  this.VERSION = '';
  this.settings = opts;

  opts.router.callback = changeRoute(this.settings, engine, context);

  const core = createCore(opts);
  context = core.context;
  engine = core.engine;
};

Rise.prototype = Object.create({
  start() {
    renderApp(this.settings, engine, context);
    engine.router.start();
  },
  stop() {
    engine.router.stop();
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
