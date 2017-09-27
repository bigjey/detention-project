import React from 'react';
import classnames from 'classnames';

const Transaction = ({id, type, account, amount, description, category, newAmount, newAccount, onRemove}) => (
  <div className="dashboard-transactions--item">
    <div className="dashboard-transactions--item-text">
      <div className="dashboard-transactions--item-account">
        [
          {account}
          {newAccount && (
            <span> &rarr; {newAccount}</span>
          )}
        ]
      </div>
      <div className="dashboard-transactions--item-label">
        {category}
      </div>
      {description && (
        <div className="dashboard-transactions--item-description">
          {description}
        </div>
      )}
    </div>
    <div className="dashboard-transactions--item-actions">
      <button onClick={()=>{onRemove(id)}}>&times;</button>
    </div>
    <div className={
      classnames("dashboard-transactions--item-amount", `color--${type}`)
    }>
      {type === 'income' && '+'}
      {type === 'expense' && '-'}
      {amount} $
      {newAmount && (
        <span> &rarr; {newAmount} $</span>
      )}
    </div>
  </div>
)

export default Transaction;