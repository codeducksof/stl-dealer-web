// src/pages/Login.js
import React, { useState,useContext  } from "react";
import { useNavigate } from "react-router-dom"; // ✅ เพิ่ม useNavigate
import { AuthContext } from '../context/AuthContext'; // นำเข้า AuthContext



const Login = () => {
    const navigate = useNavigate(); // ✅ กำหนด navigate
    const {login} = useContext(AuthContext); // ใช้ context สำหรับจัดการล็อกอิน
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false); // สำหรับแสดงสถานะการโหลด
    const [rememberMe, setRememberMe] = useState(false); // สถานะสำหรับ checkbox
    const handleSubmit = async (e) => {
    

    e.preventDefault();
    setLoading(true); // เริ่มโหลด
    try {
      const response = await fetch("https://api.singerthai.xyz/sgauthorize/auth", {
          method: "POST",
          headers: {
          "apikey": "SuQwKqPPCTE",
          "Content-Type": "application/json",
          },
          body: JSON.stringify({
          userName: username,
          password: password,
          applicationId: "75",
          }),
      });

      if (!response.ok) {
          throw new Error("Login failed");
      }

      // Redirect to Dashboard
      const data = await response.json();
      login(data.token); // เก็บ token ใน context
      
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    }finally {
      setLoading(false); // หยุดโหลด
    }
  };

  return (
    <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
      data-sidebar-position="fixed" data-header-position="fixed">
      <div className="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
        <div className="d-flex align-items-center justify-content-center w-100">
          <div className="row justify-content-center w-100">
            <div className="col-md-8 col-lg-6 col-xxl-3">
              <div className="card mb-0">
                <div className="card-body">
                  <a href="./index.html" className="text-nowrap logo-img text-center d-block py-3 w-100">
                    <img src="/static/images/logos/dark-logo.svg" width="180" alt="" />
                  </a>

                  <p className="text-center">Your Social Campaigns</p>

                  {error && (
                    <div className="alert alert-danger" role="alert">
                      {error}
                    </div>
                  )}
                  
                  {loading ? (
                      <div className="text-center">Loading...</div> // แสดงข้อความโหลด
                  ) : (
                      <form onSubmit={handleSubmit}>
                          <div className="mb-3">
                              <label htmlFor="username" className="form-label">Username</label>
                              <input
                                  type="text"
                                  className="form-control"
                                  name="username"
                                  id="username"
                                  value={username}
                                  onChange={(e) => setUsername(e.target.value)}
                                  required
                              />
                          </div>
                          <div className="mb-4">
                              <label htmlFor="password" className="form-label">Password</label>
                              <input
                                  type="password"
                                  name="password"
                                  className="form-control"
                                  id="password"
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                                  required
                              />
                          </div>
                          <div className="d-flex align-items-center justify-content-between mb-4">
                              <div className="form-check">
                                  <input 
                                       className="form-check-input primary" 
                                       type="checkbox" 
                                       id="flexCheckChecked" 
                                       checked={rememberMe}
                                       onChange={(e) => {
                                        setRememberMe(e.target.checked);
                                        if (e.target.checked) {
                                          alert("Checkbox Checked!");
                                        }
                                       }} // อัปเดตสถานะของ checkbox
                                   />
                                  <label className="form-check-label text-dark" htmlFor="flexCheckChecked">
                                      Remember this Device
                                  </label>
                              </div>
                              <a className="text-primary fw-bold" href="./index.html">Forgot Password?</a>
                          </div>
                          <button type="submit" className="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2">Log In</button>
                      </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
