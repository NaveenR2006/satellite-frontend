import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const AddSatelliteForm = ({ onHome }) => {
  const [satellite, setSatellite] = useState({
    id: uuidv4(), // Generate a unique ID when the form is initialized
    name: "",
    orbitType: "",
    speed: "",
    altitude: "",
    latitude: "",
    longitude: "",
    visibility: "",
    details: "",
  });

  const handleChange = ({ target: { name, value } }) => {
    setSatellite((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://satellite-backend-gvxa.onrender.com/api/addsatellite`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...satellite,
          id: uuidv4(), // Generate a new unique ID for each submission
          speed: Number(satellite.speed),
          altitude: Number(satellite.altitude),
          latitude: Number(satellite.latitude),
          longitude: Number(satellite.longitude),
          visibility: Boolean(satellite.visibility)
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add satellite");
      }

      const data = await response.json();
      alert("Satellite added successfully!");

      // Clear the form fields after successful submission
      setSatellite({
        id: uuidv4(), // Generate a new ID for the next satellite
        name: "",
        orbitType: "",
        speed: "",
        altitude: "",
        latitude: "",
        longitude: "",
        visibility: "",
        details: "",
      });
    } catch (error) {
      console.error("Error adding satellite:", error);
      alert(error.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={satellite.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="orbitType">
            Orbit Type
          </label>
          <input
            type="text"
            id="orbitType"
            name="orbitType"
            value={satellite.orbitType}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="speed">
            Speed (km/h)
          </label>
          <input
            type="number"
            id="speed"
            name="speed"
            value={satellite.speed}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="altitude">
            Altitude (km)
          </label>
          <input
            type="number"
            id="altitude"
            name="altitude"
            value={satellite.altitude}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="latitude">
            Latitude
          </label>
          <input
            type="number"
            id="latitude"
            name="latitude"
            value={satellite.latitude}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="longitude">
            Longitude
          </label>
          <input
            type="number"
            id="longitude"
            name="longitude"
            value={satellite.longitude}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="visibility">
            Visibility
          </label>
          <select
            id="visibility"
            name="visibility"
            value={satellite.visibility}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value="">Select visibility</option>
            <option value="true">Visible</option>
            <option value="false">Not Visible</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="details">
            Details
          </label>
          <textarea
            id="details"
            name="details"
            value={satellite.details}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Satellite
          </button>
          <button
            type="button"
            onClick={onHome}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Back to Home
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSatelliteForm;
