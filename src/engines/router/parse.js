'use strict';

const PARAMPREFIX = ':';
const REGALL = '.*';
const URLSEPARATOR = '/';

let createReg = function (route) {
    let routePart = route.split(URLSEPARATOR),
      result = '';

    routePart.forEach(part => {
      if (part && part.indexOf(PARAMPREFIX) === -1) {
        result += part + REGALL;
      }
    });

    return result;
  },
  getRouteObj = function (url, routers) {
    for (let route of routers) {
      if (!route) {
        if (!url) {
          return {route, opts: routers[route]};
        }
      } else {
        let routeExp = createReg(route);

        if (routeExp) {
          let routeReg = new RegExp(routeExp),
            resultMatch = routeReg.test(url);

          if (resultMatch) {
            return {route, opts: routers[route]};
          }
        } else if (route === url) {
          return {route, opts: routers[route]};
        }
      }
    }
  },
  addUrlParams = function (url, routeOpts) {
    let routePart = routeOpts.route.split(URLSEPARATOR),
      urlPart = url.split(URLSEPARATOR),
      params = {};

    routePart.forEach((part, index) => {
      if (part && part.indexOf(PARAMPREFIX) !== -1) {
        params[part.substring(1)] = urlPart[index];
      }
    });

    routeOpts.params = params;
  };

/**
 * parse url string
 * @param url {string} - changed url
 * @param routers {object} - app routers
 * @returns {{route, opts, params}}
 */
export default function (url, routers) {
  let result = getRouteObj(url, routers);

  if (result) {
    addUrlParams(url, result);
  }

  return result;
}
