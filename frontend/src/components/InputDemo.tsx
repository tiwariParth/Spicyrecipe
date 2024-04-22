import React, { ChangeEventHandler } from "react";

interface InputDemoProps {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const InputDemo = ({ value, onChange }: InputDemoProps) => {
  return (
    <div>
      <input type="text" value={value} onChange={onChange} />
    </div>
  );
};

export default InputDemo;
