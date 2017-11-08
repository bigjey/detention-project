import React from 'react';
import {connect} from 'react-redux';
import uuid from 'uuid/v4';

import Transaction from './Transaction';

import {removeTransaction, restore} from '../../actions/transactions';

import Button from 'material-ui/Button';
import {add, hide} from '../../actions/flashes';


const Transactions = ({transactions, removeTransaction}) => (
  <div className="dashboard-transactions widget">
    <div className="widget--title">Transactions</div>
    <div className="widget--content">

      {transactions.map(t => (
        <Transaction {...t} key={t.id} onRemove={removeTransaction} />
      ))}

    </div>
  </div>
)


const stateToProps = state => ({
  transactions: state.transactions.filter(t => !t.deleted).sort((a, b) => {
    return new Date(b.created) - new Date(a.created)
  })
})

const dispatchToProps = dispatch => ({
  removeTransaction(id) {
    dispatch(removeTransaction(id));
    
    // const flashId = uuid();
    // dispatch(add({
    //   id: flashId,
    //   open: true,
    //   message: 'transaction has been deleted',
    //   hideAfter: 2000,
    //   action: (
    //     <Button 
    //       onClick={() => { 
    //         dispatch(restore(id));
    //         dispatch(hide(flashId));
    //       }}
    //       color="accent"
    //       raised
    //     >
    //       UNDO
    //     </Button>
    //   )
    // }))
  }
})

export default connect(stateToProps, dispatchToProps)(Transactions);