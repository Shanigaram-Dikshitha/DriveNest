function FilterSidebar({
  filters,
  setFilters,
  clearFilters,
  isMobileOpen,
  onClose,
}) {
  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    setFilters((currentFilters) => ({
      ...currentFilters,
      [name]: value,
    }));
  };

  return (
    <>
      {isMobileOpen && (
        <div
          className="filter-sidebar-overlay"
          onClick={onClose}
        ></div>
      )}

      <aside
        className={
          isMobileOpen
            ? "filter-sidebar filter-sidebar-mobile-open"
            : "filter-sidebar"
        }
      >
        <div className="filter-header">
          <h2>Filters</h2>

          <div className="filter-header-actions">
            <button
              type="button"
              className="clear-filter-btn"
              onClick={clearFilters}
            >
              Clear All
            </button>

            <button
              type="button"
              className="filter-close-btn"
              onClick={onClose}
              aria-label="Close filters"
            >
              ×
            </button>
          </div>
        </div>

        {/* VEHICLE TYPE */}
        <div className="filter-group">
          <label htmlFor="type">Vehicle Type</label>

          <select
            id="type"
            name="type"
            value={filters.type || ""}
            onChange={handleFilterChange}
          >
            <option value="">All Types</option>
            <option value="Car">Car</option>
            <option value="Bike">Bike</option>
            <option value="SUV">SUV</option>
            <option value="Sedan">Sedan</option>
            <option value="Hatchback">Hatchback</option>
          </select>
        </div>

        {/* PRICE RANGE */}
        <div className="filter-group">
          <label htmlFor="priceRange">Price Range</label>

          <select
            id="priceRange"
            name="priceRange"
            value={filters.priceRange || ""}
            onChange={handleFilterChange}
          >
            <option value="">All Prices</option>
            <option value="under-2">
              Under ₹2 Lakhs
            </option>
            <option value="2-5">
              ₹2–5 Lakhs
            </option>
            <option value="5-10">
              ₹5–10 Lakhs
            </option>
            <option value="10-20">
              ₹10–20 Lakhs
            </option>
            <option value="above-20">
              Above ₹20 Lakhs
            </option>
          </select>
        </div>

        {/* FUEL */}
        <div className="filter-group">
          <label htmlFor="fuel">Fuel Type</label>

          <select
            id="fuel"
            name="fuel"
            value={filters.fuel || ""}
            onChange={handleFilterChange}
          >
            <option value="">All Fuel Types</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
            <option value="CNG">CNG</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>

        {/* TRANSMISSION */}
        <div className="filter-group">
          <label htmlFor="transmission">Transmission</label>

          <select
            id="transmission"
            name="transmission"
            value={filters.transmission || ""}
            onChange={handleFilterChange}
          >
            <option value="">All Transmissions</option>
            <option value="Manual">Manual</option>
            <option value="Automatic">Automatic</option>
          </select>
        </div>

        {/* YEAR */}
        <div className="filter-group">
          <label htmlFor="year">Year</label>

          <select
            id="year"
            name="year"
            value={filters.year || ""}
            onChange={handleFilterChange}
          >
            <option value="">All Years</option>
            <option value="2026">2026</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="older">Older</option>
          </select>
        </div>

        {/* COLOR */}
        <div className="filter-group">
          <label htmlFor="color">Color</label>

          <select
            id="color"
            name="color"
            value={filters.color || ""}
            onChange={handleFilterChange}
          >
            <option value="">All Colors</option>
            <option value="Red">Red</option>
            <option value="Black">Black</option>
            <option value="White">White</option>
            <option value="Blue">Blue</option>
            <option value="Grey">Grey</option>
            <option value="Silver">Silver</option>
            <option value="Brown">Brown</option>
          </select>
        </div>

        {/* LOCATION */}
        <div className="filter-group">
          <label htmlFor="location">Location</label>

          <input
            id="location"
            type="text"
            name="location"
            value={filters.location || ""}
            onChange={handleFilterChange}
            placeholder="Enter city"
          />
        </div>

        {/* MOBILE APPLY */}
        <div className="filter-mobile-actions">
          <button
            type="button"
            className="apply-filter-btn"
            onClick={onClose}
          >
            Apply Filters
          </button>
        </div>
      </aside>
    </>
  );
}

export default FilterSidebar;