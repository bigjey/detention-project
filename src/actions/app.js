import { fetchAccounts } from './accounts';
import { fetchCategories } from './categories';
import { fetchTransactions } from './transactions';

export const SET = 'SET';

export const fetchData = () => (dispatch) => {
  const promises = [
    dispatch(fetchAccounts()),
    dispatch(fetchCategories()),
    dispatch(fetchTransactions()),
  ];

  return Promise.all(promises).then(() => dispatch(set('ready', true)));
};

export const set = (key, value) => ({
  type: SET,
  key,
  value,
});
