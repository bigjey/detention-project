import axios from 'axios';

export const CATEGORY_FETCH_ALL = 'CATEGORY_FETCH_ALL';
export const CATEGORY_REMOVE = 'CATEGORY_REMOVE';
export const CATEGORY_RESTORE = 'CATEGORY_RESTORE';
export const CATEGORY_ADD = 'CATEGORY_ADD';
export const CATEGORY_SET = 'CATEGORY_SET';
export const CATEGORY_EDIT = 'CATEGORY_EDIT';
export const CATEGORY_FORM_ERROR = 'CATEGORY_FORM_ERROR';
export const CATEGORY_FORM_LOADER = 'CATEGORY_FORM_LOADER';

export const fetchCategories = () => (dispatch) => {
  return axios.get(`http://localhost:1212/api/category`).then((response) => {
    if (response.data.success) {
      dispatch(setCategories(response.data.items));
    }
    return response;
  });
};

export const createCategory = (data) => (dispatch) => {
  return axios
    .post(`http://localhost:1212/api/category`, data)
    .then(({ data }) => {
      if (data.success) {
        dispatch(addCategories([data.item]));
      }

      return data;
    });
};

const setCategories = (items) => ({
  type: CATEGORY_SET,
  items,
});

const addCategories = (items) => ({
  type: CATEGORY_ADD,
  items,
});

const categoryFormError = (error) => ({
  type: CATEGORY_FORM_ERROR,
  error,
});

const categoryFormLoader = (loading) => ({
  type: CATEGORY_FORM_LOADER,
  loading,
});

export const removeCategory = (id) => {
  return {
    type: CATEGORY_REMOVE,
    id,
  };
};

export const restoreCategory = (id) => {
  return {
    type: CATEGORY_RESTORE,
    id,
  };
};

export const editCategory = (id, data) => {
  return {
    type: CATEGORY_EDIT,
    id,
    data,
  };
};
