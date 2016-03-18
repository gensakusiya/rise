'use strict';

import ava from 'ava';

import serviceEng from '../../src/engines/service';

ava('service engine must be defined', t => {
  t.is(typeof serviceEng, 'function');
});

ava('serviceEngine.add should be are function', t => {
  const se = new serviceEng();
  t.is(typeof se.add, 'function')
});
ava('serviceEngine.get should be are function', t => {
  const se = new serviceEng();
  t.is(typeof se.get, 'function')
});

ava('serviceEngine.add.get add service get service instance', t => {
  const se = serviceEng(),
    name = 'Service1',
    constructorService = () => {
    };
  se.add(name, constructorService);

  t.is(typeof se.get(name), 'object')
});
ava('serviceEngine.add.get add service get service singleton instance', t => {
  const se = serviceEng(),
    name = 'Service1',
    constructorService = () => {
    };
  se.add(name, constructorService);

  t.is(se.get(name), se.get(name))
});

ava('serviceEngine.add.get add service get service with mixin function', t => {
  const se = serviceEng({
      getStore: () => {
      }
    }),
    name = 'Service2',
    constructorService = () => {
    };
  se.add(name, constructorService);

  t.is(typeof se.get(name).getStore, 'function')
});
