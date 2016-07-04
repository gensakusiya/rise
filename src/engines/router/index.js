'use strict';

import Router from './router';

let RouterEngine = function (opts) {
  this.callback = opts.callback;
  this.routes = opts.routes;
};

RouterEngine.prototype = Object.create({
  start() {
    this.runRouter = new Router({
      callback: this.callback,
      routes: this.routes
    });
    this.runRouter.start();
  },
  stop() {
    this.runRouter.stop();
    this.runRouter = null;
  },

  navigate(url) {
    this.runRouter.navigate(url);
  },

  changeUrl(url) {
    Router.changeUrl(url);
  }
});

export default function (options) {
  return new RouterEngine(options);
}
