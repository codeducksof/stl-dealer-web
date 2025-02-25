import React, { useState  } from "react";

export default function CheckKyc() {
  const [customerID, setCustomerID] = useState("");
  const [loading, setLoading] = useState(false); // สำหรับแสดงสถานะการโหลด
  const [error, setError] = useState("");
  const [responseData, setResponseData] = useState(null); // เก็บค่าที่ได้จาก API

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // เริ่มโหลด
    setError(null);
    setResponseData(null); // เคลียร์ค่าเก่าก่อนโหลดใหม่

    try {
      const response = await fetch(`https://e-kyc-uat.jventures.co.th/user/${customerID}`, {
        method: "GET",
        headers: {
          "x-api-key": "3c6bc52a253440308e250d8836ad8ffa",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
          throw new Error("ไม่สามารถดึงข้อมูลได้");
      }
      
      const data = await response.json(); // ถ้าต้องการใช้ข้อมูล API
      setResponseData(JSON.stringify(data, null, 2)); // แปลงเป็น JSON String เพื่อแสดงใน HTML
      
    } catch (error) {
      setError(error.message);
    }finally {
      setLoading(false); // หยุดโหลด
    }
  };

  return (
    <div class="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
    data-sidebar-position="fixed" data-header-position="fixed">
    <div
      class="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
      <div class="d-flex align-items-center justify-content-center w-100">
        <div class="row justify-content-center w-100">
          <div class="col-md-8 col-lg-6 col-xxl-3">
            <div class="card mb-0">
              <div class="card-body">
                <a href="/" class="text-nowrap logo-img text-center d-block py-3 w-100">
                 
                </a>
                <p class="text-center">Your Social Campaigns</p>

                {error && (
                    <div className="alert alert-danger" role="alert">
                      {error}
                    </div>
                  )}
                  
                  {loading ? (
                      <div className="text-center">Loading...</div> // แสดงข้อความโหลด
                  ) : (
                  <form onSubmit={handleSubmit}>
                    <div class="mb-3">
                      <label for="customerID" class="form-label">เลขบัตรประชาชน</label>

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
                    <button type="submit" class="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2">ตรวจสอบ</button>
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
  