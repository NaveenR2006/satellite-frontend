import React, { useState } from "react";

const SearchSatelliteForm = ({ onHome }) => {
  const [satelliteName, setSatelliteName] = useState("");
  const [satelliteDetails, setSatelliteDetails] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://satellite-backend-gvxa.onrender.com/api/satellite?name=${satelliteName}`
      );
      if (!response.ok) throw new Error("Failed to fetch satellite");
      const data = await response.json();
      setSatelliteDetails(data); // Save the fetched data to state
      setSatelliteName("");
    } catch (error) {
      console.error(error.message);
      alert("Failed to search satellite.");
    }
  };

  return (
    <div className="satellite-form-container">
      <form className="satellite-form" onSubmit={handleSubmit}>
        <h2>Search a Satellite</h2>
        <div className="form-group">
          <label htmlFor="satelliteName">Enter Satellite Name to Search:</label>
          <input
            type="text"
            id="satelliteName"
            value={satelliteName}
            onChange={(e) => setSatelliteName(e.target.value)}
          />
        </div>
        <button type="submit">Search Satellite</button>
      </form>
      <button type="button" onClick={onHome} className="home-button">
        Home
      </button>

      {satelliteDetails && (
        <div className="satellite-details">
          <h3>Satellite Details:</h3>
          <table>
            <tbody>
              {Object.entries(satelliteDetails).map(([key, value]) => (
                <tr key={key}>
                  <td style={{ fontWeight: "bold" }}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}:
                  </td>
                  <td>
                    {key === "visibility"
                      ? value
                        ? "Yes"
                        : "No"
                      : value !== null && value !== undefined
                      ? value
                      : "Not Available"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SearchSatelliteForm;
