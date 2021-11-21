import {
  USER_LOGOUT,
  PEOPLE_FETCH_REQUEST,
  USER_LOGIN_SUCCESS,
  PEOPLE_FETCH_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
} from "../constants/poeopleConstants";

export const peopleFetchReducer = (state = {}, action) => {
  switch (action.type) {
    case PEOPLE_LOGIN_REQUEST:
      return {
        loading: true,
      };
    case PEOPLE_FETCH_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
      };
    case USER_LOGIN_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};
