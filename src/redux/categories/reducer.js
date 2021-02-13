import * as types from "./types";

const Reducer = (state, action) => {
  switch (action.type) {
    //Get all categories
    case types.GET_ALL_CATEGORIES_REQUEST:
      return {
        ...state,
        fetching: true,
        error: false,
      };

    case types.GET_ALL_CATEGORIES_SUCCESS:
      const { data } = action.data;
      const defaultCategory = data && data[0].id;

      return {
        ...state,
        fetching: false,
        error: false,
        items: data,
        activeCategory: defaultCategory,
      };

    case types.GET_ALL_CATEGORIES_FAILURE:
      return {
        ...state,
        fetching: false,
        error: true,
      };

    //Get Specific category
    case types.GET_SINGLE_CATEGORY_REQUEST:
      return {
        ...state,
        fetching: true,
        error: false,
      };

    case types.GET_SINGLE_CATEGORY_SUCCESS:
      const {
        isMore,
        page,
        data: { data: imagesData },
      } = action;

      const newPage = page || 0;
      let images = [...imagesData];
      if (isMore) {
        images = [...state.images, ...imagesData];
      }
      return {
        ...state,
        fetching: false,
        error: false,
        images,
        page: newPage,
      };

    case types.GET_SINGLE_CATEGORY_FAILURE:
      return {
        ...state,
        fetching: false,
        error: true,
      };

    case types.SELECT_CATEGORY:
      return {
        ...state,
        activeCategory: action.categoryId,
        images: [],
      };

    default:
      return state;
  }
};

export default Reducer;
