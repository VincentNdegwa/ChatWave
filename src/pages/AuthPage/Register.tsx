/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { registrationDetails } from "./types";
import useCustomAxios from "../../modules/customAxios";
import { useNavigate } from "react-router-dom";

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

  const submitForm = () => {
    let data: { phone_number: string; password: string };
    if (!regDetails.phone.trim()) {
      alert("Please enter your phone number");
      return;
    }
    if (!regDetails.password.trim()) {
      alert("Please enter your password");
      return;
    }
    if (!regDetails.conf_password.trim()) {
      alert("Please enter your confirmation password");
      return;
    }

    if (regDetails.password !== regDetails.conf_password) {
      alert("Passwords do not match");
      return;
    }
    // eslint-disable-next-line prefer-const
    data = {
      phone_number: selectedCountry.code + regDetails.phone,
      password: regDetails.password,
    };
    axios.post("/auth/register", data).then((res) => {
      if (res.data.error) {
        alert(res.data.message);
      } else {
        console.log(res.data.message);
        axios.post("/auth/login", data).then((res) => {
          if (res.data.error) {
            alert("failed to login, please login manualy");
          } else {
            localStorage.setItem("token", res.data.accessToken);
            localStorage.setItem("userId", res.data.userId);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            navigate("/");
          }
        });
      }
    });
    console.log(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
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
                  className="h-full leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-gray-100 w-5/6"
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
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded h-full w-full py-3 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-sky-500"
              id="password"
              type="password"
              value={regDetails.password}
              placeholder="Enter your password"
              onChange={(e) =>
                setRegDetails({ ...regDetails, password: e.target.value })
              }
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              className="shadow appearance-none border rounded h-full w-full py-3 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-sky-500"
              id="confirmPassword"
              type="password"
              value={regDetails.conf_password}
              onChange={(e) =>
                setRegDetails({ ...regDetails, conf_password: e.target.value })
              }
              placeholder="Confirm your password"
            />
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-y-2 ">
            <button
              onClick={() => submitForm()}
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
