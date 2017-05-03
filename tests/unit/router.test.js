'use strict';

import ava from 'ava';

import router from '../../src/engines/router';
import routerObj from '../../src/engines/router/router';
import routerParse from '../../src/engines/router/parse';

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
    
    let re = routerParse('home/999?query=asd', router.routers);
    
    t.is(typeof re.params, 'object');
    t.is(re.params.id, '999');
    t.is(re.params.query, 'asd');
});
