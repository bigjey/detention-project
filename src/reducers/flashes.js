import uuid from 'uuid/v4';

import {FLASHES_ADD, FLASHES_REMOVE, FLASHES_HIDE} from '../actions/flashes';

const defaultState = [];

export default (prevState = defaultState, action) => {
  switch(action.type){
    case FLASHES_ADD:
      return prevState.concat(action.flash);

    case FLASHES_REMOVE:
      var {id} = action;
      return prevState.filter(flash => flash.id !== id);

    case FLASHES_HIDE:
      var {id} = action;
      return prevState.map(flash => {
        if (flash.id === id) {
          return {
            ...flash,
            open: false
          }
        };

        return flash;
      });

    default:
      return prevState;
  }
}