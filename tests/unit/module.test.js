'use strict';

import ava from 'ava';

import moduleEng from '../../src/engines/module';

ava('module engine must be defined', t => {
  t.is(typeof moduleEng, 'function');
});

ava('moduleEngine.add should be are function', t => {
  let me = new moduleEng();
  t.is(typeof me.add, 'function');
});
ava('moduleEngine.get should be are function', t => {
  let me = new moduleEng();
  t.is(typeof me.get, 'function');
});
ava('moduleEngine.add add new module, get function constructor', t => {
  let me = new moduleEng(),
    myModule = () => {},
    nameModule = 'SimpleModule';

  me.add(nameModule, myModule);
  t.is(typeof me.get(nameModule), 'function');
});
ava('moduleEngine.add add second module, throws error', t => {
  let me = new moduleEng(),
    myModule = () => {},
    nameModule = 'SimpleModule1';

  me.add(nameModule, myModule);

  t.throws(() => {
    me.add(nameModule, myModule)
  });
});

ava('moduleEngine.createModule create module return instance', t => {
  let me = new moduleEng(),
    myModule = () => {},
    nameModule = 'SimpleModule2';

  me.add(nameModule, myModule);
  let mod = me.createModule(nameModule, {});

  t.is(typeof mod, 'object');
});
ava('moduleEngine.createModule create module return null in null name', t => {
  let me = new moduleEng();

  let mod = me.createModule('', {});

  t.is(mod, null);
});
ava('moduleEngine.createModule create module return null if constructor not found', t => {
  let me = new moduleEng();

  t.is(me.createModule('S4', {}), null);
});