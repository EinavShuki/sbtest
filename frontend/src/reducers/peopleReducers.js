import {
  PEOPLE_FETCH_REQUEST,
  PEOPLE_FETCH_SUCCESS,
  PEOPLE_FETCH_FAIL,
  PAGE_UPDATED,
} from "../constants/poeopleConstants";

export const peopleFetchReducer = (state = {}, action) => {
  switch (action.type) {
    case PEOPLE_FETCH_REQUEST:
      return {
        loading: true,
      };
    case PEOPLE_FETCH_SUCCESS:
    case PEOPLE_FETCH_FAIL:
      return {
        ...state,
        loading: false,
        results: action.payload.results,
        error: action.payload.error,
      };
    default:
      return state;
  }
};
export const updatePageReducer = (state = {}, action) => {
  switch (action.type) {
    case PAGE_UPDATED:
      return {
        page: action.payload,
      };

    default:
      return state;
  }
};
