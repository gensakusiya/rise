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

  const core = createCore(opts, changeRoute);
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
  navigate(url) {
    engine.router.navigate(url);
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
  addStore(name, reducer, data) {
    return engine.store.create(name, reducer, data);
  }
});

export default Rise;
