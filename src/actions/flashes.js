export const FLASHES_ADD = 'FLASHES_ADD';
export const FLASHES_REMOVE = 'FLASHES_REMOVE';
export const FLASHES_HIDE = 'FLASHES_HIDE';

export const add = (flash) => ({
  type: FLASHES_ADD,
  flash,
});
export const hide = (id) => ({
  type: FLASHES_HIDE,
  id,
});
export const remove = (id) => ({
  type: FLASHES_REMOVE,
  id,
});
