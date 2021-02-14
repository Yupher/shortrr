/* eslint-disable import/no-anonymous-default-export */
import {
  GET_URL,
  ADD_URL,
  SET_ALERT,
  CLEAR_ALERT,
  SET_LOADING,
  DELETE_URL,
  DELETE_ALL,
} from "./types";

export default (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case ADD_URL:
      return {
        ...state,
        loading: false,
        currentAddedUrl: action.payload.shortUrl,
      };
    case GET_URL:
      return {
        ...state,
        loading: false,
        urls: action.payload.data,
      };
    case DELETE_URL:
      let { id, response } = action.payload;
      let index = state.urls.findIndex(i => i.shortid === id)
      console.log(response)
      return {
        ...state,
        loading: false,
        allert: response.message,
        urls: state.urls.splice(index,1),
      };
    case DELETE_ALL:
      return {
        ...state,
        loading: false,
        allert: action.payload.message,
        urls: null,
      };
    case SET_ALERT:
      //console.log(action.payload)
      return {
        ...state,
        loading: false,
        allert: action.payload,
      };
    case CLEAR_ALERT:
      return {
        ...state,
        loading: false,
        allert: null,
      };
    default:
      return state;
  }
};
