export const ACCOUNTS_CREATE = 'ACCOUNTS_CREATE';
export const ACCOUNTS_UPDATE = 'ACCOUNTS_UPDATE';

export const create = (data) => ({
  type: ACCOUNTS_CREATE,
  data
})
export const update = (id, data) => ({
  type: ACCOUNTS_UPDATE,
  id,
  data
})