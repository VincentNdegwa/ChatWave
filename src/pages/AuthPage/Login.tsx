/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

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

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
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
                  className="w-1/6 focus:outline-non h-full outline-none bottom-0"
                  readOnly
                />
                <input
                  className=" h-full leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-gray-100 w-5/6"
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
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
              placeholder="Enter your password"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button">
              Sign In
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-sky-500 hover:text-sky-800"
              href="#">
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
