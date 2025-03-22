import React from "react";
import InputField from "./InputField"; // Import the InputField component

interface RoomDetailsFormProps {
  formData: {
    email?: string;
    title?: string;
    price?: number;
    roomType?: string;
    photos?: string;
    structImg?:string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  submitting: boolean;
}

const RoomDetailsForm: React.FC<RoomDetailsFormProps> = ({ formData, handleChange, submitting }) => {
  return (
    <>
      <h2 className="text-2xl font-semibold text-gray-900 text-center mb-3">🏠 Additional Room Details</h2>
      <div className="flex flex-col gap-3">
        <InputField name="email" type="email" placeholder="Email" label="Email" value={formData.email ?? ""} onChange={handleChange} disabled={submitting} />
        <InputField name="title" type="text" placeholder="Title" label="Title" value={formData.title ?? ""} onChange={handleChange} disabled={submitting} />
        <InputField name="price" type="number" placeholder="Price per Month (₹)" label="Price" value={formData.price ?? ""} onChange={handleChange} disabled={submitting} />
        <InputField name="photos" type="text" placeholder="photos URL" label="Photos" value={formData.photos ?? ""} onChange={handleChange} disabled={submitting} />
        <InputField name="structImg" type="text" placeholder="image URL" label="structImg" value={formData.structImg ?? ""} onChange={handleChange} disabled={submitting} />
        <div className="flex flex-col">
          <label className="text-gray-500 mb-1">Room Type:</label>
          <select
            name="roomType"
            value={formData.roomType ?? ""}
            onChange={handleChange}
            className="border p-2 rounded-lg"
            disabled={submitting}
          >
            <option value="">Select Room Type</option>
            <option value="1BHK">1BHK</option>
            <option value="2BHK">2BHK</option>
            <option value="Studio">Studio</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default RoomDetailsForm;