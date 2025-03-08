import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constant";

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const getRequests = async () => {
    try {
      const url = BASE_URL + "/user/requests/received";
      const resp = await axios.get(url, {
        withCredentials: true,
      });
      setRequests(resp.data.data);
    } catch (e) {
      console.log("Error in fetching connections ", e.message);
    }
  };

  const reviewRequest = async (status, id) => {
    try {
      const url = BASE_URL + "/request/review/" + status + "/" + id;
      console.log("Url =======> ", url);
      const resp = await axios.post(
        url,
        {},
        {
          withCredentials: true,
        }
      );
      if (resp.data?.data) {
        await getRequests();
      }
    } catch (e) {
      console.log("Error in review connections ", e.message);
    }
  };
  useEffect(() => getRequests, []);

  if (requests.length === 0) return <h1>No Requests found !!!</h1>;

  return (
    <div>
      <h1 className="text-center font-bold text-2xl text-cyan-50">
        {" "}
        Requests{" "}
      </h1>
      {requests.map((req) => {
        const { _id, firstName, lastName, age, gender, photoUrl, about } =
          req.fromUserId;
        return (
          <div
            key={_id}
            className="card card-side bg-base-300 shadow-xl my-3 p-3"
          >
            <figure>
              <img src={photoUrl} className="w-20 h-20" alt="Movie" />
            </figure>

            <div className="card-body">
              <h2 className="card-title font-bold ">
                {firstName + " " + lastName}
              </h2>
              <h2>{age}</h2>
              <h2>{gender}</h2>
              <h2>{about}</h2>
              <div className="card-actions justify-end">
                <button
                  className="btn btn-success"
                  onClick={() => reviewRequest("accepted", req._id)}
                >
                  Accept
                </button>
                <button
                  className="btn btn-error"
                  onClick={() => reviewRequest("rejected", req._id)}
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
