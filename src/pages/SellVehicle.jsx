import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import "./SellVehicle.css";

const EMPTY_FORM = {
  type: "",
  brand: "",
  model: "",
  variant: "",
  manufacturingYear: "",
  registrationYear: "",
  fuel: "",
  transmission: "",
  kilometers: "",
  owners: "",
  color: "",
  price: "",
  state: "",
  city: "",
  pincode: "",
  description: "",
  sellerName: "",
  phone: "",
  email: "",
  imageName: "",
  imageData: "",
};

function getSavedListings() {
  try {
    return JSON.parse(localStorage.getItem("sellerListings")) || [];
  } catch {
    return [];
  }
}

/*
  Convert the selected image into a compressed data URL so the
  image can be stored with the draft in localStorage.
*/
function readImageFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const image = new Image();

      image.onload = () => {
        const maxSize = 900;

        let width = image.width;
        let height = image.height;

        if (width > maxSize || height > maxSize) {
          if (width > height) {
            height = Math.round((height * maxSize) / width);
            width = maxSize;
          } else {
            width = Math.round((width * maxSize) / height);
            height = maxSize;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const context = canvas.getContext("2d");

        if (!context) {
          reject(new Error("Unable to process image."));
          return;
        }

        context.drawImage(image, 0, 0, width, height);

        const compressedImage = canvas.toDataURL(
          "image/jpeg",
          0.78
        );

        resolve(compressedImage);
      };

      image.onerror = () => {
        reject(new Error("Unable to read the selected image."));
      };

      image.src = reader.result;
    };

    reader.onerror = () => {
      reject(reader.error || new Error("Unable to read image file."));
    };

    reader.readAsDataURL(file);
  });
}

