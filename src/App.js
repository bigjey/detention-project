import './App.css';

import React, { Component } from 'react';
import classnames from 'classnames';
import { Route, NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Dvr from 'material-ui-icons/Dvr';
import AccountBalanceWallet from 'material-ui-icons/AccountBalanceWallet';
import Folder from 'material-ui-icons/Folder';
import SwapHoriz from 'material-ui-icons/SwapHoriz';
import AddCircleOutline from 'material-ui-icons/AddCircleOutline';
import RemoveCircleOutline from 'material-ui-icons/RemoveCircleOutline';
import TrendingUp from 'material-ui-icons/TrendingUp';
import { CircularProgress } from 'material-ui/Progress';
import { yellow } from 'material-ui/colors';

import Dashboard from './components/Dashboard';
import Accounts from './components/Accounts';
import FlashMessages from './components/FlashMessages';
import LoginForm from './components/LoginForm';
import Categories from './components/Categories';
import AuthControls from './AuthControls';
import TransactionModal from './components/Transactions/TransactionModal';

import { fetchAccounts } from './actions/accounts';
import { fetchCategories } from './actions/categories';
import { fetchTransactions } from './actions/transactions';

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
  state = {
    showModal: null,
    ready: false
  }

  componentWillMount() {
    this.props.initApp()
      .then(() => this.setState({ready: true}))
  }

  render() {
    let { loggedin } = this.props;
    const {showModal, ready} = this.state;

    if (!ready) return <CircularProgress size={250} color={'accent'} />;

    return (

      <div className="app">

        <div className="app-header">
          <div className="app-header--title">
            <TrendingUp style={{width: 30, height: 30}} /> 
            <span>Rich Bitch</span>
          </div>
          {loggedin && (
            <div className="app-header-nav">
              {showModal && (<TransactionModal type={showModal} onHide={() => this.setState({showModal: null})} />)}
              <div className="app-header-nav--item">
                <a className="app-header-nav--link" onClick={() => this.setState({showModal: 'income'})}><AddCircleOutline /></a>
              </div>
              <div className="app-header-nav--item">
                <a className="app-header-nav--link" onClick={() => this.setState({showModal: 'expense'})}><RemoveCircleOutline /></a>
              </div>
              <div className="app-header-nav--item">
                <a className="app-header-nav--link" onClick={() => this.setState({showModal: 'transfer'})}><SwapHoriz /></a>
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
                <Route exact path="/income" component={() => (<div>Income</div>)} />
                <Route exact path="/expense" component={() => (<div>Expense</div>)} />
                <Route exact path="/transfer" component={() => (<div>Transfer</div>)} />
                <Route path="/accounts" component={() => (<Accounts />)} />
                <Route path="/categories" component={() => (<Categories />)} />
              </div>
          </div>
        ) : ( 
          <div className="app-body">
            <LoginForm />
          </div>
        )}

        <FlashMessages />

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedin: state.auth.email !== null
  }
}

const dispatchToProps = (dispatch) => {
  return {
    initApp() {
      return Promise.all([
        dispatch(fetchAccounts()),
        dispatch(fetchCategories()),
        dispatch(fetchTransactions()),
      ]);
    }
  }
}

export default withRouter(connect(mapStateToProps, dispatchToProps)(App));