import React from "react";

interface InputFieldProps {
  name: string;
  type: string;
  placeholder: string;
  label?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  disabled?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ name, type, placeholder, label, value, onChange, disabled }) => {
  return (
    <div className="flex flex-col">
      {label && <label className="text-gray-500 mb-1">{label}:</label>}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-700"
        disabled={disabled}
      />
    </div>
  );
};

export default InputField;