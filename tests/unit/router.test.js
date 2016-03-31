'use strict';

import ava from 'ava';

import router from '../../src/engines/router';

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