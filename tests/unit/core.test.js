'use strict';

import ava from 'ava';

import Rise from '../../src';

ava('core must be define', t => {
  let result = Rise;
  t.is(typeof result, 'function');
});
ava('core.start must be function', t => {
  let result = new Rise();
  t.is(typeof result.start, 'function');
});
ava('core.stop must be function', t => {
  let result = new Rise();
  t.is(typeof result.stop, 'function');
});
