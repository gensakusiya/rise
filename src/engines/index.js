'use strict';

import moduleEngine from './module';
import namespaceEngine from './namespace';
import serviceEngine from './service';
import storeEngine from './store';
import routerEngine from './router';

import APPCONST from '../const';

const createCore = (opts) => {
  const namespace = namespaceEngine();
  const module = moduleEngine();
  const store = storeEngine();
  const router = routerEngine(opts.router);

  let engine = {
      namespace,
      module,
      store,
      router
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

  return {
    context, engine
  };
};

export {createCore}
