'use strict';

import ava from 'ava';

import namespace from '../../src/engines/namespace';

ava('namespace must be defined', t => {
  t.is(typeof namespace, 'function');
});
ava('namespace.add should be are function', t => {
  let result = namespace();
  t.is(typeof result.add, 'function');
});
ava('namespace.get should be are function', t => {
  let result = namespace();
  t.is(typeof result.get, 'function');
});
ava('namespace.add object in namespace', t => {
  let result = namespace(),
    obj = {
      SomeField: 'ffff'
    };
  result.add('SomeObject', obj);
  t.is(result.get('SomeObject'), obj);
});