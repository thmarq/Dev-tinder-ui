import React from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { removeUserFromFeed } from "../utils/feed-slice";
import { useDispatch } from "react-redux";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();

  const handleConnectionRequest = async (status, userId) => {
    try {
      const url = BASE_URL + "/request/send/" + status + "/" + userId;
      console.log("Url ====> ", url);
      const res = await axios.post(
        url,
        {},
        {
          withCredentials: true, // to send cookie from browser to api
        }
      );
      console.log("Feed data ===============> ", res.data?.data);
      dispatch(removeUserFromFeed(userId));
    } catch (e) {
      console.log("Error in handling connection req ===> ", e?.message);
    }
  };
  const { _id, firstName, lastName, skills, age, gender, about, photoUrl } =
    user;
  return (
    <div>
      <div className="card bg-base-300 w-96 shadow-2xl">
        <figure>
          <img src={`${photoUrl}`} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          {age && gender && <p>{age + " , " + gender}</p>}
          <p>{about}</p>
          <div className="card-actions justify-end">
            <button
              className="btn btn-primary  text-cyan-50"
              onClick={() => handleConnectionRequest("ignored", _id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-secondary text-cyan-50"
              onClick={() => handleConnectionRequest("interested", _id)}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
