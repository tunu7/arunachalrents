"use client";

import { useState } from "react";

export default function SearchPage() {
  const [searchFilters, setSearchFilters] = useState({
    location: "",
    minPrice: "",
    maxPrice: "",
    bedrooms: "",
    propertyType: "",
  });

  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setSearchFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Filters applied:", searchFilters);
    // Optionally, redirect to a results page or update the listings based on filters.
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="max-w-md w-full bg-white shadow-lg p-6 rounded-lg border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Filter Listings</h2>
        <form onSubmit={handleSearchSubmit}>
          <div className="mb-4">
            <label htmlFor="filterLocation" className="block text-gray-700 text-sm font-bold mb-2">
              Location
            </label>
            <input
              id="filterLocation"
              type="text"
              name="location"
              value={searchFilters.location}
              onChange={handleSearchChange}
              className="w-full border rounded p-2"
              placeholder="Enter location"
            />
          </div>
          <div className="mb-4 flex space-x-2">
            <div className="w-1/2">
              <label htmlFor="filterMinPrice" className="block text-gray-700 text-sm font-bold mb-2">
                Min Price
              </label>
              <input
                id="filterMinPrice"
                type="number"
                name="minPrice"
                value={searchFilters.minPrice}
                onChange={handleSearchChange}
                className="w-full border rounded p-2"
                placeholder="Min Price"
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="filterMaxPrice" className="block text-gray-700 text-sm font-bold mb-2">
                Max Price
              </label>
              <input
                id="filterMaxPrice"
                type="number"
                name="maxPrice"
                value={searchFilters.maxPrice}
                onChange={handleSearchChange}
                className="w-full border rounded p-2"
                placeholder="Max Price"
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="filterBedrooms" className="block text-gray-700 text-sm font-bold mb-2">
              Bedrooms
            </label>
            <select
              id="filterBedrooms"
              name="bedrooms"
              value={searchFilters.bedrooms}
              onChange={handleSearchChange}
              className="w-full border rounded p-2"
            >
              <option value="">Any</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3+">3+</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="filterPropertyType" className="block text-gray-700 text-sm font-bold mb-2">
              Property Type
            </label>
            <select
              id="filterPropertyType"
              name="propertyType"
              value={searchFilters.propertyType}
              onChange={handleSearchChange}
              className="w-full border rounded p-2"
            >
              <option value="">Any</option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="studio">Studio</option>
            </select>
          </div>
          <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            Apply Filters
          </button>
        </form>
      </div>
    </div>
  );
}
