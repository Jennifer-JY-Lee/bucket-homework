import axios from "axios";
import ls from "local-storage";
export const GET_FEED_LIST = "get_feed_list";
export const SET_SCRAP_FEED = "set_scrap_feed";

export const getFeedList = (type = "replace", page, filterScrap) => {
  let scrappedList = ls.get("bucketScrap");
  if (scrappedList === null) {
    scrappedList = {};
  }
  return dispatch => {
    return axios
      .get(
        `https://s3.ap-northeast-2.amazonaws.com/bucketplace-coding-test/cards/page_${page}.json`
      )
      .then(response => {
        if (response.status === 200) {
          dispatch({
            type: GET_FEED_LIST,
            payload: response.data
          });
          return response.data;
        } else {
          dispatch({
            type: GET_FEED_LIST,
            payload: []
          });
          return [];
        }
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: GET_FEED_LIST,
          payload: []
        });
        return [];
      });
  };
};
export const setScrapFeed = (
  id,
  status,
  image_url,
  nickname,
  profile_image_url
) => {
  let scrappedList = ls.get("bucketScrap");
  if (status === true) {
    if (scrappedList === null) {
      scrappedList = {};
      scrappedList[id] = { id, image_url, nickname, profile_image_url };
    } else {
      scrappedList[id] = { id, image_url, nickname, profile_image_url };
    }
  } else {
    delete scrappedList[id];
  }
  ls.set("bucketScrap", scrappedList);
  return dispatch => {
    dispatch({
      type: SET_SCRAP_FEED,
      payload: scrappedList
    });
  };
};
