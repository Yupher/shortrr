import React, { useReducer } from "react";
import Context from "./context";
import reducer from "./reducer";
import {
  GET_URL,
  ADD_URL,
  SET_ALERT,
  CLEAR_ALERT,
  SET_LOADING,
  DELETE_URL,
  DELETE_ALL,
} from "./types";
const UrlState = (props) => {
  const initialState = {
    urls: null,
    currentAddedUrl: null,
    loading: false,
    allert: null,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const addUrl = async (url) => {
    setLoading();
    try {
      let data = {
        url,
      };
      let res = await fetch("http://localhost:5000", {
        method: "post",
        body: JSON.stringify(data),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let response = await res.json();
      //console.log(res.ok)
      if(!res.ok) {
        return dispatch({ type: SET_ALERT, payload: response })
      }
      dispatch({ type: ADD_URL, payload: response });
    } catch (error) {
      console.log(error);
      dispatch({ type: SET_ALERT, payload: error });
    }
  };

  const getUrls = async () => {
    setLoading();
    try {
      let res = await fetch("http://localhost:5000", {
        method: "GET",
        credentials: "include",
      });
      let response = await res.json();
      //console.log(response)
      dispatch({ type: GET_URL, payload: response });
    } catch (error) {
      dispatch({ type: SET_ALERT, payload: error });
    }
  };
  const deleteUrl = async (id) => {
    try {
      let res = await fetch(`http://localhost:5000/${id}`, {
        method: "delete",
        credentials: "include",
      });
      let response = await res.json();
      dispatch({ type: DELETE_URL, payload: { response, id } });
    } catch (error) {
      dispatch({ type: SET_ALERT, payload: error });
    }
  };
  const deleteAll = async () => {
    try {
      let res = await fetch("http://localhost:5000/all", {
        method: "delete",
        credentials: "include",
      });
      let response = await res.json();
      dispatch({ type: DELETE_ALL, payload: response });
    } catch (error) {
      dispatch({ type: SET_ALERT, payload: error });
    }
  };
  const clearAlert = () => dispatch({ type: CLEAR_ALERT });
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <Context.Provider
      value={{
        urls: state.urls,
        currentAddedUrl: state.currentAddedUrl,
        loading: state.loading,
        allert: state.allert,
        addUrl,
        getUrls,
        deleteUrl,
        deleteAll,
        clearAlert,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
export default UrlState;
