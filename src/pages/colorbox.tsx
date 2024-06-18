import React from "react";

const ColorBox: React.FC = () => {
  return (
    <div className="flex flex-wrap justify-center p-8">
      {/* <div className="w-1/3 p-4">
        <div className="bg-mintGreen-light p-4 rounded-lg shadow-md mb-4">
          <h2 className="text-lg font-semibold">Mint Green Light</h2>
        </div>
        <div className="bg-mintGreen p-4 rounded-lg shadow-md mb-4">
          <h2 className="text-lg font-semibold">Mint Green</h2>
        </div>
        <div className="bg-mintGreen-dark p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-white">Mint Green Dark</h2>
        </div>
      </div> */}
      <h1 className="text-font">Heading</h1>
      <div className="w-1/3 p-4">
        <div className="bg-skyBlue-light p-4 rounded-lg shadow-md mb-4">
          <h2 className="text-lg font-semibold">Sky Blue Light</h2>
        </div>
        <div className="bg-skyBlue p-4 rounded-lg shadow-md mb-4">
          <h2 className="text-lg font-semibold">Sky Blue</h2>
        </div>
        <div className="bg-skyBlue-dark p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-white">Sky Blue Dark</h2>
        </div>
      </div>
    </div>
  );
};

export default ColorBox;
