'use strict';

import moduleEngine from './module';
import namespaceEngine from './namespace';
import serviceEngine from './service';
import storeEngine from './store';
import routerEngine from './router';
import templateEngine from './template';

import APPCONST from '../const';

const createCore = (opts, changeRoute) => {
  const namespace = namespaceEngine();
  const module = moduleEngine();
  const store = storeEngine();
  const template = templateEngine();

  let engine = {
      namespace,
      module,
      store,
      template
    },
    context;

  engine.service = serviceEngine({
    getStore(name) {
      return engine.store.get(name);
    }
  });

  context = {
    getNamespace(name) {
      return engine.namespace.get(name);
    },
    getStore(name) {
      return engine.store.get(name);
    },
    getService(name) {
      return engine.service.get(name);
    },

    getConst() {
      return APPCONST;
    },

    navigate(url) {
      return engine.router.navigate(url);
    }
  };

  opts.router.callback = changeRoute(opts, engine, context);
  engine.router = routerEngine(opts.router);

  return {
    context, engine
  };
};

export {createCore}
