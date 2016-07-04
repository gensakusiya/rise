'use strict';

import parse from './parse';

let changeRouteEvent = function (e) {
    changeRouteState.call(this, e.state.route);
  },
  changeRouteState = function (route) {
    let parseUrl = parse(route, this.routers);
    this.callback(parseUrl);
  },
  addIteratorOnRouts = (routersObj) => {
    routersObj[Symbol.iterator] = function*() {
      let keys = Object.keys(this);

      for (let key of keys) {
        yield [key, this[key]];
      }
    };
  };

class Router {
  constructor(opts) {
    this.routers = opts.routes;
    this.callback = opts.callback;

    addIteratorOnRouts(this.routers);
  }
  
  start(quiet) {
    if (!quiet) changeRouteState.call(this, window.location.pathname);
    window.addEventListener('popstate', changeRouteEvent.bind(this));
  }
  
  stop() {
    window.removeEventListener('popstate', changeRouteEvent.bind(this));
  }
  
  navigate(newUrl) {
    Router.changeUrl(newUrl);
    changeRouteState.call(this, newUrl);
  }

  static changeUrl(newUrl) {
    window.history.pushState({route: newUrl}, '', newUrl);
  }
}

export default Router;
