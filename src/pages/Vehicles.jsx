import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import vehicles from "../data/vehicles";
import VehicleCard from "../components/VehicleCard";
import FilterSidebar from "../components/FilterSidebar";
import Pagination from "../components/Pagination";
import "./Vehicles.css";

function normalizeValue(value) {
  return value.trim().toLowerCase();
}

function getVehicleType(value) {
  const typeMap = {
    car: "Car",
    cars: "Car",

    bike: "Bike",
    bikes: "Bike",

    suv: "SUV",
    suvs: "SUV",

    sedan: "Sedan",
    sedans: "Sedan",

    hatchback: "Hatchback",
    hatchbacks: "Hatchback",
  };

  return typeMap[normalizeValue(value)] || "";
}

// function getColorValue(value) {
//   const colorMap = {
//     red: "Red",
//     black: "Black",
//     white: "White",
//     blue: "Blue",
//     grey: "Grey",
//     gray: "Grey",
//     silver: "Silver",
//     brown: "Brown",
//   };

//   return colorMap[normalizeValue(value)] || "";
// }

function parseVehicleSearch(value) {
  const enteredText = value.trim();

  if (!enteredText) {
    return {
      text: "",
      type: "",
      color: "",
    };
  }

  const lowerText = normalizeValue(enteredText);

  const typeWords = {
    car: "Car",
    cars: "Car",
    bike: "Bike",
    bikes: "Bike",
    suv: "SUV",
    suvs: "SUV",
    sedan: "Sedan",
    sedans: "Sedan",
    hatchback: "Hatchback",
    hatchbacks: "Hatchback",
  };

  const colorWords = {
    red: "Red",
    black: "Black",
    white: "White",
    blue: "Blue",
    grey: "Grey",
    gray: "Grey",
    silver: "Silver",
    brown: "Brown",
  };

  let detectedType = "";
  let detectedColor = "";

  Object.keys(typeWords).forEach((word) => {
    if (lowerText.includes(word)) {
      detectedType = typeWords[word];
    }
  });

  Object.keys(colorWords).forEach((word) => {
    if (lowerText.includes(word)) {
      detectedColor = colorWords[word];
    }
  });

  let remainingText = lowerText;

  Object.keys(typeWords).forEach((word) => {
    remainingText = remainingText.replace(
      new RegExp(`\\b${word}\\b`, "gi"),
      ""
    );
  });

  Object.keys(colorWords).forEach((word) => {
    remainingText = remainingText.replace(
      new RegExp(`\\b${word}\\b`, "gi"),
      ""
    );
  });

  return {
    text: remainingText.replace(/\s+/g, " ").trim(),
    type: detectedType,
    color: detectedColor,
  };
}

