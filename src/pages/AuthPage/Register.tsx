/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { registrationDetails } from "./types";
import useCustomAxios from "../../modules/customAxios";
import { useNavigate } from "react-router-dom";
import { alertType } from "../../types";
import AlertNotification from "../Components/AlertNotification";

type Props = {};

type CodeCountry = {
  code: string;
  country: string;
  flag: string;
};

const Register: React.FC<Props> = () => {
  const [countryCodes, setCountryCodes] = useState<CodeCountry[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState<CodeCountry>({
    code: "+254",
    country: "KE",
    flag: "https://flagcdn.com/w320/ke.png",
  });
  const [regDetails, setRegDetails] = useState<registrationDetails>({
    phone: "",
    password: "",
    conf_password: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [alert, setAlert] = useState<alertType>({
    message: "",
    type: "info",
  });
  const [alertVisible, setAlertVisible] = useState<boolean>(false);
  const axios = useCustomAxios();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountryCodes = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        const codes = data
          .filter((country: any) => country.idd && country.idd.root)
          .map((country: any) => {
            let code = country.idd.root;
            if (country.idd.suffixes && country.idd.suffixes.length === 1) {
              code += country.idd.suffixes[0];
            }
            return {
              code,
              country: country.cca2,
              flag: country.flags.png,
            };
          });
        setCountryCodes(codes);
      } catch (error) {
        console.error("Error fetching country codes:", error);
      }
    };

    fetchCountryCodes();
  }, []);

  const handleCountryClick = (country: CodeCountry) => {
    setSelectedCountry(country);
    setDropdownOpen(false);
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!regDetails.phone.trim()) {
      newErrors.phone = "Please enter your phone number";
    }
    if (!regDetails.password.trim()) {
      newErrors.password = "Please enter your password";
    }
    if (!regDetails.conf_password.trim()) {
      newErrors.conf_password = "Please enter your confirmation password";
    }
    if (regDetails.password !== regDetails.conf_password) {
      newErrors.conf_password = "Passwords do not match";
    }
    return newErrors;
  };

  const submitForm = async () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    setErrors({});

    const data = {
      phone_number: selectedCountry.code + regDetails.phone,
      password: regDetails.password,
    };

    try {
      const res = await axios.post("/auth/register", data);
      if (res.data.error) {
        setAlertVisible(true);
        setAlert({ message: res.data.message, type: "error" });
      } else {
        const loginRes = await axios.post("/auth/login", data);
        if (loginRes.data.error) {
          setAlertVisible(true);
          setAlert({ message: loginRes.data.message, type: "error" });
        } else {
          setAlertVisible(true);
          setAlert({ message: "Logged in successfully", type: "success" });
          localStorage.setItem("token", loginRes.data.accessToken);
          localStorage.setItem("userId", loginRes.data.userId);
          localStorage.setItem("user", JSON.stringify(loginRes.data.user));
          navigate("/");
        }
      }
    } catch (error) {
      setAlertVisible(true);
      setAlert({
        message: "An error occurred during registration",
        type: "error",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      {alertVisible && alert.message.trim() && (
        <AlertNotification
          message={alert.message}
          type={alert.type}
          onClose={() => setAlertVisible(false)}
        />
      )}
      <div className="bg-white p-8 md:rounded-lg md:shadow-lg w-full max-w-md">
        <img
          src="/images/Logo.jpg"
          alt="Logo"
          className="mx-auto mb-8 h-[200px] w-[200px]"
        />
        <h2 className="text-2xl font-bold mb-6 text-center text-sky-600">
          Create Your ChatWave Account
        </h2>
        <form>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phone">
              Phone Number
            </label>
            <div className="flex relative">
              <div className="w-fit">
                <div
                  className="shadow appearance-none border rounded-l py-2 pl-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-sky-500 cursor-pointer"
                  onClick={() => setDropdownOpen(!dropdownOpen)}>
                  <div className="flex items-center gap-x-1 p-1">
                    <img
                      src={selectedCountry?.flag}
                      alt="flag"
                      className="h-5 w-5 flex-shrink-0 rounded-full"
                    />
                    <div className="text-md">{selectedCountry?.country}</div>
                  </div>
                </div>
                {dropdownOpen && (
                  <ul className="absolute z-10 mt-1 max-h-60 w-fit overflow-y-scroll scrollbar-none rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {countryCodes.map((country) => (
                      <li
                        key={country.code}
                        className="cursor-pointer select-none relative py-2 pl-1 pr-1 hover:bg-gray-100 flex"
                        onClick={() => handleCountryClick(country)}>
                        <div className="flex items-center">
                          <img
                            src={country.flag}
                            alt="flag"
                            className="h-5 w-5 flex-shrink-0 rounded-full"
                          />
                          <span className="ml-3 block">{country.country}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="shadow appearance-none border rounded-r w-full py-0 text-gray-700 flex items-center">
                <input
                  type="text"
                  id="code"
                  value={selectedCountry?.code}
                  className="w-1/6 focus:outline-none h-full outline-none bottom-0"
                  readOnly
                />
                <input
                  className={`h-full leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-gray-100 w-5/6 ${
                    errors.phone ? "border-red-500" : ""
                  }`}
                  id="phone"
                  type="tel"
                  value={regDetails.phone}
                  placeholder="712345678"
                  onChange={(e) =>
                    setRegDetails({ ...regDetails, phone: e.target.value })
                  }
                />
              </div>
            </div>
            {errors.phone && (
              <p className="text-red-500 text-xs italic">{errors.phone}</p>
            )}
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password">
              Password
            </label>
            <input
              className={`shadow appearance-none border rounded h-full w-full py-3 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-sky-500 ${
                errors.password ? "border-red-500" : ""
              }`}
              id="password"
              type="password"
              value={regDetails.password}
              placeholder="Enter your password"
              onChange={(e) =>
                setRegDetails({ ...regDetails, password: e.target.value })
              }
            />
            {errors.password && (
              <p className="text-red-500 text-xs italic">{errors.password}</p>
            )}
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              className={`shadow appearance-none border rounded h-full w-full py-3 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-sky-500 ${
                errors.conf_password ? "border-red-500" : ""
              }`}
              id="confirmPassword"
              type="password"
              value={regDetails.conf_password}
              onChange={(e) =>
                setRegDetails({ ...regDetails, conf_password: e.target.value })
              }
              placeholder="Confirm your password"
            />
            {errors.conf_password && (
              <p className="text-red-500 text-xs italic">
                {errors.conf_password}
              </p>
            )}
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-y-2 ">
            <button
              onClick={submitForm}
              className="bg-sky-900 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button">
              Register
            </button>
            <div className="flex flex-col">
              <a
                className="inline-block align-baseline font-bold text-sm text-sky-900 hover:text-sky-700"
                href="/login">
                Sign In
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
