import React, { useState,useEffect  } from "react";
import { useLocation } from "react-router-dom";

const DealerRegistrationForm = () => {
  const location = useLocation();
  const kycData = location.state?.kycData || {}; // ดึงข้อมูลจาก state

  const titles = ["----เลือก-----", "นางสาว", "นาง", "นาย", "เด็กหญิง"]; // เพิ่มตัวเลือกเริ่มต้น

  const nameParts = kycData.name_th ? kycData.name_th.split(" ") : ["", "", ""]; 
  const defaultTitle = nameParts[0] || "";
  const defaultFirstName = nameParts[1] || "";
  const defaultLastName = nameParts.slice(2).join(" ") || "";

  const [formData, setFormData] = useState({
    dealerName: "",
    cashType: "",
    amount: "",
    referEmp: "",
    referEmpTitle: "",
    referEmpFirstName:  "",
    referEmpLastName: "",
    reqTitle: defaultTitle,
    reqFirstName: defaultFirstName,
    reqLastName: defaultLastName, // รองรับนามสกุลที่มีหลายคำ
    onBehalfOf: "",
    taxId: "",
    authorizedShareCapital: "",
    reqAddress: "",
    reqMobile: "",
    reqFax: "",
    reqEmail: "",
    reqIDLine: "",
    businessType: "",
    authoritySign: "",
    recipient: "",
    bankName: "",
    bankBranch: "",
    accountType: "",
    accountNumber: "",
    reqType: "",
    request: ""
  });

  //ถ้าเมื่อผู้ใช้กรอกข้อมูลในฟอร์มและกดส่งข้อมูลไปยังหน้าที่มี DealerRegistrationForm เมื่อกลับมาที่หน้านี้อาจจะมีการส่งข้อมูล KYC ใหม่ ดังนั้น useEffect จะช่วยให้ formData อัปเดตตามข้อมูลใหม่ที่ส่งเข้ามา
  useEffect(() => {
    setFormData({
      referEmpTitle: defaultTitle,
      referEmpFirstName: defaultFirstName,
      referEmpLastName: defaultLastName,
    });
  }, [defaultTitle, defaultFirstName, defaultLastName]);
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className="container bg-white p-4">
      <h4 className="bg-danger text-white p-2">ใบสมัครตัวแทนจำหน่าย มือถือ</h4>
      <form onSubmit={handleSubmit}>
        <div className="card border-dark mb-3">
          <div className="card-header"><b>รายละเอียดของ Dealer</b></div>
          <div className="card-body">
            <div className="row mb-3">
              <div className="col-md-4">
                <label>Dealer สาขา / จังหวัด <span className="text-danger">*</span></label>
                <select name="dealerName" className="form-control" required onChange={handleChange}>
                  <option value="">----เลือก-----</option>
                  <option value="นางสาว">นางสาว</option>
                  <option value="นาง">นาง</option>
                  <option value="นาย">นาย</option>
                </select>
              </div>
              <div className="col-md-4">
                <label>ประเภทวางเงิน <span className="text-danger">*</span></label>
                <select name="cashType" className="form-control" required onChange={handleChange}>
                  <option value="">----เลือก-----</option>
                  <option value="SRM(ไม่วางเงิน)">SRM(ไม่วางเงิน)</option>
                  <option value="SRM(วางเงิน)">SRM(วางเงิน)</option>
                  <option value="DLM(วางเงิน)">DLM(วางเงิน)</option>
                </select>
              </div>
              <div className="col-md-4">
                <label>จำนวนวางเงิน <span className="text-danger">*</span></label>
                <input type="number" name="amount" className="form-control" placeholder="จำนวนวางเงิน" required onChange={handleChange} />
              </div>
            </div>

            <div className="row mb-3">
                <div className="col-md-3">
                    <label>รหัสพนักงานผู้แนะนำ <span className="text-danger">*</span></label>
                    <input type="number" name="referEmp" className="form-control" placeholder="รหัสพนักงานผู้แนะนำ" required onChange={handleChange} />
                </div>
                <div className="col-md-3">
                    <label>คำนำหน้า <span className="text-danger">*</span></label>
                    <select name="referEmpTitle" className="form-control"  required onChange={handleChange}>
                      {titles.map((title, index) => (
                        <option key={index} value={title}>
                          {title}
                        </option>
                      ))}
                    </select>
                </div>
                <div className="col-md-3">
                    <label>ชื่อ <span className="text-danger">*</span></label>
                    <input type="text" name="referEmpFirstName" value={formData.referEmpFirstName} className="form-control" placeholder="ชื่อ" required onChange={handleChange} />
                </div>
                <div className="col-md-3">
                    <label>นามสกุล <span className="text-danger">*</span></label>
                    <input type="text" name="referEmpLastName" className="form-control" placeholder="นามสกุล" required onChange={handleChange} />
                </div>
            </div>

          </div>
        </div>

        <div className="card border-dark mb-3">
          <div className="card-header"><b>รายละเอียดผู้ร้องขอ สมัครตัวแทนจำหน่ายมือถือ</b></div>
          <div className="card-body">
            <div className="row mb-3">
              <div className="col-md-4">
                <label>คำนำหน้า <span className="text-danger">*</span></label>
                <select name="reqTitle" className="form-control" value={formData.reqTitle} required onChange={handleChange}>
                    {titles.map((title, index) => (
                        <option key={index} value={title}>
                          {title}
                        </option>
                      ))}
                </select>
              </div>
              <div className="col-md-4">
                <label>ชื่อ <span className="text-danger">*</span></label>
                <input type="text" name="reqFirstName" className="form-control" value={formData.reqFirstName} placeholder="ชื่อ" required onChange={handleChange} />
              </div>
              <div className="col-md-4">
                <label>นามสกุล <span className="text-danger">*</span></label>
                <input type="text" name="reqLastName" className="form-control" placeholder="นามสกุล" value={formData.reqLastName} onChange={handleChange} />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-4">
                <label>ในนามของ(บริษัท/หจก./ร้านค้า) <span className="text-danger">*</span></label>
                <input type="text" name="onBehalfOf" className="form-control" placeholder="ในนามของ(บริษัท/หจก./ร้านค้า)" required onChange={handleChange} />
              </div>
              <div className="col-md-4">
                <label>เลขที่ประจำตัวผู้เสียภาษี <span className="text-danger">*</span></label>
                <input type="text" name="taxId" className="form-control" placeholder="เลขที่ประจำตัวผู้เสียภาษี" required onChange={handleChange} />
              </div>
              <div className="col-md-4">
                <label>เงินทุนจดทะเบียน <span className="text-danger">*</span></label>
                <input type="text" name="authorizedShareCapital" className="form-control" placeholder="เงินทุนจดทะเบียน" required onChange={handleChange} />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-3">
                <label>ที่ตั้งร้าน <span className="text-danger">*</span></label>
                <input type="text" name="reqAddress" className="form-control" placeholder="ที่ตั้งร้าน" required onChange={handleChange} />
              </div>
              <div className="col-md-3">
                <label>เบอร์โทรศัพท์ <span className="text-danger">*</span></label>
                <input type="text" name="reqMobile" className="form-control" placeholder="เบอร์โทรศัพท์" required onChange={handleChange} />
              </div>
              <div className="col-md-3">
                <label>เบอร์โทรสาร <span className="text-danger">*</span></label>
                <input type="text" name="reqFax" className="form-control" placeholder="เบอร์โทรสาร" required onChange={handleChange} />
              </div>
              <div className="col-md-3">
                <label>E-Mail <span className="text-danger">*</span></label>
                <input type="text" name="reqEmail" className="form-control" placeholder="E-Mail" required onChange={handleChange} />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-3">
                <label>ID Line <span className="text-danger">*</span></label>
                <input type="text" name="reqIDLine" className="form-control" placeholder="ID Line" required onChange={handleChange} />
              </div>
              <div className="col-md-3">
                <label>ประเภทธุรกิจ <span className="text-danger">*</span></label>
                <input type="text" name="businessType" className="form-control" placeholder="ประเภทธุรกิจ" required onChange={handleChange} />
              </div>
              <div className="col-md-3">
                <label>ผู้มีอำนาจลงนาม <span className="text-danger">*</span></label>
                <input type="text" name="authoritySign" className="form-control" placeholder="ผู้มีอำนาจลงนาม" required onChange={handleChange} />
              </div>
              <div className="col-md-3">
                <label>ผู้รับสินค้า / ผู้รับมอบอำนาจแทน <span className="text-danger">*</span></label>
                <input type="text" name="recipient" className="form-control" placeholder="ผู้รับสินค้า / ผู้รับมอบอำนาจแทน" required onChange={handleChange} />
              </div>
            </div>

          </div>
        </div>

        <div className="card border-dark mb-3">
          <div className="card-header"><b>ธนาคารที่ทำธุรกรรม</b></div>
          <div className="card-body">
            <div className="row mb-3">
              <div className="col-md-3">
                <label>ธนาคาร <span className="text-danger">*</span></label>
                <input type="text" name="bankName" className="form-control" placeholder="ธนาคาร" required onChange={handleChange} />
              </div>
              <div className="col-md-3">
                <label>สาขา <span className="text-danger">*</span></label>
                <input type="text" name="bankBranch" className="form-control" placeholder="สาขา" required onChange={handleChange} />
              </div>
              <div className="col-md-3">
                <label>ประเภทบัญชี <span className="text-danger">*</span></label>
                <input type="text" name="accountType" className="form-control" placeholder="ประเภทบัญชี" required onChange={handleChange} />
              </div>
              <div className="col-md-3">
                <label>หมายเลขบัญชี <span className="text-danger">*</span></label>
                <input type="number" name="accountNumber" className="form-control" placeholder="หมายเลขบัญชี" required onChange={handleChange} />
              </div>
            </div>
          </div>
        </div>

        <div className="card border-dark mb-3">
            <div className="card-header"><b>ธนาคารที่ทำธุรกรรม</b></div>
            <div className="card-body">
                <div className="row mb-3">
                    <div className="form-check">
                    <input className="form-check-input" type="radio" name="productType" id="borrow" />
                    <label className="form-check-label" htmlFor="borrow">BORROW ยื่นขอประกัน/BANK GUARANTEE</label>
                    </div>
                    <div className="form-check">
                    <input className="form-check-input" type="radio" name="productType" id="cash" />
                    <label className="form-check-label" htmlFor="cash">เงินสด</label>
                    </div>
                    <div className="form-check">
                    <input className="form-check-input" type="radio" name="productType" id="credit" />
                    <label className="form-check-label" htmlFor="credit">เครดิต</label>
                    </div>
                </div>
            </div>
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary">ส่งใบสมัครตัวแทนจำหน่าย</button>
        </div>
      </form>
    </div>
  );
};

export default DealerRegistrationForm;
