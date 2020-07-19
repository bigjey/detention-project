import './style.css';

import React from 'react';

import AccountsList from '../AccountsList';
import Transactions from '../Transactions';

export default () => (
  <div className="dashboard">
    <AccountsList>
      {(accounts) =>
        accounts.map((a) => (
          <div className="dashboard-accounts--item" key={a.id}>
            <div className="dashboard-accounts--item-label">{a.name}</div>
            <div className="dashboard-accounts--item-total">
              <span className="dashboard-accounts--item-value">
                {a.balance}
              </span>
              <span className="dashboard-accounts--item-currency">$</span>
            </div>
          </div>
        ))
      }
    </AccountsList>
    <Transactions />
  </div>
);
