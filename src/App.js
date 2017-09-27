import './App.css';

import React, { Component } from 'react';
import classnames from 'classnames';
import { Route, NavLink, withRouter } from 'react-router-dom';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { connect } from 'react-redux';

import Dvr from 'material-ui-icons/Dvr';
import AccountBalanceWallet from 'material-ui-icons/AccountBalanceWallet';
import Folder from 'material-ui-icons/Folder';
import SwapHoriz from 'material-ui-icons/SwapHoriz';
import AddCircleOutline from 'material-ui-icons/AddCircleOutline';
import RemoveCircleOutline from 'material-ui-icons/RemoveCircleOutline';
import TrendingUp from 'material-ui-icons/TrendingUp';

import Dashboard from './components/Dashboard';
import Accounts from './components/Accounts';
import FlashMessages from './components/FlashMessages';
import LoginForm from './components/LoginForm';
import Categories from './components/Categories';
import AuthControls from './AuthControls';

const nav = [
  {
    icon: <Dvr />,
    label: 'Dashboard',
    link: '/'
  }, {
    icon: <AddCircleOutline />,
    label: 'Income',
    link: '/income'
  }, {
    icon: <RemoveCircleOutline />,
    label: 'Expense',
    link: '/expense'
  }, {
    icon: <SwapHoriz />,
    label: 'Transfer',
    link: '/transfer'
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

const animated = (component) => (
  <CSSTransitionGroup
    transitionName="content"
    transitionAppear={true}
    transitionAppearTimeout={0}
    transitionEnterTimeout={0}
    transitionLeaveTimeout={0}
  >{component}</CSSTransitionGroup>
)

class App extends Component {
  render() {
    let { loggedin } = this.props;

    return (

      <div className="app">

        <div className="app-header">
          <div className="app-header--title">
            <TrendingUp style={{width: 30, height: 30}} /> 
            <span>Rich Bitch</span>
          </div>
          { loggedin && <AuthControls /> }
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
                <Route exact path="/categories" component={() => (<Categories />)} />
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

let mapStateToProps = state => {
  return {
    loggedin: state.auth.email !== null
  }
}
export default withRouter(connect(mapStateToProps)(App));