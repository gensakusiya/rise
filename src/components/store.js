'use strict';

import ACTION from '../const/action';

let Store = function (reducer, initialState) {
  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.');
  }

  let currentState = initialState;
  let currentReducer = reducer;
  let listeners = [];
  let isDispatching = false;

  this.getState = function () {
    return currentState;
  };

  this.subscribe = function (listener) {
    listeners.push(listener);
    let isSubscribe = true;

    return function unsubscribe() {
      if (!isSubscribe) {
        return false;
      }

      isSubscribe = false;
      let index = listeners.indexOf(listener);
      listeners.splice(index, 1);
    }
  };

  this.dispatch = function (action) {
    if (action.type === undefined) {
      throw new Error('action type must be defined');
    }

    if (isDispatching) {
      throw new Error('not may dispatch action');
    }

    try {
      isDispatching = true;
      currentState = currentReducer(action, currentState);
    } finally {
      isDispatching = false;
    }

    listeners.slice().forEach(listener => listener(currentState));
    return action;
  };

  this.dispatch({type: ACTION.STORE_INIT});
};

export default Store;
