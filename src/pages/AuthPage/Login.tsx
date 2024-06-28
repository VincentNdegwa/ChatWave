/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import useCustomAxios from "../../modules/customAxios";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

type Props = {};

type CodeCountry = { code: string; country: string; flag: string };

function Login({}: Props) {
  const [countryCodes, setCountryCodes] = useState<CodeCountry[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState<CodeCountry | null>({
    code: "+254",
    country: "KE",
    flag: "https://flagcdn.com/w320/ke.png",
  });

  const [loginPhone, setLoginPhone] = useState<string>("");
  const [phoneIsValid, setPhoneIsValid] = useState<boolean>(false);
  const [loginPassword, setLoginPassword] = useState<string>("");
  const axios = useCustomAxios();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
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
      });
  }, []);

  const handleCountryClick = (country: any) => {
    setSelectedCountry(country);
    setDropdownOpen(false);
  };

  const validatePhone = () => {
    const phoneNumber: string = selectedCountry?.code + loginPhone;
    console.log(phoneNumber);
    axios
      .post("/auth/phone-number", { phone: phoneNumber })
      .then((res) => {
        if (res.data.error) {
          alert("phone number does not exist");
        } else {
          setPhoneIsValid(true);
        }
      })
      .catch((err) => alert(err));
  };

  const handleSubmit = () => {
    if (phoneIsValid) {
      const phone = selectedCountry?.code + loginPhone;
      axios
        .post("/auth/login", {
          phone_number: phone,
          password: loginPassword,
        })
        .then((res) => {
          if (res.data.error) {
            alert(res.data.error);
            return;
          }
          console.log(res.data);
          localStorage.setItem("token", res.data.accessToken);
          navigate("/");
        });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative">
        {phoneIsValid && (
          <button
            onClick={() => setPhoneIsValid(false)}
            className="absolute top-1 left-2 rounded-full bg-sky-900 hover:bg-sky-600 transition-all duration-200 p-2 text-white">
            <IoMdArrowRoundBack />
          </button>
        )}
        <img
          src="/images/Logo.jpg"
          alt="Logo"
          className="mx-auto mb-8 h-[200px] w-[200px]"
        />
        <h2 className="text-2xl font-bold mb-6 text-center text-sky-600">
          Login to ChatWave
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
                  onClick={() =>
                    setDropdownOpen(!phoneIsValid && !dropdownOpen)
                  }>
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
                  placeholder="Enter your phone number"
                  onInput={(ev) => setLoginPhone(ev.currentTarget.value)}
                  value={loginPhone}
                  disabled={phoneIsValid}
                />
              </div>
            </div>
          </div>
          {phoneIsValid && (
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
                onInput={(ev) => setLoginPassword(ev.currentTarget.value)}
                placeholder="Enter your password"
                value={loginPassword}
              />
            </div>
          )}
          <div className="flex flex-col gap-y-2 md:flex-row  md:items-center justify-between">
            {phoneIsValid && (
              <button
                onClick={() => handleSubmit()}
                className="bg-sky-900 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button">
                Sign In
              </button>
            )}
            {!phoneIsValid && (
              <button
                onClick={() => validatePhone()}
                className="bg-sky-900 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button">
                Validate Phone
              </button>
            )}

            <div className="flex justify-between md:flex-col">
              <a
                className="inline-block align-baseline font-bold text-sm text-sky-500 hover:text-sky-800"
                href="/forgot-password">
                Forgot Password?
              </a>
              <a
                className="inline-block align-baseline font-bold text-sm text-sky-900 hover:text-sky-800"
                href="/register">
                Create Account
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
