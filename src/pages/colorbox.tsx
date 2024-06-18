import React from "react";

const ColorBox: React.FC = () => {
  return (
    <div className="flex flex-wrap justify-center p-8">
      <div className="w-1/3 p-4">
        <div className="bg-primary-light p-4 rounded-lg shadow-md mb-4">
          <h2 className="text-lg font-semibold">Primary Light</h2>
          <p className="text-primary-dark">#a7f3d0</p>
        </div>
        <div className="bg-primary p-4 rounded-lg shadow-md mb-4">
          <h2 className="text-lg font-semibold">Primary</h2>
          <p className="text-primary-dark">#34d399</p>
        </div>
        <div className="bg-primary-dark p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-white">Primary Dark</h2>
          <p className="text-white">#065f46</p>
        </div>
      </div>
      <div className="w-1/3 p-4">
        <div className="bg-secondary-light p-4 rounded-lg shadow-md mb-4">
          <h2 className="text-lg font-semibold">Secondary Light</h2>
          <p className="text-secondary-dark">#ffedd5</p>
        </div>
        <div className="bg-secondary p-4 rounded-lg shadow-md mb-4">
          <h2 className="text-lg font-semibold">Secondary</h2>
          <p className="text-secondary-dark">#fb923c</p>
        </div>
        <div className="bg-secondary-dark p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-white">Secondary Dark</h2>
          <p className="text-white">#c2410c</p>
        </div>
      </div>
      <div className="w-1/3 p-4">
        <div className="bg-accent-light p-4 rounded-lg shadow-md mb-4">
          <h2 className="text-lg font-semibold">Accent Light</h2>
          <p className="text-accent-dark">#dbeafe</p>
        </div>
        <div className="bg-accent p-4 rounded-lg shadow-md mb-4">
          <h2 className="text-lg font-semibold">Accent</h2>
          <p className="text-accent-dark">#3b82f6</p>
        </div>
        <div className="bg-accent-dark p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-white">Accent Dark</h2>
          <p className="text-white">#1e3a8a</p>
        </div>
      </div>
    </div>
  );
};

export default ColorBox;
