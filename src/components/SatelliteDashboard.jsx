import React, { useState } from "react";
import AddSatelliteForm from "./AddSatelliteForm";
import DeleteSatelliteForm from "./DeleteSatelliteForm";
import SearchSatelliteForm from "./SearchSatelliteForm";
import UpdateSatelliteForm from "./UpdateSatelliteForm";

const SatelliteDashboard = () => {
  const [currentView, setCurrentView] = useState("home"); // Default to 'home'

  const handleNavigate = (view) => {
    if (!view) {
      console.warn(`Navigation attempted with no action provided.`);
      return;
    }
    setCurrentView(view);
  };

  const renderView = () => {
    switch (currentView) {
      case "add":
        return <AddSatelliteForm onAddSatellite={handleAddSatellite} onHome={() => handleNavigate("home")} />;
      case "update":
        return <UpdateSatelliteForm onUpdateSatellite={handleUpdateSatellite} onHome={() => handleNavigate("home")} />;
      case "search":
        return <SearchSatelliteForm onSearchSatellite={handleSearchSatellite} satelliteDetails={null} onHome={() => handleNavigate("home")} />;
      case "delete":
        return <DeleteSatelliteForm onDeleteSatellite={handleDeleteSatellite} onHome={() => handleNavigate("home")} />;
      default:
        return (
          <div className="dashboard-container">
            <h1>Satellite Dashboard</h1>
            <div className="actions-container">
              <button onClick={() => handleNavigate("add")}>Add Satellite</button>
              <button onClick={() => handleNavigate("update")}>Update Satellite</button>
              <button onClick={() => handleNavigate("search")}>Search Satellite</button>
              <button onClick={() => handleNavigate("delete")}>Delete Satellite</button>
            </div>
          </div>
        );
    }
  };

  const handleAddSatellite = (satellite) => {
    console.log("Satellite added:", satellite);
    handleNavigate("home");
  };

  const handleUpdateSatellite = (id, satellite) => {
    console.log(`Satellite ${id} updated:`, satellite);
    handleNavigate("home");
  };

  const handleSearchSatellite = (name) => {
    console.log(`Searching for satellite: ${name}`);
    // Mock result
    return { id: "123", name, details: "Mock data" };
  };

  const handleDeleteSatellite = (id) => {
    console.log(`Satellite ${id} deleted.`);
    handleNavigate("home");
  };

  return <div>{renderView()}</div>;
};

export default SatelliteDashboard;
