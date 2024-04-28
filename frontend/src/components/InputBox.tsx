import { ChangeEvent } from "react";

interface InputBoxProps {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

const InputBox = ({ label, placeholder, onChange, type }: InputBoxProps) => {
  return (
    <div className="flex flex-col gap-2 mb-6">
      <label className="block mb-2 text-lg font-bold">{label}</label>
      <input
        type={type || "text"}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        onChange={onChange}
        required
      />
    </div>
  );
};

export default InputBox;
