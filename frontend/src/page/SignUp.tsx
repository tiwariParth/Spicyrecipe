import React, { useState } from "react";
import InputDemo from "../components/InputDemo";

const SignUp = () => {
  const [value, setValue] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return (
    <div>
      <InputDemo value="hello" onChange={() => {}} />
    </div>
  );
};

export default SignUp;
