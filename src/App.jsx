import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Explore from "./pages/Explore";
import District from "./pages/District";
import MandiDetails from "./pages/MandiDetails";
import AddMandi from "./pages/AddMandi";
import About from "./pages/About";
import Admin from "./pages/Admin";
import AdminDashboard from "./pages/AdminDashboard";
import EditMandi from "./pages/EditMandi";

function App() {
  return (
    <Routes>

      <Route path="/" element={<Home />} />

      <Route
        path="/explore"
        element={<Explore />}
      />

      <Route
        path="/district/:districtName"
        element={<District />}
      />

      <Route
        path="/mandi/:id"
        element={<MandiDetails />}
      />

      <Route
        path="/add-mandi"
        element={<AddMandi />}
      />

      <Route
        path="/about"
        element={<About />}
      />

      <Route
        path="/admin"
        element={<Admin />}
      />

      <Route
        path="/admin/dashboard"
        element={<AdminDashboard />}
      />

      <Route
        path="/admin/mandis/:id/edit"
        element={<EditMandi />}
      />

    </Routes>
  );
}

export default App;