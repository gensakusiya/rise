'use strict';

const changeRoute = (opts, engine, context) => {
  const change = (request) => {
    if (request) {
      const createModules = () => {
        const box = request.opts.typePage === 'app' ? opts.appBox : opts.pageBox;

        engine.module.deleteAll(box);
        engine.template.render(request.opts.template, box, opts.appBox);
        engine.module.createAll(box, context);
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
