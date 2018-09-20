'use strict';

import ava from 'ava';

import router from '../../src/engines/router';
import routerObj from '../../src/engines/router/router';
import routerParse from '../../src/engines/router/parse';

const testRoute = (url, route) => {
  const router = new routerObj({
    routes: {
      [route]: {}
    },
    callback: () => {}
  });

  return Boolean(routerParse(url, router.routers));
};

ava('router engine must be defined', t => {
  t.is(typeof router, 'function');
});
ava('routerEngine.start should be are function', t => {
  let re = router({});
  t.is(typeof re.start, 'function')
});
ava('routerEngine.stop should be are function', t => {
  let re = router({});
  t.is(typeof re.stop, 'function')
});
ava('routerEngine.navigate should be are function', t => {
  let re = router({});
  t.is(typeof re.navigate, 'function')
});
ava('routerEngine.parseQueryParams return params with query string', t => {
  const router = new routerObj({
    routes: {
      '/home': 'home.com/home'
    },
    callback: () => {}
  });

  let re = routerParse('/home?query=asd&other=1', router.routers);

  t.is(typeof re.params, 'object');
  t.is(re.params.query, 'asd');
  t.is(re.params.other, '1');
});
ava('routerEngine.parseQueryParams return params with query string return null params', t => {
  const router = new routerObj({
    routes: {
      '/home': 'home.com/home'
    },
    callback: () => {}
  });

  let re = routerParse('/home', router.routers);

  t.is(typeof re.params, 'object');
  t.is(Object.keys(re.params).length, 0);
});
ava('routerEngine.parseQueryParams return params with query string & url param', t => {
  const router = new routerObj({
    routes: {
      '/home/:id': {}
    },
    callback: () => {}
  });

  let re = routerParse('/home/999?query=asd', router.routers);

  t.is(typeof re.params, 'object');
  t.is(re.params.id, '999');
  t.is(re.params.query, 'asd');
});

ava('url "/" valid for route "/"', t => t.true(testRoute('/', '/')));
ava('url "/tail" invalid for route "/"', t => t.false(testRoute('/tail', '/')));

ava('url "/accounts" valid for route "/accounts"', t => t.true(testRoute('/accounts', '/accounts')));
ava('url "/accounts/" valid for route "/accounts"', t => t.true(testRoute('/accounts/', '/accounts')));
ava('url "/account" invalid for route "/accounts"', t => t.false(testRoute('/account', '/accounts')));
ava('url "/accounts/tail" invalid for route "/accounts"', t => t.false(testRoute('/accounts/tail', '/accounts')));

ava('url "/accounts/1717" valid for route "/accounts/:accountId"',
  t => t.true(testRoute('/accounts/1717', '/accounts/:accountId')));
ava('url "/accounts/1717/" valid for route "/accounts/:accountId"',
  t => t.true(testRoute('/accounts/1717/', '/accounts/:accountId')));
ava('url "/accounts/" invalid for route "/accounts/:accountId"',
  t => t.false(testRoute('/accounts/', '/accounts/:accountId')));
ava('url "/accounts" invalid for route "/accounts/:accountId"',
  t => t.false(testRoute('/accounts', '/accounts/:accountId')));
ava('url "/accounts/1717/companies" invalid for route "/accounts/:accountId"',
  t => t.false(testRoute('/accounts/1717/companies', '/accounts/:accountId')));

ava('url "/accounts/1717/companies/2323" valid for route "/accounts/:accountId/companies/:companyId"',
  t => t.true(testRoute('/accounts/1717/companies/2323', '/accounts/:accountId/companies/:companyId')));
ava('url "/accounts/1717/companies/2323/" valid for route "/accounts/:accountId/companies/:companyId"',
  t => t.true(testRoute('/accounts/1717/companies/2323/', '/accounts/:accountId/companies/:companyId')));
ava('url "/accounts/1717" invalid for route "/accounts/:accountId/companies/:companyId"',
  t => t.false(testRoute('/accounts/1717', '/accounts/:accountId/companies/:companyId')));
ava('url "/accounts/1717/" invalid for route "/accounts/:accountId/companies/:companyId"',
  t => t.false(testRoute('/accounts/1717/', '/accounts/:accountId/companies/:companyId')));
ava('url "/accounts/1717/companies" valid for route "/accounts/:accountId/companies/:companyId"',
  t => t.false(testRoute('/accounts/1717/companies', '/accounts/:accountId/companies/:companyId')));
ava('url "/accounts/1717/companies/" valid for route "/accounts/:accountId/companies/:companyId"',
  t => t.false(testRoute('/accounts/1717/companies/', '/accounts/:accountId/companies/:companyId')));
ava('url "/accounts/1717/companies/2323/trip" invalid for route "/accounts/:accountId/companies/:companyId"',
  t => t.false(testRoute('/accounts/1717/companies/2323/trip', '/accounts/:accountId/companies/:companyId')));

ava('url "/accounts/1717/companies" valid for route "/accounts/:firstId/:secondId"',
  t => t.true(testRoute('/accounts/1717/companies', '/accounts/:firstId/:secondId')));
ava('url "/accounts/1717/companies/" valid for route "/accounts/:firstId/:secondId"',
  t => t.true(testRoute('/accounts/1717/companies/', '/accounts/:firstId/:secondId')));
ava('url "/accounts/1717" invalid for route "/accounts/:firstId/:secondId"',
  t => t.false(testRoute('/accounts/1717', '/accounts/:firstId/:secondId')));
ava('url "/accounts/1717/" invalid for route "/accounts/:firstId/:secondId"',
  t => t.false(testRoute('/accounts/1717/', '/accounts/:firstId/:secondId')));
ava('url "/accounts/1717/companies/2323" invalid for route "/accounts/:firstId/:secondId"',
  t => t.false(testRoute('/accounts/1717/companies/2323', '/accounts/:firstId/:secondId')));

ava('url "/accounts?param=1&baram=2" valid for route "/accounts"',
  t => t.true(testRoute('/accounts?param=1&baram=2', '/accounts')));
ava('url "/accounts?param=baram" invalid for route "/accounts/:param"',
  t => t.false(testRoute('/accounts?param=baram', '/accounts/:param')));
