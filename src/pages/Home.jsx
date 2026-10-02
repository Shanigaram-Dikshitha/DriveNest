import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";



import vehicles from "../data/vehicles";

import VehicleCard from "../components/VehicleCard";



function Home() {

  const navigate = useNavigate();



  const [searchData, setSearchData] = useState({

    vehicleName: "",

    brand: "",

    model: "",

    location: "",

    minPrice: "",

    maxPrice: "",

  });



  const handleSearchChange = (e) => {

    const { name, value } = e.target;



    setSearchData((currentData) => ({

      ...currentData,

      [name]: value,

    }));

  };



  const handleSearch = (e) => {

    e.preventDefault();



    const typeMap = {

      bike: "Bike",

      bikes: "Bike",



      car: "Car",

      cars: "Car",



      suv: "SUV",

      suvs: "SUV",



      sedan: "Sedan",

      sedans: "Sedan",



      hatchback: "Hatchback",

      hatchbacks: "Hatchback",

    };



    const enteredVehicle =

      searchData.vehicleName.trim();



    const normalizedVehicle =

      typeMap[enteredVehicle.toLowerCase()] ||

      enteredVehicle;



    const params = new URLSearchParams();



    if (normalizedVehicle) {

      params.set(

        "vehicleName",

        normalizedVehicle

      );

    }



    if (searchData.brand.trim()) {

      params.set(

        "brand",

        searchData.brand.trim()

      );

    }



    if (searchData.model.trim()) {

      params.set(

        "model",

        searchData.model.trim()

      );

    }



    if (searchData.location.trim()) {

      params.set(

        "location",

        searchData.location.trim()

      );

    }



    if (searchData.minPrice) {

      params.set(

        "minPrice",

        searchData.minPrice

      );

    }



    if (searchData.maxPrice) {

      params.set(

        "maxPrice",

        searchData.maxPrice

      );

    }



    navigate(

      `/vehicles?${params.toString()}`

    );

  };



  const featuredVehicles = vehicles.slice(0, 4);

  const recentVehicles = vehicles.slice(4, 8);



  const popularBrands = [

    "Toyota",

    "Hyundai",

    "Honda",

    "Maruti Suzuki",

    "Tata",

    "Kia",

    "Mahindra",

    "Ford",

  ];



  return (

    <main>



      {/* =====================================================

          HERO SECTION

      ===================================================== */}



      <section className="hero">



        <div className="hero-content">



          <span className="hero-label">

            FIND YOUR NEXT RIDE

          </span>



          <h1>

            Find the right

            <span> vehicle </span>

            for you

          </h1>



          <p className="hero-description">

            Browse quality pre-owned cars, bikes and SUVs

            from trusted sellers across different locations.

          </p>



          {/* Search */}



          <form

            className="search-area"

            onSubmit={handleSearch}

          >



            <input

              type="text"

              name="vehicleName"

              value={searchData.vehicleName}

              onChange={handleSearchChange}

              placeholder="Vehicle Name"

            />



            <input

              type="text"

              name="brand"

              value={searchData.brand}

              onChange={handleSearchChange}

              placeholder="Brand"

            />



            <input

              type="text"

              name="model"

              value={searchData.model}

              onChange={handleSearchChange}

              placeholder="Model"

            />



            <input

              type="text"

              name="location"

              value={searchData.location}

              onChange={handleSearchChange}

              placeholder="Location"

            />



            <input

              type="number"

              name="minPrice"

              value={searchData.minPrice}

              onChange={handleSearchChange}

              placeholder="Min Price"

              min="0"

            />



            <input

              type="number"

              name="maxPrice"

              value={searchData.maxPrice}

              onChange={handleSearchChange}

              placeholder="Max Price"

              min="0"

            />



            <button type="submit">

              Search

            </button>



          </form>



        </div>



      </section>





      {/* =====================================================

          CATEGORIES

      ===================================================== */}



      <section className="home-section categories-section">



        <div className="section-heading">

          <span>EXPLORE</span>



          <h2>Browse by Category</h2>



          <p>

            Find a vehicle that matches your needs.

          </p>

        </div>



        <div className="categories-grid">



          <Link

            to="/vehicles?type=Car"

            className="category-card"

          >

            <div className="category-icon">

              🚗

            </div>



            <h3>Cars</h3>



            <p>

              Explore used cars

            </p>

          </Link>





          <Link

            to="/vehicles?type=Bike"

            className="category-card"

          >

            <div className="category-icon">

              🏍️

            </div>



            <h3>Bikes</h3>



            <p>

              Explore used bikes

            </p>

          </Link>





          <Link

            to="/vehicles?type=SUV"

            className="category-card"

          >

            <div className="category-icon">

              🚙

            </div>



            <h3>SUVs</h3>



            <p>

              Explore used SUVs

            </p>

          </Link>





          <Link

            to="/vehicles?type=Sedan"

            className="category-card"

          >

            <div className="category-icon">

              🚘

            </div>



            <h3>Sedans</h3>



            <p>

              Explore used sedans

            </p>

          </Link>





          <Link

            to="/vehicles?type=Hatchback"

            className="category-card"

          >

            <div className="category-icon">

              🚗

            </div>



            <h3>Hatchbacks</h3>



            <p>

              Explore used hatchbacks

            </p>

          </Link>



        </div>



      </section>





      {/* =====================================================

          FEATURED VEHICLES

      ===================================================== */}



      <section className="home-section">



        <div className="section-heading-row">



          <div className="section-heading">

            <span>FEATURED</span>



            <h2>Featured Vehicles</h2>



            <p>

              Take a look at some of our featured vehicles.

            </p>

          </div>



          <Link

            to="/vehicles"

            className="section-view-all"

          >

            View All →

          </Link>



        </div>



        <div className="vehicle-grid">



          {featuredVehicles.map((vehicle) => (

            <VehicleCard

              key={vehicle.id}

              vehicle={vehicle}

            />

          ))}



        </div>



      </section>





      {/* =====================================================

          RECENTLY ADDED

      ===================================================== */}



      <section className="home-section recent-section">



        <div className="section-heading-row">



          <div className="section-heading">

            <span>NEW ARRIVALS</span>



            <h2>Recently Added Vehicles</h2>



            <p>

              Check out the latest vehicles added to DriveNest.

            </p>

          </div>



          <Link

            to="/vehicles"

            className="section-view-all"

          >

            View All →

          </Link>



        </div>



        <div className="vehicle-grid">



          {recentVehicles.map((vehicle) => (

            <VehicleCard

              key={vehicle.id}

              vehicle={vehicle}

            />

          ))}



        </div>



      </section>





      {/* =====================================================

          POPULAR BRANDS

      ===================================================== */}



      <section className="home-section brands-section">



        <div className="section-heading">



          <span>BRANDS</span>



          <h2>Popular Brands</h2>



          <p>

            Search vehicles from popular manufacturers.

          </p>



        </div>



        <div className="brands-grid">



          {popularBrands.map((brand) => (

            <button

              type="button"

              key={brand}

              className="brand-card"

              onClick={() => {

                const params = new URLSearchParams();



                params.set("brand", brand);



                navigate(

                  `/vehicles?${params.toString()}`

                );

              }}

            >

              {brand}

            </button>

          ))}



        </div>



      </section>





      {/* =====================================================

          WHY CHOOSE US

      ===================================================== */}



      <section className="home-section why-section">



        <div className="section-heading">



          <span>WHY DRIVENEST</span>



          <h2>Why Choose Us?</h2>



          <p>

            A simple and convenient way to buy and sell

            pre-owned vehicles.

          </p>



        </div>



        <div className="why-grid">



          <div className="why-card">



            <div className="why-icon">

              🔍

            </div>



            <h3>Easy Search</h3>



            <p>

              Quickly find vehicles using search,

              filters and sorting.

            </p>



          </div>





          <div className="why-card">



            <div className="why-icon">

              ❤️

            </div>



            <h3>Save Favorites</h3>



            <p>

              Save vehicles you like and view them later.

            </p>



          </div>





          <div className="why-card">



            <div className="why-icon">

              ⚖️

            </div>



            <h3>Compare Vehicles</h3>



            <p>

              Compare important vehicle details side by side.

            </p>



          </div>





          <div className="why-card">



            <div className="why-icon">

              📩

            </div>



            <h3>Contact Sellers</h3>



            <p>

              Send enquiries directly to vehicle sellers.

            </p>



          </div>



        </div>



      </section>





      {/* =====================================================

          TESTIMONIALS

      ===================================================== */}



      <section className="home-section testimonials-section">



        <div className="section-heading">



          <span>REVIEWS</span>



          <h2>What Our Users Say</h2>



          <p>

            Experiences from people using DriveNest.

          </p>



        </div>



        <div className="testimonials-grid">



          <div className="testimonial-card">



            <div className="testimonial-stars">

              ★★★★★

            </div>



            <p>

              "The search and filtering options made it

              really easy to find vehicles according to

              my requirements."

            </p>



            <h3>

              Rahul

            </h3>



            <span>

              Hyderabad

            </span>



          </div>





          <div className="testimonial-card">



            <div className="testimonial-stars">

              ★★★★★

            </div>



            <p>

              "I liked the comparison feature because I

              could check different vehicles before making

              a decision."

            </p>



            <h3>

              Priya

            </h3>



            <span>

              Bengaluru

            </span>



          </div>





          <div className="testimonial-card">



            <div className="testimonial-stars">

              ★★★★★

            </div>



            <p>

              "The selling process is simple and the form

              allows me to save a draft and continue later."

            </p>



            <h3>

              Arjun

            </h3>



            <span>

              Chennai

            </span>



          </div>



        </div>



      </section>





      {/* =====================================================

          SELL CTA

      ===================================================== */}



      <section className="sell-cta">



        <div className="sell-cta-content">



          <span>

            READY TO SELL?

          </span>



          <h2>

            Sell Your Vehicle on DriveNest

          </h2>



          <p>

            Create a listing, save it as a draft and

            continue whenever you're ready.

          </p>



          <Link

            to="/sell"

            className="primary-btn"

          >

            Sell Your Vehicle →

          </Link>



        </div>



      </section>



    </main>

  );

}



export default Home;