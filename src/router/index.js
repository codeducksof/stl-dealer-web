import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import CheckKyc from "../pages/CheckKyc";
import DealerRegistration from "../pages/DealerRegistration";
import NotFound from '../pages/NotFound'; // นำเข้า component หน้า 404
import PrivateRoute from '../utils/PrivateRoute';


export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="/check-kyc" element={<PrivateRoute element={<CheckKyc />} />} />
        <Route path="/dealer-registration" element={<PrivateRoute element={<DealerRegistration />} />} />

        {/* Route สำหรับหน้า 404 */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}
