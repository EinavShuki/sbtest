import axios from "axios";
import {
  PEOPLE_FETCH_REQUEST,
  PEOPLE_FETCH_SUCCESS,
  PEOPLE_FETCH_FAIL,
} from "../constants/poeopleConstants";

export const fetchPeople = (name, phone, age, page) => async (dispatch) => {
  try {
    dispatch({
      type: PEOPLE_FETCH_REQUEST,
    });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.get("/api/", {
      params: { name, phone, age, page },
      cancelToken: source.token,
      config,
    });

    dispatch({
      type: PEOPLE_FETCH_SUCCESS,
      payload: data,
    });

    //saving user info in localStorage
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: PEOPLE_FETCH_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
