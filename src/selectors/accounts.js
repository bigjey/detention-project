export const getAccountById = (state, id) => {
  let account = state.accounts.find(acc => {
    return acc.id == id
  });
  return account;
}