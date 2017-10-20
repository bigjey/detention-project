import React from 'react';
import {connect} from 'react-redux';

const AccountsList = ({accounts, children = () => {}}) => (
  <div className="dashboard-accounts widget">
    <div className="widget--title">Accounts</div>
    <div className="widget--content">
      {children(accounts)}
    </div>
  </div>
)


const stateToProps = state => ({
  accounts: state.accounts
})

export default connect(stateToProps)(AccountsList);