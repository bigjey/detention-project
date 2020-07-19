import React from 'react';
import classnames from 'classnames';

const Transaction = ({
  _id,
  type,
  description,
  amount,
  category,
  fromAccount,
  toAccount,
  onRemove,
}) => (
  <div className="dashboard-transactions--item">
    <div className="dashboard-transactions--item-text">
      <div className="dashboard-transactions--item-account">
        [{(fromAccount || toAccount).name}
        {fromAccount && toAccount && <span> &rarr; {toAccount.name}</span>}]
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
      <button
        onClick={() => {
          onRemove(_id);
        }}
      >
        &times;
      </button>
    </div>
    <div
      className={classnames(
        'dashboard-transactions--item-amount',
        `color--${type}`
      )}
    >
      {type === 'income' && '+'}
      {type === 'expense' && '-'}
      {amount} $
    </div>
  </div>
);

export default Transaction;
