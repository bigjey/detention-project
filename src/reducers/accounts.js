import {ACCOUNTS_CREATE, ACCOUNTS_UPDATE} from '../actions/accounts';

const defaultState = [
  {
    id: 1,
    balance: 0,
    name: 'Salary'
  }, {
    id: 2,
    balance: 200,
    name: 'Savings'
  }
];

export default (prevState = defaultState, action) => {
  switch(action.type){
    case ACCOUNTS_CREATE:
      return prevState.concat(action.data);

    case ACCOUNTS_UPDATE:
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

    default:
      return prevState;
  }
}