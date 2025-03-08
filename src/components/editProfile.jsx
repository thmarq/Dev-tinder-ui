import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/user-slice";
import { useNavigate } from "react-router-dom";
import Toast from "./toast";

const EditProfile = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age ?? 0);
  const [about, setAbout] = useState(user.about);
  const [error, setError] = useState(null);
  const [showToast, setToast] = useState(false);

  const updateProfile = async () => {
    try {
      const url = BASE_URL + "/profile/edit";
      const data = {
        firstName,
        lastName,
        about,
        age,
      };
      const result = await axios.patch(url, data, {
        withCredentials: true, // to store the cookie in browser from api response
      });
      dispatch(addUser(result.data?.user));
      setToast(true);
      setTimeout(() => setToast(false), 3000);
      //   return navigate("/feed");
    } catch (e) {
      setError(e.message);
      console.log("Error in update Profile ", e);
    }
  };

  return (
    user && (
      <div className="flex justify-center my-10">
        <div className="card bg-primary text-primary-content w-96">
          <div className="card-body">
            <h2 className="card-title justify-center">Edit Profile </h2>
            <br></br>
            <input
              type="text"
              placeholder="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="input input-bordered input-primary w-full max-w-xs  text-cyan-50"
            />
            <input
              type="text"
              placeholder="lastName"
              className="input input-bordered input-primary w-full max-w-xs  text-cyan-50"
              value={lastName}
              onChange={(p) => setLastName(p.target.value)}
            />
            <input
              type="text"
              placeholder="age"
              className="input input-bordered input-primary w-full max-w-xs  text-cyan-50"
              value={age}
              onChange={(p) => setAge(p.target.value)}
            />
            <input
              type="text"
              placeholder="about"
              className="input input-bordered input-primary w-full max-w-xs  text-cyan-50"
              value={about}
              onChange={(p) => setAbout(p.target.value)}
            />
            <div className="card-actions justify-end m-2">
              <button className="btn bg-green-600" onClick={updateProfile}>
                Update Profile
              </button>
              {error && <p color="red">{error}</p>}
            </div>
          </div>
        </div>
        {showToast && <Toast></Toast>}
      </div>
    )
  );
};

export default EditProfile;
