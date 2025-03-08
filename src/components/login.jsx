import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/user-slice";
import { BASE_URL } from "../utils/constant";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //for signup- fields
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [gender, setgender] = useState("");
  const [age, setage] = useState(18);
  const [isLoginForm, setIsLoginForm] = useState(false);

  const [error, setError] = useState("");
  const dispatch = useDispatch(); // to pass data to redux store
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const url = BASE_URL + "/login";
      const data = {
        email,
        password,
      };
      const result = await axios.post(url, data, {
        withCredentials: true, // to store the cookie in browser from api response
      });
      dispatch(addUser(result.data?.data)); // we pass value to redux by calling the reduceer action method
      console.log("Login success ===> ", result.data);
      return navigate("/feed");
    } catch (e) {
      setError(e.message || "Something went wrong");
    }
  };

  const handleSignup = async () => {
    try {
      const url = BASE_URL + "/signup";
      const data = {
        email,
        password,
        firstName,
        lastName,
        age,
        gender,
      };
      const result = await axios.post(url, data, {
        withCredentials: true, // to store the cookie in browser from api response
      });
      dispatch(addUser(result.data?.data)); // we pass value to redux by calling the reduceer action method
      return navigate("/profile");
    } catch (e) {
      setError(e.message || "Something went wrong");
    }
  };
  return (
    <div className="flex justify-center my-10">
      <div className="card bg-primary text-primary-content w-96">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isLoginForm ? "Login" : "Sign up"}
          </h2>
          <br></br>
          {isLoginForm && (
            <>
              <input
                type="text"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered input-primary w-full max-w-xs  text-cyan-50"
              />
              <input
                type="password"
                placeholder="password"
                className="input input-bordered input-primary w-full max-w-xs  text-cyan-50"
                value={password}
                onChange={(p) => setPassword(p.target.value)}
              />
            </>
          )}
          {!isLoginForm && (
            <>
              <input
                type="text"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered input-primary w-full max-w-xs text-cyan-50"
              />
              <input
                type="password"
                placeholder="password"
                className="input input-bordered input-primary w-full max-w-xs text-cyan-50"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="text"
                placeholder="first name"
                className="input input-bordered input-primary w-full max-w-xs text-cyan-50"
                value={firstName}
                onChange={(e) => setfirstName(e.target.value)}
              />
              <input
                type="text"
                placeholder="last name"
                className="input input-bordered input-primary w-full max-w-xs text-cyan-50"
                value={lastName}
                onChange={(e) => setlastName(e.target.value)}
              />
              <input
                type="text"
                placeholder="gender"
                className="input input-bordered input-primary w-full max-w-xs text-cyan-50"
                value={gender}
                onChange={(e) => setgender(e.target.value)}
              />
            </>
          )}
          <div className="card-actions justify-end m-2">
            <button
              className="btn btn-info"
              onClick={isLoginForm ? handleLogin : handleSignup}
            >
              {isLoginForm ? "Login" : "Sign Up"}
            </button>
            <p color="red">{error}</p>
            <p
              className="m-auto cursor-pointer py-2"
              onClick={() => setIsLoginForm((value) => !value)}
            >
              {isLoginForm
                ? "New User? Signup Here"
                : "Existing User? Login Here"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
