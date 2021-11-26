import axios from "axios";
import {
  PEOPLE_FETCH_REQUEST,
  PEOPLE_FETCH_SUCCESS,
  PEOPLE_FETCH_FAIL,
  PAGE_UPDATED,
} from "../constants/poeopleConstants";

export const fetchPeople =
  (text = "", page = 0) =>
  async (dispatch) => {
    try {
      dispatch({
        type: PEOPLE_FETCH_REQUEST,
      });

      const config = {
        headers: { "Content-Type": "application/json" },
      };

      const { data } = await axios.get("/api/", {
        params: { text, page },
        config,
      });

      if (data.people.length === 0) {
        dispatch({
          type: PEOPLE_FETCH_FAIL,
          payload: { error: "Could not find any match results", results: data },
        });
      } else {
        dispatch({
          type: PEOPLE_FETCH_SUCCESS,
          payload: {
            error: null,
            results: data,
          },
        });
      }
    } catch (error) {
      dispatch({
        type: PEOPLE_FETCH_FAIL,
        payload: {
          error:
            error.response && error.response.data.message
              ? error.response.statusText
              : error.message,
          results: [],
        },
      });
    }
  };

export const updatePage = (page) => (dispatch) => {
  dispatch({
    type: PAGE_UPDATED,
    payload: page,
  });
};
