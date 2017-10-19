import React from 'react';
import Dialog from 'material-ui/Dialog';

import TransactionForm from './TransactionForm';

export default class TransactionModal extends React.Component {

  handleRequestClose = () => {
    this.props.onHide();
  }

  render() {
    const {type} = this.props;

    return (
      <div>
        <Dialog open={true} onRequestClose={this.handleRequestClose}>
          <TransactionForm type={type} hideModal={this.handleRequestClose} />
        </Dialog>
      </div>
    );
  }
}