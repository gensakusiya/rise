'use strict';

const renderPage = {
  renderAppToPage(engine, context, template, opts) {
    engine.module.deleteAll(opts.appBox);

    engine.template.render(opts.appTemplate, opts.appBox);
    engine.template.render(template, opts.pageBox);

    engine.module.createAll(opts.appBox, context);
  },
  renderAppToApp(engine, context, template, opts, isBeforeRoute) {
    if (isBeforeRoute) engine.module.deleteAll(opts.appBox);

    engine.template.render(template, opts.appBox);
    engine.module.createAll(opts.appBox, context);
  },
  renderPageToApp(engine, context, template, opts, isBeforeRoute) {
    if (isBeforeRoute) engine.module.deleteAll(opts.appBox);

    engine.template.render(template, opts.appBox);
    engine.module.createAll(opts.appBox, context);
  },
  renderPageToPage(engine, context, template, opts, isBeforeRoute) {
    if (isBeforeRoute) engine.module.deleteAll(opts.pageBox);

    engine.template.render(template, opts.pageBox);
    engine.module.createAll(opts.pageBox, context);
  }
};

const changeRoute = (opts, engine, context) => {
  const change = (request, beforeRoute) => {
    if (request) {
      const createModules = () => {
        let method = 'renderPageToPage';

        if (beforeRoute) {
          if (beforeRoute.opts.typePage === 'app' && request.opts.typePage === 'page') {
            method = 'renderAppToPage';
          } else if (beforeRoute.opts.typePage === 'page' && request.opts.typePage === 'app') {
            method = 'renderPageToApp';
          } else if (beforeRoute.opts.typePage === 'app' && request.opts.typePage === 'app') {
            method = 'renderAppToApp';
          }
        } else if (request.opts.typePage === 'app') {
          method = 'renderPageToApp';
        }

        renderPage[method](engine, context, request.opts.template, opts, beforeRoute);
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

  return (request, beforeRoute) => {
    if (typeof opts.beforeOnRouteChange === 'function') {
      opts.beforeOnRouteChange(request)
        .then(() => {
          return change(request, beforeRoute);
        })
        .catch((e) => {
          throw new Error('by changing the router error', e);
        });
    } else {
      change(request, beforeRoute);
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
