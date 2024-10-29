import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";

interface IOtpInputProps {
  length: number;
  onOtpSubmit: (otp: string) => void;
}

const OtpInput = ({ length = 4, onOtpSubmit }: IOtpInputProps) => {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));

  const optInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    optInputRefs.current[0]?.focus();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    if (!value && isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1).trim();
    setOtp(newOtp);

    const combinedOtp = newOtp.join("");
    if (combinedOtp.length === length) onOtpSubmit(combinedOtp);

    if (newOtp[index] && index < length - 1) {
      optInputRefs.current[index + 1]?.focus();

      // move to first empty cell or above
      // const i = otp.indexOf("");
      // optInputRefs.current[i]?.focus();
    }
  };

  const handleClick = (index: number) => {
    optInputRefs.current[index]?.setSelectionRange(1, 1);

    // move to first empty cell
    // const i = otp.indexOf("");
    // optInputRefs.current[i]?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && index > 0 && !otp[index]) {
      optInputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="otp-input-container">
      {otp.map((value, index) => (
        <input
          key={index}
          type="text"
          value={value}
          ref={(input) => (optInputRefs.current[index] = input)}
          onChange={(e) => handleChange(e, index)}
          onClick={() => handleClick(index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
        />
      ))}
    </div>
  );
};

export default OtpInput;
