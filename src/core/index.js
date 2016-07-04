'use strict';

const changeRoute = (opts, engine, context) => {
  const renderBox = opts.pageBox;

  const change = (request) => {
    if (request) {
      const createModules = () => {
        engine.template.render(request.opts.template, renderBox, opts.appBox);
        engine.module.createAll(renderBox, context);
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

const renderNotAuth = (opts, engine, context, url) => {
  engine.router.changeUrl(url);

  changeRoute(opts, engine, context, opts.appBox);

  engine.router.start(true);
};

export {changeRoute, renderApp, renderNotAuth}
