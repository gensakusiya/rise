'use strict';

const changeRoute = (opts, engine, context) => {
  const change = (request) => {
    if (request) {
      const createModules = () => {
        engine.template.render(request.opts.template, opts.pageBox);
        engine.module.createAll(opts.pageBox, context);
      };

      if (opts.beforeModuleInit instanceof Promise) {
        opts.beforeModuleInit(request).then(createModules).catch(() => {
          throw new Error('before module init pre-hook error');
        });
      } else {
        createModules();
      }
    }
  };

  return (request) => {
    if (opts.beforeOnRouteChange instanceof Promise) {
      opts.beforeOnRouteChange(request)
        .then(() => {
          return change(request);
        })
        .catch(() => {
          throw new Error('by changing the router error');
        });
    } else {
      change(request);
    }
  };
};

const renderApp = () => {
  
};

export {changeRoute, renderApp}
