/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

type Props = {};

function OTPVerification({}: Props) {
  const [otp, setOtp] = useState<string>("");

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  const handleVerifyOTP = () => {
    // Handle OTP verification logic here
    console.log("Verifying OTP:", otp);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-sky-600">
          Verify OTP
        </h2>
        <form>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="otp">
              Enter OTP
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-sky-500"
              id="otp"
              type="text"
              value={otp}
              onChange={handleOtpChange}
              placeholder="Enter your OTP"
            />
          </div>
          <div className="flex flex-col gap-y-3 justify-between">
            <button
              className="bg-sky-900 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleVerifyOTP}>
              Verify OTP
            </button>
            <div className="flex flex-col items-start mt-2">
              <span className="block text-sm text-gray-700 mb-1">
                Didn't receive OTP?
              </span>
              <button
                className="inline-block align-baseline font-bold text-sm text-sky-600 hover:text-sky-800"
                type="button">
                Resend OTP
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default OTPVerification;
