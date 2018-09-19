'use strict';

import ava from 'ava';

import router from '../../src/engines/router';
import routerObj from '../../src/engines/router/router';
import routerParse, { createReg } from '../../src/engines/router/parse';

const testRoute = (url, route) => {
    const reStr= createReg(route);
    const re = new RegExp(reStr);
    const result = re.exec(url);

    return !!result && result[0] === url;
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
      'home': 'home.com/home'
    },
      callback: () => {}
  });

  let re = routerParse('http://home.com/home?query=asd&other=1', router.routers);

  t.is(typeof re.params, 'object');
  t.is(re.params.query, 'asd');
  t.is(re.params.other, '1');
});
ava('routerEngine.parseQueryParams return params with query string return null params', t => {
    const router = new routerObj({
        routes: {
            'home': 'home.com/home'
        },
        callback: () => {}
    });

    let re = routerParse('http://home.com/home', router.routers);

    t.is(typeof re.params, 'object');
    t.is(Object.keys(re.params).length, 0);
});
ava('routerEngine.parseQueryParams return params with query string & url param', t => {
    const router = new routerObj({
        routes: {
            'home/:id': {}
        },
        callback: () => {}
    });

    let re = routerParse('/home/999?query=asd', router.routers);

    t.is(typeof re.params, 'object');
    t.is(re.params.id, '999');
    t.is(re.params.query, 'asd');
});

ava('fn "createReg" - url "/" valid for route "/"', t => t.true(testRoute('/', '/')));
ava('fn "createReg" - url "/tail" invalid for route "/"', t => t.false(testRoute('/tail', '/')));

ava('fn "createReg" - url "/accounts" valid for route "/accounts"', t => t.true(testRoute('/accounts', '/accounts')));
ava('fn "createReg" - url "/accounts/" valid for route "/accounts"', t => t.true(testRoute('/accounts/', '/accounts')));
ava('fn "createReg" - url "/account" invalid for route "/accounts"', t => t.false(testRoute('/account', '/accounts')));
ava('fn "createReg" - url "/accounts/tail" invalid for route "/accounts"', t => t.false(testRoute('/accounts/tail', '/accounts')));

ava('fn "createReg" - url "/accounts/1717" valid for route "/accounts/:accountId"',
        t => t.true(testRoute('/accounts/1717', '/accounts/:accountId')));
ava('fn "createReg" - url "/accounts/1717/" valid for route "/accounts/:accountId"',
        t => t.true(testRoute('/accounts/1717/', '/accounts/:accountId')));
ava('fn "createReg" - url "/accounts/" invalid for route "/accounts/:accountId"',
        t => t.false(testRoute('/accounts/', '/accounts/:accountId')));
ava('fn "createReg" - url "/accounts" invalid for route "/accounts/:accountId"',
        t => t.false(testRoute('/accounts', '/accounts/:accountId')));
ava('fn "createReg" - url "/accounts/1717/companies" invalid for route "/accounts/:accountId"',
        t => t.false(testRoute('/accounts/1717/companies', '/accounts/:accountId')));

ava('fn "createReg" - url "/accounts/1717/companies/2323" valid for route "/accounts/:accountId/companies/:companyId"',
        t => t.true(testRoute('/accounts/1717/companies/2323', '/accounts/:accountId/companies/:companyId')));
ava('fn "createReg" - url "/accounts/1717/companies/2323/" valid for route "/accounts/:accountId/companies/:companyId"',
        t => t.true(testRoute('/accounts/1717/companies/2323/', '/accounts/:accountId/companies/:companyId')));
ava('fn "createReg" - url "/accounts/1717" invalid for route "/accounts/:accountId/companies/:companyId"',
        t => t.false(testRoute('/accounts/1717', '/accounts/:accountId/companies/:companyId')));
ava('fn "createReg" - url "/accounts/1717/" invalid for route "/accounts/:accountId/companies/:companyId"',
        t => t.false(testRoute('/accounts/1717/', '/accounts/:accountId/companies/:companyId')));
ava('fn "createReg" - url "/accounts/1717/companies" valid for route "/accounts/:accountId/companies/:companyId"',
        t => t.false(testRoute('/accounts/1717/companies', '/accounts/:accountId/companies/:companyId')));
ava('fn "createReg" - url "/accounts/1717/companies/" valid for route "/accounts/:accountId/companies/:companyId"',
        t => t.false(testRoute('/accounts/1717/companies/', '/accounts/:accountId/companies/:companyId')));
ava('fn "createReg" - url "/accounts/1717/companies/2323/trip" invalid for route "/accounts/:accountId/companies/:companyId"',
        t => t.false(testRoute('/accounts/1717/companies/2323/trip', '/accounts/:accountId/companies/:companyId')));

ava('fn "createReg" - url "/accounts/1717/companies" valid for route "/accounts/:firstId/:secondId"',
        t => t.true(testRoute('/accounts/1717/companies', '/accounts/:firstId/:secondId')));
ava('fn "createReg" - url "/accounts/1717/companies/" valid for route "/accounts/:firstId/:secondId"',
        t => t.true(testRoute('/accounts/1717/companies/', '/accounts/:firstId/:secondId')));
ava('fn "createReg" - url "/accounts/1717" invalid for route "/accounts/:firstId/:secondId"',
        t => t.false(testRoute('/accounts/1717', '/accounts/:firstId/:secondId')));
ava('fn "createReg" - url "/accounts/1717/" invalid for route "/accounts/:firstId/:secondId"',
        t => t.false(testRoute('/accounts/1717/', '/accounts/:firstId/:secondId')));
ava('fn "createReg" - url "/accounts/1717/companies/2323" invalid for route "/accounts/:firstId/:secondId"',
        t => t.false(testRoute('/accounts/1717/companies/2323', '/accounts/:firstId/:secondId')));
