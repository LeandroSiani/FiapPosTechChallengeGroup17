import React from "react";

interface SelectFormProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  id?: string;
  options: { value: string | number; label: string }[];
}

export const SelectForm: React.FC<SelectFormProps> = ({
  label,
  id,
  options,
  ...rest
}) => {
  return (
    <label
      htmlFor={id}
      className="block text-base font-semibold text-[#1b1b1b]"
    >
      {label}
      <select
        id={id}
        className="mt-1 p-6 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base"
        {...rest}
      >
        <option value="" disabled>
          Selecione uma opção
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
};
