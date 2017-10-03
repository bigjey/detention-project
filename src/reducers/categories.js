import uuid from 'uuid/v4';

import {CATEGORY_ADD, CATEGORY_REMOVE, CATEGORY_RESTORE, CATEGORY_EDIT} from '../actions/categories';

const defaultState = [
  {
    id: uuid(),
    type: 'income',
    name: 'pimping',
    deleted: false
  }, {
    id: uuid(),
    type: 'income',
    name: 'gambling',
    deleted: false
  }, {
    id: uuid(),
    type: 'expense',
    name: 'pimping',
    deleted: false
  }, {
    id: uuid(),
    type: 'income',
    name: 'hitting',
    deleted: false
  }, {
    id: uuid(),
    type: 'expense',
    name: 'drugs',
    deleted: false
  }
];

export default (prevState = defaultState, action) => {
  switch(action.type) {
    case CATEGORY_ADD:
      return prevState.concat(action.data)

    case CATEGORY_REMOVE: {
      const {id} = action;
      return prevState.map((el) => {
        if(el.id === id) {
          return {
            ...el,
            deleted: true
          }
        }
        return el
      })
    }

    case CATEGORY_RESTORE: {
      const {id} = action;
      return prevState.map((el) => {
        if(el.id === id) {
          return {
            ...el,
            deleted: false
          }
        }
        return el
      })
    }

    case CATEGORY_EDIT: {
      const {id} = action;
      return prevState.map(item => {
        if (item.id === id) {
          return {
            ...action.data,
            id: item.id
          };
        }

        return item;
      })
    }

    default:
      return prevState;
  }
}