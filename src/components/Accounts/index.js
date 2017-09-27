import './style.css';

import React, {Component} from 'react';
import {Link, Route, Switch, NavLink} from 'react-router-dom';
import AccountBalanceWallet from 'material-ui-icons/AccountBalanceWallet';

import AccountsList from '../AccountsList';
import AccountForm from './AccountForm';


class Accounts extends Component {
  render(){
    return (
      <div className="accounts">
        <div className="accounts--list">
          <AccountsList>
            {(accounts) => accounts.map(a => (
              <NavLink to={`/accounts/${a.id}`} className="dashboard-accounts--item" key={a.id}>
                <div className="dashboard-accounts--item-label">{a.name}</div>
                <div className="dashboard-accounts--item-total">
                  <span className="dashboard-accounts--item-value">{a.balance}</span>
                  <span className="dashboard-accounts--item-currency">$</span>
                </div>
              </NavLink>
            ))}
          </AccountsList>
          <Route 
            exact 
            path="/accounts" 
            children={({match}) => 
              match 
                ? null 
                : (<div style={{
                    padding: 10
                  }}>
                    <Link to="/accounts/add" className="btn">Add Account</Link>
                  </div>)
            }
          />
        </div>
        <div className="accounts--content">
          <Switch>
            <Route exact path="/accounts/add" component={AccountForm}/>
            <Route exact path="/accounts" component={() => (
              <div className="accounts--hero">
                <AccountBalanceWallet
                  style={{
                    width: 100,
                    height: 100
                  }}
                />
                <h1>Manage your accounts.</h1>
                <div style={{
                  padding: 10
                }}>
                  <Link to="/accounts/add" className="btn">Add Account</Link>
                </div>
              </div>
            )}/>
            <Route exact path="/accounts/:id" component={({match}) => {
              return (
                <AccountForm accountId={match.params.id} />
              )
            }}/>
          </Switch>
        </div>
      </div>
    );
  }
}

export default Accounts;