import React from 'react';
import { connect } from 'react-redux';

import Dialog from '@material-ui/core/Dialog';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import TransactionForm from './TransactionForm';
import { set } from '../../actions/app';

const TransactionModal = ({ type, closeModal, setType }) => (
  <div>
    <Dialog open={true} onRequestClose={closeModal}>
      <Tabs
        fullWidth
        value={type || ''}
        onChange={(e, value) => setType(value)}
      >
        <Tab label="Income" value="income" />
        <Tab label="Expense" value="expense" />
        <Tab label="Transfer" value="transfer" />
      </Tabs>
      <TransactionForm type={type} hideModal={closeModal} />
    </Dialog>
  </div>
);

const dispatchToProps = (dispatch) => ({
  closeModal() {
    dispatch(set('showTransactionModal', null));
  },
  setType(type) {
    dispatch(set('showTransactionModal', type));
  },
});

export default connect(null, dispatchToProps)(TransactionModal);
