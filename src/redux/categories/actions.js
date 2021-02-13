import axios from "axios";
import * as types from "./types";
import * as constants from "./constants";

export const getAllCategoriesRequest = () => (dispatch) => {
  dispatch({
    type: types.GET_ALL_CATEGORIES_REQUEST,
  });
};
export const getAllCategoriesSuccess = (data) => (dispatch) => {
  dispatch({
    type: types.GET_ALL_CATEGORIES_SUCCESS,
    data,
  });
};
export const getAllCategoriesFailure = () => (dispatch) => {
  dispatch({
    type: types.GET_ALL_CATEGORIES_FAILURE,
  });
};

export const getSingleCategoryRequest = () => (dispatch) => {
  dispatch({
    type: types.GET_SINGLE_CATEGORY_REQUEST,
  });
};
export const getSingleCategorySuccess = (data, isMore) => (dispatch) => {
  dispatch({
    type: types.GET_SINGLE_CATEGORY_SUCCESS,
    data,
    isMore,
  });
};
export const getSingleCategoryFailure = () => (dispatch) => {
  dispatch({
    type: types.GET_SINGLE_CATEGORY_FAILURE,
  });
};

export const selectCategory = (categoryId) => (dispatch) => {
  dispatch({
    type: types.SELECT_CATEGORY,
    categoryId,
  });
};

/**
 * API CALLS
 */
export const fetchCategories = () => {
  const url = `${constants.BASE_URL}/categories`;

  return (dispatch) => {
    dispatch(getAllCategoriesRequest());
    return axios
      .get(url)
      .then((response) => {
        if (response.status !== 200) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then((response) => {
        dispatch(getAllCategoriesSuccess(response));
      })
      .catch(() => dispatch(getAllCategoriesFailure()));
  };
};

export const fetchSingleCategory = (categoryId, limit, page, isMore) => {
  const url = `${constants.BASE_URL}/images/search?category_ids=${categoryId}&limit=${limit}&page=${page}`;

  return (dispatch) => {
    dispatch(getSingleCategoryRequest());
    return axios
      .get(url)
      .then((response) => {
        if (response.status !== 200) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then((response) => {
        dispatch(getSingleCategorySuccess(response, isMore));
      })
      .catch(() => dispatch(getSingleCategoryFailure()));
  };
};
