import {combineReducers} from 'redux';

import accounts from './accounts';
import transactions from './transactions';
import flashes from './flashes';
import auth from './auth';
import categories from './categories';
import categoryForm from './categoryForm';

export default combineReducers({
  accounts, 
  transactions,
  flashes,
  auth,
  categories,
  categoryForm
});