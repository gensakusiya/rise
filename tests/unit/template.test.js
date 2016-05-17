'use strict';

import ava from 'ava';

import templateEng from '../../src/engines/template';

ava('template engine must be defined', t => {
  t.is(typeof templateEng, 'function');
});

ava('template.render should be are function', t => {
  let me = new templateEng();
  t.is(typeof me.render, 'function');
});
