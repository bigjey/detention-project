import React from 'react';
import { connect } from 'react-redux';

import { logout } from './actions/auth';
import { set } from './actions/app';
import ExitToApp from 'material-ui-icons/ExitToApp';

let mapStateToProps = state => {
  return {
    email: state.auth.email
  }
}

const AuthControls = ({dispatch, email}) => (
  <div className="app-header--user" onClick={() => dispatch(logout())}>
    <span>{ email }</span>
    <ExitToApp />
  </div>
)

export default connect(mapStateToProps)(AuthControls);