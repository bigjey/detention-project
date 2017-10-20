export const getAccountById = (state, id = null) => {
  if (!id) return null;

  let account = state.accounts.find(acc => {
    return acc._id == id
  });
  return account;
}