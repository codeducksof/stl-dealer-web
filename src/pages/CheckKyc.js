import React, { useState  } from "react";
import { useNavigate } from "react-router-dom"; // ใช้สำหรับ redirect

export default function CheckKyc() {


  const apiUrl = process.env.REACT_APP_KYC_API_URL;
  const apiKey = process.env.REACT_APP_KYC_API_KEY;
  
  const [customerID, setCustomerID] = useState("");
  const [loading, setLoading] = useState(false); // สำหรับแสดงสถานะการโหลด
  const [error, setError] = useState("");
  const [responseData, setResponseData] = useState(null); // เก็บค่าที่ได้จาก API
  const navigate = useNavigate(); // 👉 ใช้สำหรับ redirect

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // เริ่มโหลด
    setError(null);
    setResponseData(null); // เคลียร์ค่าเก่าก่อนโหลดใหม่

    if (!apiUrl || !apiKey) {
      setError("การตั้งค่า API ไม่ถูกต้อง");
      setLoading(false);
      return;
    }

    try {

      
      const response = await fetch(`${apiUrl}/user/${customerID}`, {
        method: "GET",
        headers: {
          "x-api-key": apiKey,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
          throw new Error("ไม่สามารถดึงข้อมูลได้");
      }
      
      const data = await response.json(); // 👉 ได้ข้อมูลจาก API

      // ✅ ถ้ามีข้อมูล ให้ redirect ไป DealerRegistration.js
      if (data.id) {
        navigate("/dealer-registration", { state: { kycData: data } });
      } else {
        setError("KYC ยังไม่ผ่านการตรวจสอบ");
      }
      
    } catch (error) {
      setError(error.message);
    }finally {
      setLoading(false); // หยุดโหลด
    }
  };

  return (
    <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
    data-sidebar-position="fixed" data-header-position="fixed">
    <div
      className="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
      <div className="d-flex align-items-center justify-content-center w-100">
        <div className="row justify-content-center w-100">
          <div className="col-md-8 col-lg-6 col-xxl-3">
            <div className="card mb-0">
              <div className="card-body">
                <a href="/" className="text-nowrap logo-img text-center d-block py-3 w-100">
                 
                </a>
                <h1><b><p className="text-center">กรอกข้อมูลลูกค้า</p></b></h1>

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
                      <label htmlFor="customerID" className="form-label">เลขบัตรประชาชน</label>

                      <input
                                  type="text"
                                  className="form-control"
                                  name="customerID"
                                  id="username"
                                  placeholder="เลขบัตรประชาชน"
                                  value={customerID}
                                  onChange={(e) => setCustomerID(e.target.value)}
                                  required
                              />

                    </div>
                    <button type="submit" className="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2">ตรวจสอบ</button>
                  </form>
                  )}

                  {/* แสดงผล Response */}
                  {loading && <p>กำลังโหลดข้อมูล...</p>}
                  {error && <p style={{ color: "red" }}>เกิดข้อผิดพลาด: {error}</p>}
                  {responseData && (
                    <pre style={{ background: "#f4f4f4", padding: "10px", borderRadius: "5px" }}>
                      {responseData}
                    </pre>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    );
  }
  