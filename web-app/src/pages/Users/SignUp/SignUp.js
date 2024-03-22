import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import imgcontent from "~/assets/images/img-content.jpg";
import Snowfall from "react-snowfall";
import { setItem,getItem } from "../../../components/LocalStorage/LocalStorage";
import { register } from "../../../services/auth.service";
import { getUserByEmail } from "../../../services/user.service";
import { createBasketOfUser } from "../../../services/basket.service";
import "./SignUp.css";
const SignUpForm = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pass, setPass] = useState("");
  const [showSignIn, setShowSignIn] = useState(false);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    let errorPasswordMessage = "";

    if (password !== confirmPassword) {
      errorPasswordMessage += "Passwords do not match.\n";
    }
    if (password.length < 8) {
      errorPasswordMessage += "Password must contain at least 8 characters.\n";
    }
    if (!password.match(/\d/) || !password.match(/[a-zA-Z]/)) {
      errorPasswordMessage +=
        "Password must contain at least one letter and one number.\n";
    }
    if (errorPasswordMessage !== "") {
      setPass(errorPasswordMessage);
      return;
    }

    try {
      const data = {
        userName,
        email,
        password,
        confirmPassword,
      };
      const response = await register(data);
      const userData = await getUserByEmail(email);
      setItem("accessToken", response.data.accessToken.token);
      setItem("user",userData.data.userName);
      if (userData!==null) {
        await createBasketOfUser(userData.data.id, response.data.accessToken.token);
      }
      setShowSignIn(true);
      setShow(true);
    } catch (error) {
      console.log(error);
    }
  };
  const handelLoading = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 300));
    navigate("/SignIn");
  };
  return (
    <div>
      {loading && (
        <div className="flex items-center justify-center min-h-screen">
          <div className="loader"></div>
        </div>
      )}
      {showSignIn && !loading ? (
        <div className="box">
          <p>Đăng Nhập Thành Công.</p>
          <div className="box-link">
            <button className="ok-button" onClick={handelLoading}>
              OK
            </button>
          </div>
        </div>
      ) : (
        <div className={`flex justify-center items-center min-h-screen ${show ? 'blur' : ''}`}>
          <Snowfall
            snowflakeCount={100}
            snowflakePosition="all"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
            snowflakeSize={{ minSize: 1, maxSize: 4 }}
          />

          <div className="w-full max-w-md">
            <div className="text-center mb-6">
              <img
                src={imgcontent}
                className="rounded-full w-32 h-32 mx-auto mb-4"
                alt="Minion"
              />
              <div className="text-3xl text-center mb-6">
                <h2 className="" style={{ color: "pink" }}>
                  Sign Up To Website
                </h2>
              </div>
            </div>

            <form
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
              style={{ background: "transparent", boxShadow: "none" }}
              onSubmit={handleSubmit}
            >
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="userName"
                >
                  <FaUser className="inline-block mr-2 align-middle" />
                  Username
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="userName"
                  type="text"
                  placeholder="Username"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  <FaLock className="inline-block mr-2 align-middle" />
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {pass && (
                  <ul className="text-red-500 text-xs pt-2">
                    {pass.split("\n").map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="confirmPassword"
                >
                  <FaLock className="inline-block mr-2 align-middle" />
                  Confirm Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  <FaEnvelope className="inline-block mr-2 align-middle" />
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="signup-button flex justify-between">
                  <button
                    className="bg-blue-500 text-center flex justify-between align-center hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUpForm;