function Vehicles() {
  const [searchParams] = useSearchParams();

  const urlVehicleName =
    searchParams.get("vehicleName") || "";

  const urlType =
    searchParams.get("type") || "";

  const urlBrand =
    searchParams.get("brand") || "";

  const urlModel =
    searchParams.get("model") || "";

  const urlLocation =
    searchParams.get("location") || "";

  const urlMinPrice =
    searchParams.get("minPrice") || "";

  const urlMaxPrice =
    searchParams.get("maxPrice") || "";

  const initialVehicleSearch =
    parseVehicleSearch(urlVehicleName);

  const [search, setSearch] = useState(
    initialVehicleSearch.text
  );

  const [searchType, setSearchType] = useState(
    getVehicleType(urlType) ||
      initialVehicleSearch.type
  );

  const [searchColor, setSearchColor] = useState(
    initialVehicleSearch.color
  );

  const [brandSearch, setBrandSearch] =
    useState(urlBrand);

  const [modelSearch, setModelSearch] =
    useState(urlModel);

  const [locationSearch, setLocationSearch] =
    useState(urlLocation);

  const [minPrice, setMinPrice] =
    useState(urlMinPrice);

  const [maxPrice, setMaxPrice] =
    useState(urlMaxPrice);

  const [sortBy, setSortBy] =
    useState("default");

  const [currentPage, setCurrentPage] =
    useState(1);

  const [filterOpen, setFilterOpen] =
    useState(false);

  const vehiclesPerPage = 6;

  const [filters, setFilters] = useState({
    type:
      getVehicleType(urlType) ||
      initialVehicleSearch.type ||
      "",

    priceRange: "",

    fuel: "",

    transmission: "",

    year: "",

    location: urlLocation || "",

    color:
      initialVehicleSearch.color || "",
  });

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    const parsed = parseVehicleSearch(search);

    setSearch(parsed.text);

    if (parsed.type) {
      setSearchType(parsed.type);

      setFilters((currentFilters) => ({
        ...currentFilters,
        type: parsed.type,
      }));
    }

    if (parsed.color) {
      setSearchColor(parsed.color);

      setFilters((currentFilters) => ({
        ...currentFilters,
        color: parsed.color,
      }));
    }

    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({
      type: "",
      priceRange: "",
      fuel: "",
      transmission: "",
      year: "",
      location: "",
      color: "",
    });

    setSearch("");
    setSearchType("");
    setSearchColor("");
    setBrandSearch("");
    setModelSearch("");
    setLocationSearch("");
    setMinPrice("");
    setMaxPrice("");
    setSortBy("default");
    setCurrentPage(1);
  };

  const filteredVehicles = useMemo(() => {
    let result = [...vehicles];

    const effectiveType =
      filters.type ||
      searchType;

    const effectiveColor =
      filters.color ||
      searchColor;

    const effectiveLocation =
      filters.location ||
      locationSearch;

    /* Vehicle Type */
    if (effectiveType) {
      result = result.filter(
        (vehicle) =>
          normalizeValue(vehicle.type) ===
          normalizeValue(effectiveType)
      );
    }

    /* Search text */
    if (search.trim()) {
      const searchText =
        normalizeValue(search);

      result = result.filter((vehicle) => {
        const brand =
          normalizeValue(vehicle.brand);

        const model =
          normalizeValue(vehicle.model);

        const variant =
          normalizeValue(vehicle.variant || "");

        const type =
          normalizeValue(vehicle.type);

        const color =
          normalizeValue(vehicle.color || "");

        return (
          brand.includes(searchText) ||
          model.includes(searchText) ||
          variant.includes(searchText) ||
          type.includes(searchText) ||
          color.includes(searchText)
        );
      });
    }

    /* Brand */
    if (brandSearch.trim()) {
      const brandText =
        normalizeValue(brandSearch);

      result = result.filter((vehicle) =>
        normalizeValue(vehicle.brand).includes(
          brandText
        )
      );
    }

    /* Model */
    if (modelSearch.trim()) {
      const modelText =
        normalizeValue(modelSearch);

      result = result.filter((vehicle) =>
        normalizeValue(vehicle.model).includes(
          modelText
        )
      );
    }

    /* Location */
    if (effectiveLocation.trim()) {
      const locationText =
        normalizeValue(effectiveLocation);

      result = result.filter((vehicle) =>
        normalizeValue(vehicle.location).includes(
          locationText
        )
      );
    }

    /* Color */
    if (effectiveColor) {
      result = result.filter(
        (vehicle) =>
          normalizeValue(vehicle.color || "") ===
          normalizeValue(effectiveColor)
      );
    }

    /* Minimum Price */
    if (minPrice !== "") {
      result = result.filter(
        (vehicle) =>
          Number(vehicle.price) >=
          Number(minPrice)
      );
    }

    /* Maximum Price */
    if (maxPrice !== "") {
      result = result.filter(
        (vehicle) =>
          Number(vehicle.price) <=
          Number(maxPrice)
      );
    }

    /* Price Range Filter */
    if (filters.priceRange) {
      result = result.filter((vehicle) => {
        const price = Number(vehicle.price);

        switch (filters.priceRange) {
          case "under-2":
            return price < 200000;

          case "2-5":
            return (
              price >= 200000 &&
              price <= 500000
            );

          case "5-10":
            return (
              price > 500000 &&
              price <= 1000000
            );

          case "10-20":
            return (
              price > 1000000 &&
              price <= 2000000
            );

          case "above-20":
            return price > 2000000;

          default:
            return true;
        }
      });
    }

    /* Fuel */
    if (filters.fuel) {
      result = result.filter(
        (vehicle) =>
          normalizeValue(vehicle.fuel) ===
          normalizeValue(filters.fuel)
      );
    }

    /* Transmission */
    if (filters.transmission) {
      result = result.filter(
        (vehicle) =>
          normalizeValue(
            vehicle.transmission
          ) ===
          normalizeValue(filters.transmission)
      );
    }

    /* Year */
    if (filters.year) {
      if (filters.year === "older") {
        result = result.filter(
          (vehicle) =>
            Number(vehicle.year) < 2022
        );
      } else {
        result = result.filter(
          (vehicle) =>
            Number(vehicle.year) ===
            Number(filters.year)
        );
      }
    }

    /* Sorting */
    switch (sortBy) {
      case "price-low":
        result.sort(
          (a, b) =>
            Number(a.price) -
            Number(b.price)
        );
        break;

      case "price-high":
        result.sort(
          (a, b) =>
            Number(b.price) -
            Number(a.price)
        );
        break;

      case "newest":
        result.sort(
          (a, b) =>
            Number(b.year) -
            Number(a.year)
        );
        break;

      case "oldest":
        result.sort(
          (a, b) =>
            Number(a.year) -
            Number(b.year)
        );
        break;

      case "km-low":
        result.sort(
          (a, b) =>
            Number(a.kilometers) -
            Number(b.kilometers)
        );
        break;

      case "km-high":
        result.sort(
          (a, b) =>
            Number(b.kilometers) -
            Number(a.kilometers)
        );
        break;

      default:
        break;
    }

    return result;
  }, [
    search,
    searchType,
    searchColor,
    brandSearch,
    modelSearch,
    locationSearch,
    minPrice,
    maxPrice,
    sortBy,
    filters,
  ]);

  const totalPages = Math.ceil(
    filteredVehicles.length /
      vehiclesPerPage
  );

  const safeCurrentPage =
    totalPages === 0
      ? 1
      : Math.min(
          currentPage,
          totalPages
        );

  const startIndex =
    (safeCurrentPage - 1) *
    vehiclesPerPage;

  const currentVehicles =
    filteredVehicles.slice(
      startIndex,
      startIndex + vehiclesPerPage
    );

  const handlePageChange = (page) => {
    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <main className="vehicles-page">

      <div className="page-container">

        {/* ==================================================
            PAGE HEADER
        ================================================== */}

        <div className="vehicles-header">

          <div>
            <p className="section-label">
              BUY VEHICLE
            </p>

            <h1 className="page-title">
              Find Your Vehicle
            </h1>

            <p>
              Search and filter used vehicles
              according to your requirements.
            </p>
          </div>

        </div>


        {/* ==================================================
            SEARCH BAR
        ================================================== */}

        <form
          className="vehicles-search-bar"
          onSubmit={handleSearchSubmit}
        >

          <input
            type="text"
            value={search}
            onChange={(event) => {
              const value =
                event.target.value;

              const parsed =
                parseVehicleSearch(value);

              setSearch(parsed.text);
              setSearchType(parsed.type);
              setSearchColor(parsed.color);

              setFilters((currentFilters) => ({
                ...currentFilters,
                type: parsed.type,
                color: parsed.color,
              }));

              setCurrentPage(1);
            }}
            placeholder="Vehicle, color or type e.g. Red Bike"
          />

          <input
            type="text"
            value={brandSearch}
            onChange={(event) => {
              setBrandSearch(
                event.target.value
              );

              setCurrentPage(1);
            }}
            placeholder="Brand"
          />

          <input
            type="text"
            value={modelSearch}
            onChange={(event) => {
              setModelSearch(
                event.target.value
              );

              setCurrentPage(1);
            }}
            placeholder="Model"
          />

          <input
            type="text"
            value={locationSearch}
            onChange={(event) => {
              setLocationSearch(
                event.target.value
              );

              setCurrentPage(1);
            }}
            placeholder="Location"
          />

          <input
            type="number"
            value={minPrice}
            onChange={(event) => {
              setMinPrice(
                event.target.value
              );

              setCurrentPage(1);
            }}
            placeholder="Min Price"
            min="0"
          />

          <input
            type="number"
            value={maxPrice}
            onChange={(event) => {
              setMaxPrice(
                event.target.value
              );

              setCurrentPage(1);
            }}
            placeholder="Max Price"
            min="0"
          />

          <button type="submit">
            Search
          </button>

        </form>


        {/* ==================================================
            MOBILE CONTROLS
        ================================================== */}

        <div className="vehicles-mobile-controls">

          <button
            type="button"
            className="mobile-filter-btn"
            onClick={() =>
              setFilterOpen(true)
            }
          >
            ☰ Filters
          </button>

          <select
            value={sortBy}
            onChange={(event) => {
              setSortBy(
                event.target.value
              );

              setCurrentPage(1);
            }}
          >
            <option value="default">
              Sort By
            </option>

            <option value="price-low">
              Price: Low to High
            </option>

            <option value="price-high">
              Price: High to Low
            </option>

            <option value="newest">
              Newest Vehicles
            </option>

            <option value="oldest">
              Oldest Vehicles
            </option>

            <option value="km-low">
              Lowest Kilometers
            </option>

            <option value="km-high">
              Highest Kilometers
            </option>
          </select>

        </div>


        {/* ==================================================
            CONTENT
        ================================================== */}

        <div className="vehicles-layout">

          {/* Filter Sidebar */}

          <FilterSidebar
            filters={filters}
            setFilters={(updatedFilters) => {
              setFilters(updatedFilters);
              setCurrentPage(1);
            }}
            clearFilters={clearFilters}
            isMobileOpen={filterOpen}
            onClose={() =>
              setFilterOpen(false)
            }
          />


          {/* Results */}

          <section className="vehicles-results">

            <div className="results-top">

              <div>
                <strong>
                  {filteredVehicles.length}
                </strong>{" "}
                vehicles found

                {searchColor && (
                  <span className="search-result-tag">
                    Color: {searchColor}
                  </span>
                )}

                {searchType && (
                  <span className="search-result-tag">
                    Type: {searchType}
                  </span>
                )}
              </div>

              <select
                value={sortBy}
                onChange={(event) => {
                  setSortBy(
                    event.target.value
                  );

                  setCurrentPage(1);
                }}
              >
                <option value="default">
                  Sort By
                </option>

                <option value="price-low">
                  Price: Low to High
                </option>

                <option value="price-high">
                  Price: High to Low
                </option>

                <option value="newest">
                  Newest Vehicles
                </option>

                <option value="oldest">
                  Oldest Vehicles
                </option>

                <option value="km-low">
                  Lowest Kilometers
                </option>

                <option value="km-high">
                  Highest Kilometers
                </option>
              </select>

            </div>


            {/* Empty State */}

            {filteredVehicles.length === 0 ? (
              <div className="empty-state">

                <div className="empty-state-icon">
                  🚗
                </div>

                <h2>
                  No vehicles found
                </h2>

                <p>
                  Try changing your search
                  or filters.
                </p>

                <button
                  type="button"
                  className="primary-btn"
                  onClick={clearFilters}
                >
                  Clear All Filters
                </button>

              </div>
            ) : (
              <>
                <div className="vehicle-grid">

                  {currentVehicles.map(
                    (vehicle) => (
                      <VehicleCard
                        key={vehicle.id}
                        vehicle={vehicle}
                      />
                    )
                  )}

                </div>

                <Pagination
                  currentPage={safeCurrentPage}
                  totalPages={totalPages}
                  onPageChange={
                    handlePageChange
                  }
                />
              </>
            )}

          </section>

        </div>

      </div>

    </main>
  );
}

export default Vehicles;