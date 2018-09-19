'use strict';

const PARAMPREFIX = ':';
const REGVAR = '/[^/]+';
const REGTAIL = '/?';
const URLSEPARATOR = '/';
const QUERYSEPARATOR = '?';
const QUERYPARAMSEPARATOR = '&';
const QUERYPARAMKEYSEPARATOR = '=';
const URLCREATORHEAD ='/C:';

const getQueryParams = (route) => {
  const routeParts = route.split(QUERYSEPARATOR);

  if (routeParts.length && routeParts[1]) {
    const result = {};

    routeParts[1].split(QUERYPARAMSEPARATOR)
      .forEach(param => {
        const paramPart = param.split(QUERYPARAMKEYSEPARATOR);

        result[paramPart[0]] = paramPart[1];
      });

    return result;
  }

  return null;
};

let createReg = function (route) {
    if (route === '/') return '/';
    if (route === '') return '';
    return `${route
      .split(URLSEPARATOR)
      .filter(item => item)
      .map(item => item.includes(PARAMPREFIX) ? REGVAR : `${URLSEPARATOR}${item}`)
      .join('')}${REGTAIL}`;
  },
  getRouteObj = function (url, routers) {
    for (let route of routers) {
      if (!route[0]) {
        if (!url) {
          return {route: route[0], opts: route[1]};
        }
      } else {
        let routeExp = createReg(route[0]);

        if (routeExp) {
          const a = document.createElement('a');
          a.href = url;
          let pathname = a.pathname;
          if (pathname.includes(URLCREATORHEAD))
            pathname = pathname.slice(URLCREATORHEAD.length);

          const routeReg = new RegExp(routeExp);
          const result = routeReg.exec(pathname);
          const resultMatch = !!result && result[0] === pathname;

          if (resultMatch) {
            return {route: route[0], opts: route[1]};
          }
        } else if (route[0] === url) {
          return {route: route[0], opts: route[1]};
        }
      }
    }
  },
  addUrlParams = function (url, routeOpts) {
    const queryParam = getQueryParams(url);
    const routePart = routeOpts.route.split(URLSEPARATOR);
    const urlPart = queryParam ? url.split(QUERYSEPARATOR)[0].split(URLSEPARATOR) : url.split(URLSEPARATOR);

    let params = {};

    routePart.forEach((part, index) => {
      if (part && part.indexOf(PARAMPREFIX) !== -1) {
        params[part.substring(1)] = urlPart[index];
      }
    });

    routeOpts.params = Object.assign({}, params, queryParam);
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
};

export { createReg };
