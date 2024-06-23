import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'


// const toggleMode = () => {
//   document.body.classList.add("dark-mode");
// };
// toggleMode();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div className="main-content-holder shadow-md py-2">
      <App />
    </div>
  </React.StrictMode>
);
