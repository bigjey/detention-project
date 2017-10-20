import React from 'react';
import classnames from 'classnames';

const Transaction = ({_id, type, description, category, from, to, onRemove}) => (
  <div className="dashboard-transactions--item">
    <div className="dashboard-transactions--item-text">
      <div className="dashboard-transactions--item-account">
        [
          {to.account.name}
          {from.account && (
            <span> &rarr; {from.account.name}</span>
          )}
        ]
      </div>
      <div className="dashboard-transactions--item-label">
        {category && category.name}
      </div>
      {description && (
        <div className="dashboard-transactions--item-description">
          {description}
        </div>
      )}
    </div>
    <div className="dashboard-transactions--item-actions">
      <button onClick={()=>{onRemove(_id)}}>&times;</button>
    </div>
    <div className={
      classnames("dashboard-transactions--item-amount", `color--${type}`)
    }>
      {type === 'income' && '+'}
      {type === 'expense' && '-'}
      {from && from.account && (
        <span>{from.amount} $ &rarr; </span>
      )}
      {to.amount} $
    </div>
  </div>
)

export default Transaction;