import axios from "axios";
import {
  PEOPLE_FETCH_REQUEST,
  PEOPLE_FETCH_SUCCESS,
  PEOPLE_FETCH_FAIL,
  PAGE_UPDATED,
} from "../constants/poeopleConstants";

export const fetchPeople =
  (name = "", phone = "", age = "", page = 0) =>
  async (dispatch) => {
    try {
      dispatch({
        type: PEOPLE_FETCH_REQUEST,
      });

      const config = {
        headers: { "Content-Type": "application/json" },
      };

      const { data } = await axios.get("/api/", {
        params: { name, phone, age, page },
        config,
      });

      if (data.people.length === 0) {
        console.log("here");
        dispatch({
          type: PEOPLE_FETCH_FAIL,
          payload: "Could not find any match results",
        });
      } else {
        dispatch({
          type: PEOPLE_FETCH_SUCCESS,
          payload: data,
        });
      }
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

export const updatePage = (page) => (dispatch) => {
  dispatch({
    type: PAGE_UPDATED,
    payload: page,
  });
};
