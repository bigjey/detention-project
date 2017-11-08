import './App.css';

import React, { Component } from 'react';
import classnames from 'classnames';
import { Route, NavLink, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Dvr from 'material-ui-icons/Dvr';
import AccountBalanceWallet from 'material-ui-icons/AccountBalanceWallet';
import Folder from 'material-ui-icons/Folder';
import SwapHoriz from 'material-ui-icons/SwapHoriz';
import AddCircleOutline from 'material-ui-icons/AddCircleOutline';
import RemoveCircleOutline from 'material-ui-icons/RemoveCircleOutline';
import TrendingUp from 'material-ui-icons/TrendingUp';
import { CircularProgress } from 'material-ui/Progress';

import Dashboard from './components/Dashboard';
import Accounts from './components/Accounts';
import FlashMessages from './components/FlashMessages';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Categories from './components/Categories';
import AuthControls from './AuthControls';
import TransactionModal from './components/Transactions/TransactionModal';

import { set } from './actions/app';
import { validateToken } from './actions/auth';

const nav = [
  {
    icon: <Dvr />,
    label: 'Dashboard',
    link: '/'
  }, {
    icon: <AccountBalanceWallet />,
    label: 'Accounts',
    link: '/accounts'
  }, {
    icon: <Folder />,
    label: 'Categories',
    link: '/categories'
  }
]

class App extends Component {

  componentWillMount() {
    this.props.validateToken()
  }

  render() {
    let { showTransactionModal, loggedin, ready, validatingToken } = this.props;

    if (validatingToken || loggedin && !ready) return <CircularProgress size={250} color={'accent'} />;

    return (

      <div className="app">

        <div className="app-header">
          <div className="app-header--title">
            <TrendingUp style={{width: 30, height: 30}} /> 
            <span>Rich Bitch</span>
          </div>
          {loggedin && (
            <div className="app-header-nav">
              {showTransactionModal && (<TransactionModal type={showTransactionModal} onHide={() => this.setState({showTransactionModal: null})} />)}
              <div className="app-header-nav--item">
                <a
                  className="app-header-nav--link"
                  onClick={() => this.props.changeTransactionModalType('income')}
                >
                  <AddCircleOutline />
                </a>
              </div>
              <div className="app-header-nav--item">
                <a
                  className="app-header-nav--link"
                  onClick={() => this.props.changeTransactionModalType('expense')}
                >
                  <RemoveCircleOutline />
                </a>
              </div>
              <div className="app-header-nav--item">
                <a
                  className="app-header-nav--link"
                  onClick={() => this.props.changeTransactionModalType('transfer')}
                >
                  <SwapHoriz />
                </a>
              </div>
              <AuthControls />
            </div>
          )}
        </div>

        {loggedin ? (
          <div className="app-body">
              <div className="app-nav">
                {nav.map(({icon, label, link}) => (
                  <NavLink exact key={link} to={link} className={
                    classnames('app-nav--item')
                  } activeClassName="app-nav--item__active">
                    <span className="app-nav--item-icon">{icon}</span>
                    <span className="app-nav--item-label">{label}</span>
                  </NavLink>
                ))}
              </div>

              <div className="app-content">
                <Route exact path="/" component={() => (<Dashboard />)} />
                <Route path="/accounts" component={() => (<Accounts />)} />
                <Route path="/categories" component={() => (<Categories />)} />
              </div>
          </div>
        ) : ( 
          <div className="app-body">
            <Switch>
              <Route exact path="/login" component={LoginForm} />
              <Route exact path="/register" component={RegisterForm} />

              <Redirect to="/login" />
            </Switch>
          </div>
        )}

        <FlashMessages />

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    validatingToken: state.auth.validatingToken,
    loggedin: state.auth.loggedIn,
    ready: state.app.ready,
    showTransactionModal: state.app.showTransactionModal
  }
}

const dispatchToProps = (dispatch) => {
  return {
    validateToken() {
      return dispatch(validateToken())
    },
    changeTransactionModalType(type) {
      dispatch(set('showTransactionModal', type))
    }
  }
}

export default withRouter(connect(mapStateToProps, dispatchToProps)(App));