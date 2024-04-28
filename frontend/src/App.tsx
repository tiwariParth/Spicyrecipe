import React from "react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import SignIn from "./page/SignIn";
import SignUp from "./page/SignUp";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
