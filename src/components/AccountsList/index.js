import React from 'react';
import {connect} from 'react-redux';

const AccountsList = ({accounts, children = () => {}}) => {
  if (accounts.length === 0) return null

  return (
    <div className="dashboard-accounts widget">
      <div className="widget--title">Accounts</div>
      <div className="widget--content" style={{height: '100%'}}>
        {children(accounts)}
      </div>
    </div>
  )
}


const stateToProps = state => ({
  accounts: state.accounts
})

export default connect(stateToProps)(AccountsList);