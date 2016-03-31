'use strict';

import moduleEngine from './module';

export let Context = () => {
  return {
    Module: moduleEngine()
  };
};
