'use strict';

const changeRoute = (opts, engine, context) => {
  const change = (request) => {
    if (request) {
      const createModules = () => {
        engine.template.render(request.opts.template, opts.pageBox);
        engine.module.createAll(opts.pageBox, context);
      };

      if (typeof opts.beforeModuleInit === 'function') {
        opts.beforeModuleInit(request).then(createModules).catch((e) => {
          throw new Error('before module init pre-hook error', e);
        });
      } else {
        createModules();
      }
    }
  };

  return (request) => {
    if (typeof opts.beforeOnRouteChange === 'function') {
      opts.beforeOnRouteChange(request)
        .then(() => {
          return change(request);
        })
        .catch((e) => {
          throw new Error('by changing the router error', e);
        });
    } else {
      change(request);
    }
  };
};

const renderApp = (opts, engine, context) => {
  engine.template.render(opts.appTemplate, opts.appBox);
  engine.module.createAll(opts.appBox, context);
};

export {changeRoute, renderApp}
