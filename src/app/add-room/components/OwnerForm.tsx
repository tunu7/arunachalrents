import React from "react";
import InputField from "./InputField"; // Import the InputField component

interface OwnerFormProps {
  formData: {
    name: string;
    phone: string;
    location?: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  submitting: boolean;
}

const OwnerForm: React.FC<OwnerFormProps> = ({ formData, handleChange, submitting }) => {
  return (
    <>
      <h2 className="text-2xl font-semibold text-gray-900 text-center mb-3">📍 List Your Property</h2>
      <div className="flex flex-col gap-3">
        <InputField name="name" type="text" placeholder="Your Name" label="Name" value={formData.name} onChange={handleChange} disabled={submitting} />
        <InputField name="phone" type="tel" placeholder="Phone Number" label="Phone" value={formData.phone} onChange={handleChange} disabled={submitting} />
        <InputField name="location" type="text" placeholder="Location" label="Location" value={formData.location ?? ""} onChange={handleChange} disabled={submitting} />
      </div>
    </>
  );
};

export default OwnerForm;