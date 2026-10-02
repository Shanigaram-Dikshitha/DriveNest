import { createContext, useContext, useState } from "react";

const VehicleContext = createContext();

export function VehicleProvider({ children }) {
  const [favoriteIds, setFavoriteIds] = useState(() => {
    return (
      JSON.parse(
        localStorage.getItem("favoriteVehicles")
      ) || []
    );
  });

  const [compareIds, setCompareIds] = useState(() => {
    return (
      JSON.parse(
        localStorage.getItem("compareVehicles")
      ) || []
    );
  });

  const toggleFavorite = (vehicleId) => {
    setFavoriteIds((currentIds) => {
      let updatedIds;

      if (currentIds.includes(vehicleId)) {
        updatedIds = currentIds.filter(
          (id) => id !== vehicleId
        );
      } else {
        updatedIds = [...currentIds, vehicleId];
      }

      localStorage.setItem(
        "favoriteVehicles",
        JSON.stringify(updatedIds)
      );

      return updatedIds;
    });
  };

  const toggleCompare = (vehicleId) => {
    setCompareIds((currentIds) => {
      if (currentIds.includes(vehicleId)) {
        const updatedIds = currentIds.filter(
          (id) => id !== vehicleId
        );

        localStorage.setItem(
          "compareVehicles",
          JSON.stringify(updatedIds)
        );

        return updatedIds;
      }

      if (currentIds.length >= 3) {
        alert("You can compare up to 3 vehicles.");
        return currentIds;
      }

      const updatedIds = [...currentIds, vehicleId];

      localStorage.setItem(
        "compareVehicles",
        JSON.stringify(updatedIds)
      );

      return updatedIds;
    });
  };

  const removeFavorite = (vehicleId) => {
    setFavoriteIds((currentIds) => {
      const updatedIds = currentIds.filter(
        (id) => id !== vehicleId
      );

      localStorage.setItem(
        "favoriteVehicles",
        JSON.stringify(updatedIds)
      );

      return updatedIds;
    });
  };

  const removeCompare = (vehicleId) => {
    setCompareIds((currentIds) => {
      const updatedIds = currentIds.filter(
        (id) => id !== vehicleId
      );

      localStorage.setItem(
        "compareVehicles",
        JSON.stringify(updatedIds)
      );

      return updatedIds;
    });
  };

  const clearCompare = () => {
    setCompareIds([]);

    localStorage.setItem(
      "compareVehicles",
      JSON.stringify([])
    );
  };

  const value = {
    favoriteIds,
    compareIds,
    toggleFavorite,
    toggleCompare,
    removeFavorite,
    removeCompare,
    clearCompare,
  };

  return (
    <VehicleContext.Provider value={value}>
      {children}
    </VehicleContext.Provider>
  );
}

export function useVehicleContext() {
  return useContext(VehicleContext);
}