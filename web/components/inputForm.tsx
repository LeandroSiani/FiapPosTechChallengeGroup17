import React from "react";

interface InputFormProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id?: string;
}

export const InputForm: React.FC<InputFormProps> = ({ label, id, ...rest }) => {
  return (
    <label
      htmlFor={id}
      className="block text-base font-semibold text-[#1b1b1b]"
    >
      {label}
      <input
        id={id}
        type="text"
        className="mt-1 p-6 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base"
        {...rest}
      />
    </label>
  );
};
