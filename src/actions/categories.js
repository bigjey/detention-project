export const CATEGORY_REMOVE = 'CATEGORY_REMOVE';
export const CATEGORY_RESTORE = 'CATEGORY_RESTORE';

export const removeCategory = (id) => {
  return {
    type: CATEGORY_REMOVE,
    id
  }
}
export const restoreCategory = (id) => {
  return {
    type: CATEGORY_RESTORE,
    id
  }
}
