import { GET_FEED_LIST, SET_SCRAP_FEED } from "../actions/feed";
import ls from "local-storage";
const initialState = {
  feedList: [],
  scrappedList: ls.get("bucketScrap") || {}
};
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_FEED_LIST:
      return {
        ...state,
        feedList: [...state.feedList, ...action.payload]
      };
    case SET_SCRAP_FEED:
      return {
        ...state,
        scrappedList: action.payload
      };
    default:
      return state;
  }
};
