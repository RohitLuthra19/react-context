// store.js
import React, { createContext, useReducer, useEffect } from "react";
import axios from "axios";
import * as types from "./types";
import * as constants from "./constants";

import Reducer from "./reducer";

import initialState from "./initialState";

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  useEffect(() => {
    const url = `${constants.BASE_URL}/categories`;

    dispatch({ type: types.GET_ALL_CATEGORIES_REQUEST });

    axios
      .get(url)
      .then((response) => {
        if (response.status !== 200) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then((response) => {
        dispatch({ type: types.GET_ALL_CATEGORIES_SUCCESS, data: response });
      })
      .catch(() => dispatch({ type: types.GET_ALL_CATEGORIES_FAILURE }));
  }, []);

  useEffect(() => {
    const { activeCategory, images } = state;
    if (activeCategory !== -1 && images.length === 0) {
      fetchSingleCategory(activeCategory);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.activeCategory]);

  const fetchSingleCategory = (categoryId, limit = 10, page = 1, isMore) => {
    const url = `${constants.BASE_URL}/images/search?category_ids=${categoryId}&limit=${limit}&page=${page}`;

    dispatch({ type: types.GET_SINGLE_CATEGORY_REQUEST });
    axios
      .get(url)
      .then((response) => {
        if (response.status !== 200) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then((response) => {
        dispatch({
          type: types.GET_SINGLE_CATEGORY_SUCCESS,
          data: response,
          isMore,
        });
      })
      .catch(() => dispatch({ type: types.GET_SINGLE_CATEGORY_FAILURE }));
  };

  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export const Context = createContext(initialState);
export default Store;
