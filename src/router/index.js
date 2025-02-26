import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import CheckKyc from "../pages/CheckKyc";
import DealerRegistration from "../pages/DealerRegistration";
import PrivateRoute from '../utils/PrivateRoute';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="/CheckKyc" element={<PrivateRoute element={<CheckKyc />} />} />
        <Route path="/DealerRegistration" element={<PrivateRoute element={<DealerRegistration />} />} />
      </Routes>
    </BrowserRouter>
  );
}
