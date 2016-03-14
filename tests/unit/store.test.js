'use strict';

import ava from 'ava';

import storeEng from '../../src/engines/store';

ava('store engine must be defined', t => {
  t.is(typeof storeEng, 'function');
});

ava('storeEngine.get should be are function', t => {
  let se = new storeEng();
  t.is(typeof se.get, 'function');
});
ava('storeEngine.create should be are function', t => {
  let se = new storeEng();
  t.is(typeof se.create, 'function');
});
ava('storeEngine.destroy should be are function', t => {
  let se = new storeEng();
  t.is(typeof se.delete, 'function');
});

ava('storeEngine.create create instance store', t => {
  let se = new storeEng(),
    name = 'Store1',
    dispatcher = () => {};
  se.create(name, dispatcher);

  const store = se.get(name);

  t.is(typeof store, 'object');
  t.is(typeof store.dispatch, 'function');
  t.is(typeof store.getState, 'function');
  t.is(typeof store.subscribe, 'function');
});