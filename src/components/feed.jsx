import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feed-slice";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useEffect } from "react";
import UserCard from "./user-card";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const getFeeds = async () => {
    try {
      if (feed) return;
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true, // to send cookie from browser to api
      });
      console.log("Feed data ===============> ", res.data?.data);
      dispatch(addFeed(res.data?.data));
    } catch (e) {
      console.log("Error in getting feeds ===> ", e?.message);
    }
  };

  useEffect(() => {
    getFeeds();
  }, []);
  if (feed?.length <= 0) {
    return (
      <h1 className="text-center font-bold my-5">
        No more users found for you ...!!!
      </h1>
    );
  }
  return (
    feed && (
      <div className="flex justify-center p-5">
        <UserCard user={feed[0]}></UserCard>
      </div>
    )
  );
};

export default Feed;
