import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignUpUser } from "@tiwariparth/zod-test";
import InputBox from "./InputBox";
import axios from "axios";
import { BACKEND_URL } from "../config/config";
import img from "../assets/katie-smith-uQs1802D0CQ-unsplash.jpg";

const Auth = ({ type }: { type: "register" | "login" }) => {
  const navigate = useNavigate();
  const [postInput, setPostInputs] = useState<SignUpUser>({
    email: "",
    password: "",
    name: "",
  });

  const sendRequest = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/auth/${type}`,
        postInput
      );
      console.log(response.data);
      const jwt = response.data.token;
      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="flex h-screen justify-center flex-col items-center gap-5"
      style={{
        background: `url(${img}) no-repeat center center/cover`,
      }}
    >
      <div className="px-6 py-4 rounded-lg bg-opacity-50 bg-black">
        <h1 className=" text-4xl text-center font-extrabold ">
          {type === "register" ? "Create an account" : "Login to your account"}
        </h1>
        <div className="mt-2">
          <p className="text-slate-400 text-center ">
            {type === "login"
              ? "Don't have an account?"
              : "Already have an account?"}
            <Link
              className="underline"
              to={type === "login" ? "/register" : "/login"}
            >
              {type === "login" ? "Sign Up" : "Login"}
            </Link>
          </p>
        </div>
        <div className=" flex flex-col">
          {type === "register" ? (
            <InputBox
              label="Username"
              placeholder="Enter your name"
              type="text"
              onChange={(e) =>
                setPostInputs({
                  ...postInput,
                  name: e.target.value,
                })
              }
            />
          ) : null}
          <InputBox
            label="Email"
            type="email"
            placeholder="Enter your email"
            onChange={(e) =>
              setPostInputs({
                ...postInput,
                email: e.target.value,
              })
            }
          />
          <InputBox
            label="Password"
            type="password"
            placeholder="Enter a password"
            onChange={(e) =>
              setPostInputs({
                ...postInput,
                password: e.target.value,
              })
            }
          />
          <button
            onClick={sendRequest}
            className="bg-slate-900 hover:bg-black text-white font-bold py-2 px-4 border border-black-700 rounded-lg mb-2"
          >
            {type === "register" ? "Sign Up" : "Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
