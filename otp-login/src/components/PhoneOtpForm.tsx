import { ChangeEvent, FormEvent, useState } from "react";
import OtpInput from "./OtpInput";

const PhoneOtpForm = () => {
  const [phoneNo, setPhoneNo] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPhoneNo(value);
  };

  const handlePhoneNoSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // phone validation
    const regex = /[^0-9]/g;

    if (phoneNo.length < 10 || regex.test(phoneNo)) {
      alert("Invalid Phone Number");
      return;
    }

    setShowOtpInput(true);
  };

  const handleOtpSubmit = (otp: number) => {
    console.log("Login Successfull", otp);
  };

  return (
    <div className="phone-otp-form">
      {showOtpInput ? (
        <div>
          <p>Enter OTP sent to {phoneNo}</p>
          <OtpInput length={6} onOtpSubmit={handleOtpSubmit} />
        </div>
      ) : (
        <form onSubmit={handlePhoneNoSubmit}>
          <input
            type="text"
            name="phone-no"
            id="phone-no"
            placeholder="Enter your phone number"
            onChange={handleChange}
          />
          <button type="submit">Login</button>
        </form>
      )}
    </div>
  );
};

export default PhoneOtpForm;
