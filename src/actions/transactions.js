export const TRANSACTIONS_DELETE = 'TRANSACTIONS_DELETE';
export const TRANSACTIONS_RESTORE = 'TRANSACTIONS_RESTORE';

export const remove = (id) => ({
  type: TRANSACTIONS_DELETE,
  id
})

export const restore = (id) => ({
  type: TRANSACTIONS_RESTORE,
  id
})