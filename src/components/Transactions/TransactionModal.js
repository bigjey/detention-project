import React from 'react';
import { connect } from 'react-redux';

import Dialog from 'material-ui/Dialog';
import Tabs, { Tab } from 'material-ui/Tabs';

import TransactionForm from './TransactionForm';
import { set } from '../../actions/app';


const TransactionModal = ({type, closeModal, setType}) => (
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
)


const dispatchToProps = (dispatch) => ({
  closeModal() {
    dispatch(set('showTransactionModal', null))
  },
  setType(type) {
    dispatch(set('showTransactionModal', type))
  }
})


export default connect(null, dispatchToProps)(TransactionModal)