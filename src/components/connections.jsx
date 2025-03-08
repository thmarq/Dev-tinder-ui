import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constant";

const Connections = () => {
  const [connections, setConnections] = useState([]);
  const getConnections = async () => {
    try {
      const url = BASE_URL + "/user/requests/accepted";
      const resp = await axios.get(url, {
        withCredentials: true,
      });
      setConnections(resp.data.data);
    } catch (e) {
      console.log("Error in fetching connections ", e.message);
    }
  };
  useEffect(() => getConnections, []);
  if (connections.length === 0)
    return <h1 className="justify-center">No connections found !!!</h1>;
  return (
    <div>
      <h1 className="text-center font-bold text-2xl  text-cyan-50">
        {" "}
        Connections{" "}
      </h1>
      {connections.map((connection) => {
        const { firstName, lastName, age, gender, photoUrl, about } =
          connection;
        return (
          <div className="card card-side bg-base-300 shadow-xl my-3 p-3">
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
                <button className="btn btn-primary">View Profile</button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