function SellVehicle() {
  const [searchParams] = useSearchParams();

  const editId = searchParams.get("editId");

  const existingListing = editId
    ? getSavedListings().find(
        (listing) => String(listing.id) === String(editId)
      )
    : null;

  const [formData, setFormData] = useState(() => ({
    ...EMPTY_FORM,
    ...(existingListing || {}),
  }));

  const [editingId, setEditingId] = useState(
    existingListing ? String(existingListing.id) : null
  );

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: "",
    }));

    setMessage("");
  };

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setMessage("Please select a valid image file.");
      return;
    }

    try {
      const imageData = await readImageFile(file);

      setFormData((currentData) => ({
        ...currentData,
        imageName: file.name,
        imageData,
      }));

      setMessage("Vehicle image selected successfully.");
    } catch {
      setMessage("Unable to process this image. Please try another image.");
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.type) {
      newErrors.type = "Please select vehicle type.";
    }

    if (!formData.brand.trim()) {
      newErrors.brand = "Brand is required.";
    }

    if (!formData.model.trim()) {
      newErrors.model = "Model is required.";
    }

    if (!formData.manufacturingYear) {
      newErrors.manufacturingYear =
        "Manufacturing year is required.";
    }

    if (!formData.registrationYear) {
      newErrors.registrationYear =
        "Registration year is required.";
    }

    if (!formData.fuel) {
      newErrors.fuel = "Please select fuel type.";
    }

    if (!formData.transmission) {
      newErrors.transmission =
        "Please select transmission.";
    }

    if (
      formData.kilometers === "" ||
      Number(formData.kilometers) < 0
    ) {
      newErrors.kilometers =
        "Enter a valid kilometers value.";
    }

    if (!formData.owners) {
      newErrors.owners =
        "Number of owners is required.";
    }

    if (!formData.color.trim()) {
      newErrors.color = "Color is required.";
    }

    if (
      formData.price === "" ||
      Number(formData.price) <= 0
    ) {
      newErrors.price =
        "Enter a valid selling price.";
    }

    if (!formData.state.trim()) {
      newErrors.state = "State is required.";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required.";
    }

    if (!formData.pincode.trim()) {
      newErrors.pincode =
        "Area/Pincode is required.";
    }

    if (!formData.description.trim()) {
      newErrors.description =
        "Description is required.";
    }

    if (!formData.sellerName.trim()) {
      newErrors.sellerName =
        "Seller name is required.";
    }

    if (!/^[6-9][0-9]{9}$/.test(formData.phone)) {
      newErrors.phone =
        "Enter a valid 10-digit mobile number.";
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email
      )
    ) {
      newErrors.email =
        "Enter a valid email address.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /*
    SAVE DRAFT
    Draft does not require validation.
    The user can save after filling only part of the form.
  */
  const saveDraft = () => {
    const savedListings = getSavedListings();
    const now = new Date().toLocaleString("en-IN");

    const updatedListings = editingId
      ? savedListings.map((listing) => {
          if (String(listing.id) !== String(editingId)) {
            return listing;
          }

          return {
            ...listing,
            ...formData,
            id: listing.id,
            status: "Draft",
            updatedAt: now,
          };
        })
      : [
          ...savedListings,
          {
            id: Date.now(),
            ...formData,
            status: "Draft",
            createdAt: now,
            updatedAt: now,
          },
        ];

    try {
      localStorage.setItem(
        "sellerListings",
        JSON.stringify(updatedListings)
      );

      if (!editingId) {
        const savedDraft = updatedListings[updatedListings.length - 1];
        setEditingId(String(savedDraft.id));
      }

      setMessage(
        editingId
          ? "Your draft has been updated successfully."
          : "Your draft has been saved successfully."
      );
    } catch {
      setMessage(
        "The image could not be saved. Please choose a smaller image and try again."
      );
    }
  };

  const previewListing = () => {
    if (!validateForm()) {
      setMessage(
        "Please correct the errors before previewing."
      );
      return;
    }

    setShowPreview(true);
    setMessage("");
  };

  /*
    SUBMIT LISTING
    If an existing draft is being edited, update that same listing.
    Do not create a duplicate.
  */
  const submitListing = () => {
    if (!validateForm()) {
      setMessage(
        "Please correct the errors before submitting."
      );
      return;
    }

    const savedListings = getSavedListings();
    const now = new Date().toLocaleString("en-IN");

    let updatedListings;

    if (editingId) {
      updatedListings = savedListings.map((listing) => {
        if (String(listing.id) !== String(editingId)) {
          return listing;
        }

        return {
          ...listing,
          ...formData,
          id: listing.id,
          status: "Submitted",
          updatedAt: now,
        };
      });
    } else {
      const newListing = {
        id: Date.now(),
        ...formData,
        status: "Submitted",
        createdAt: now,
        updatedAt: now,
      };

      updatedListings = [
        ...savedListings,
        newListing,
      ];

      setEditingId(String(newListing.id));
    }

    try {
      localStorage.setItem(
        "sellerListings",
        JSON.stringify(updatedListings)
      );

      setMessage(
        "Your vehicle listing has been submitted successfully!"
      );

      setShowPreview(false);
    } catch {
      setMessage(
        "The listing could not be saved. Please choose a smaller image and try again."
      );
    }
  };

  return (
    <main className="sell-page">
      <div className="sell-container">

        <div className="sell-header">
          <p className="section-label">
            SELL YOUR VEHICLE
          </p>

          <h1>
            {editingId
              ? "Continue Your Listing"
              : "List Your Vehicle"}
          </h1>

          <p>
            {editingId
              ? "Continue from where you stopped."
              : "Provide the vehicle details below to create your listing on DriveNest."}
          </p>
        </div>

        {message && (
          <div className="form-message">
            {message}
          </div>
        )}

        {editingId && (
          <div className="form-message">
            Draft loaded. You can continue filling
            the remaining details.
          </div>
        )}

        <form
          className="sell-form"
          onSubmit={(e) => e.preventDefault()}
        >

          {/* VEHICLE INFORMATION */}
          <section className="form-section">
            <h2>1. Vehicle Information</h2>

            <div className="form-grid">

              <div className="form-group">
                <label>Vehicle Type *</label>

                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                >
                  <option value="">
                    Select Type
                  </option>
                  <option value="Car">Car</option>
                  <option value="Bike">Bike</option>
                  <option value="SUV">SUV</option>
                  <option value="Sedan">Sedan</option>
                  <option value="Hatchback">
                    Hatchback
                  </option>
                </select>

                {errors.type && (
                  <span className="error">
                    {errors.type}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label>Brand *</label>

                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  placeholder="e.g. Toyota"
                />

                {errors.brand && (
                  <span className="error">
                    {errors.brand}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label>Model *</label>

                <input
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  placeholder="e.g. Innova Crysta"
                />

                {errors.model && (
                  <span className="error">
                    {errors.model}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label>Variant</label>

                <input
                  type="text"
                  name="variant"
                  value={formData.variant}
                  onChange={handleChange}
                  placeholder="e.g. ZX"
                />
              </div>

              <div className="form-group">
                <label>Manufacturing Year *</label>

                <input
                  type="number"
                  name="manufacturingYear"
                  value={formData.manufacturingYear}
                  onChange={handleChange}
                  placeholder="2022"
                />

                {errors.manufacturingYear && (
                  <span className="error">
                    {errors.manufacturingYear}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label>Registration Year *</label>

                <input
                  type="number"
                  name="registrationYear"
                  value={formData.registrationYear}
                  onChange={handleChange}
                  placeholder="2022"
                />

                {errors.registrationYear && (
                  <span className="error">
                    {errors.registrationYear}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label>Fuel Type *</label>

                <select
                  name="fuel"
                  value={formData.fuel}
                  onChange={handleChange}
                >
                  <option value="">
                    Select Fuel
                  </option>
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Electric">
                    Electric
                  </option>
                  <option value="CNG">CNG</option>
                  <option value="Hybrid">Hybrid</option>
                </select>

                {errors.fuel && (
                  <span className="error">
                    {errors.fuel}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label>Transmission *</label>

                <select
                  name="transmission"
                  value={formData.transmission}
                  onChange={handleChange}
                >
                  <option value="">
                    Select Transmission
                  </option>
                  <option value="Manual">Manual</option>
                  <option value="Automatic">
                    Automatic
                  </option>
                </select>

                {errors.transmission && (
                  <span className="error">
                    {errors.transmission}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label>Kilometers Driven *</label>

                <input
                  type="number"
                  name="kilometers"
                  value={formData.kilometers}
                  onChange={handleChange}
                  placeholder="42000"
                />

                {errors.kilometers && (
                  <span className="error">
                    {errors.kilometers}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label>Number of Owners *</label>

                <select
                  name="owners"
                  value={formData.owners}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="1">1 Owner</option>
                  <option value="2">2 Owners</option>
                  <option value="3">3 Owners</option>
                  <option value="4+">4+ Owners</option>
                </select>

                {errors.owners && (
                  <span className="error">
                    {errors.owners}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label>Color *</label>

                <input
                  type="text"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  placeholder="White"
                />

                {errors.color && (
                  <span className="error">
                    {errors.color}
                  </span>
                )}
              </div>

            </div>
          </section>

          {/* PRICE */}
          <section className="form-section">
            <h2>2. Pricing</h2>

            <div className="form-grid">
              <div className="form-group">
                <label>Expected Selling Price *</label>

                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="800000"
                />

                {errors.price && (
                  <span className="error">
                    {errors.price}
                  </span>
                )}
              </div>
            </div>
          </section>

          {/* LOCATION */}
          <section className="form-section">
            <h2>3. Location</h2>

            <div className="form-grid">

              <div className="form-group">
                <label>State *</label>

                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="Telangana"
                />

                {errors.state && (
                  <span className="error">
                    {errors.state}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label>City *</label>

                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Hyderabad"
                />

                {errors.city && (
                  <span className="error">
                    {errors.city}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label>Area / Pincode *</label>

                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="500001"
                />

                {errors.pincode && (
                  <span className="error">
                    {errors.pincode}
                  </span>
                )}
              </div>

            </div>
          </section>

          {/* IMAGES */}
          <section className="form-section">
            <h2>4. Vehicle Image</h2>

            <div className="form-group">
              <label>Select Vehicle Image</label>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />

              {formData.imageName && (
                <span className="image-selected">
                  Selected: {formData.imageName}
                </span>
              )}

              {formData.imageData && (
                <img
                  src={formData.imageData}
                  alt="Selected vehicle preview"
                  style={{
                    width: "180px",
                    height: "110px",
                    marginTop: "12px",
                    borderRadius: "10px",
                    objectFit: "cover",
                    border: "1px solid #e5e7eb",
                  }}
                />
              )}
            </div>
          </section>

          {/* DESCRIPTION */}
          <section className="form-section">
            <h2>5. Description</h2>

            <div className="form-group">
              <label>Vehicle Description *</label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="5"
                placeholder="Describe the vehicle condition, service history and other important details."
              />

              {errors.description && (
                <span className="error">
                  {errors.description}
                </span>
              )}
            </div>
          </section>

          {/* SELLER */}
          <section className="form-section">
            <h2>6. Seller Information</h2>

            <div className="form-grid">

              <div className="form-group">
                <label>Seller Name *</label>

                <input
                  type="text"
                  name="sellerName"
                  value={formData.sellerName}
                  onChange={handleChange}
                  placeholder="Your name"
                />

                {errors.sellerName && (
                  <span className="error">
                    {errors.sellerName}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label>Phone *</label>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="10-digit mobile number"
                />

                {errors.phone && (
                  <span className="error">
                    {errors.phone}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label>Email Address *</label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                />

                {errors.email && (
                  <span className="error">
                    {errors.email}
                  </span>
                )}
              </div>

            </div>
          </section>

          {/* ACTIONS */}
          <div className="sell-actions">

            <button
              type="button"
              className="secondary-btn"
              onClick={saveDraft}
            >
              Save Draft
            </button>

            <button
              type="button"
              className="secondary-btn"
              onClick={previewListing}
            >
              Preview Listing
            </button>

            <button
              type="button"
              className="primary-btn"
              onClick={submitListing}
            >
              Submit Listing
            </button>

          </div>
        </form>

        {/* PREVIEW */}
        {showPreview && (
          <section className="listing-preview">

            <div className="preview-header">
              <h2>Listing Preview</h2>

              <button
                type="button"
                onClick={() => setShowPreview(false)}
              >
                Close
              </button>
            </div>

            <h3>
              {formData.brand} {formData.model}
            </h3>

            <p>
              ₹
              {Number(formData.price || 0).toLocaleString(
                "en-IN"
              )}
            </p>

            <p>
              {formData.manufacturingYear} •{" "}
              {formData.fuel} •{" "}
              {formData.transmission}
            </p>

            <p>
              {formData.kilometers} km •{" "}
              {formData.city}, {formData.state}
            </p>

            <p>
              {formData.description}
            </p>

            {formData.imageData && (
              <img
                src={formData.imageData}
                alt="Vehicle preview"
                style={{
                  width: "220px",
                  height: "135px",
                  marginTop: "10px",
                  borderRadius: "10px",
                  objectFit: "cover",
                }}
              />
            )}

          </section>
        )}
      </div>
    </main>
  );
}

export default SellVehicle;
