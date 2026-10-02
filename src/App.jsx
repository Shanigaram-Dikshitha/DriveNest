import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import { VehicleProvider } from "./context/VehicleContext";

import Home from "./pages/Home";
import Vehicles from "./pages/Vehicles";
import VehicleDetails from "./pages/VehicleDetails";
import SellVehicle from "./pages/SellVehicle";
import Favorites from "./pages/Favorites";
import Compare from "./pages/Compare";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import MyListings from "./pages/MyListings";
import Enquiries from "./pages/Enquiries";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import EditProfile from "./pages/EditProfile";

function App() {
  return (
    <BrowserRouter>

      <VehicleProvider>

        <Navbar />

        <Routes>

          {/* Public Pages */}

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/vehicles"
            element={<Vehicles />}
          />

          <Route
            path="/vehicles/:id"
            element={<VehicleDetails />}
          />

          <Route
            path="/sell"
            element={<SellVehicle />}
          />

          <Route
            path="/favorites"
            element={<Favorites />}
          />

          <Route
            path="/compare"
            element={<Compare />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          <Route
            path="/contact"
            element={<Contact />}
          />


          {/* Protected Account Pages */}

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
  path="/dashboard/edit-profile"
  element={
    <ProtectedRoute>
      <EditProfile />
    </ProtectedRoute>
  }
/>

          <Route
            path="/dashboard/listings"
            element={
              <ProtectedRoute>
                <MyListings />
              </ProtectedRoute>
            }
          />

          <Route
            path="/enquiries"
            element={
              <ProtectedRoute>
                <Enquiries />
              </ProtectedRoute>
            }
          />


          {/* 404 */}

          <Route
            path="*"
            element={<NotFound />}
          />

        </Routes>

        <Footer />

      </VehicleProvider>

    </BrowserRouter>
  );
}

export default App;