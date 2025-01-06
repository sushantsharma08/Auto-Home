import "./App.css";

import Relay from "./pages/Relay";
import Navbar from "./components/Navbar";
import { Navigate, Route, Routes } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import { useEffect, useState } from "react";
// import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();
function App() {

  const [isAuthenticated, setisAuthenticated] = useState(true);

  // setInterval(() => {
  useEffect(() => {
    let loc = Boolean(localStorage.getItem("isAuthenticated"));
    setisAuthenticated(loc);
    console.log(loc);
  }, [localStorage.getItem("isAuthenticated")])



  // }, [1000]);

  console.log(isAuthenticated);

  return (
    <div className="app">
      <div className="hive-text fade-out ">
        <svg className="fade-out" style={{position:"absolute"}} id="visual" viewBox="0 0 2560 1440" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"
          //  xmlns: xlink="http://www.w3.org/1999/xlink"
          version="1.1"><g><g transform="translate(1719 208)"><path d="M0 -262.3L227.2 -131.2L227.2 131.2L0 262.3L-227.2 131.2L-227.2 -131.2Z" stroke="#164960" fill="none" stroke-width="9" className="svg-elem-1"></path></g><g transform="translate(2184 644)"><path d="M0 -172L149 -86L149 86L0 172L-149 86L-149 -86Z" stroke="#164960" fill="none" stroke-width="9" className="svg-elem-2"></path></g><g transform="translate(700 1109)"><path d="M0 -78L67.5 -39L67.5 39L0 78L-67.5 39L-67.5 -39Z" stroke="#164960" fill="none" stroke-width="9" className="svg-elem-3"></path></g><g transform="translate(585 298)"><path d="M0 -129L111.7 -64.5L111.7 64.5L0 129L-111.7 64.5L-111.7 -64.5Z" stroke="#164960" fill="none" stroke-width="9" className="svg-elem-4"></path></g><g transform="translate(1676 1039)"><path d="M0 -187L161.9 -93.5L161.9 93.5L0 187L-161.9 93.5L-161.9 -93.5Z" stroke="#164960" fill="none" stroke-width="9" className="svg-elem-5"></path></g><g transform="translate(2057 1411)"><path d="M0 -68L58.9 -34L58.9 34L0 68L-58.9 34L-58.9 -34Z" stroke="#164960" fill="none" stroke-width="9" className="svg-elem-6"></path></g><g transform="translate(2428 68)"><path d="M0 -126L109.1 -63L109.1 63L0 126L-109.1 63L-109.1 -63Z" stroke="#164960" fill="none" stroke-width="9" className="svg-elem-7"></path></g><g transform="translate(177 942)"><path d="M0 -141L122.1 -70.5L122.1 70.5L0 141L-122.1 70.5L-122.1 -70.5Z" stroke="#164960" fill="none" stroke-width="9" className="svg-elem-8"></path></g><g transform="translate(1195 1338)"><path d="M0 -246L213 -123L213 123L0 246L-213 123L-213 -123Z" stroke="#164960" fill="none" stroke-width="9" className="svg-elem-9"></path></g><g transform="translate(1157 612)"><path d="M0 -159L137.7 -79.5L137.7 79.5L0 159L-137.7 79.5L-137.7 -79.5Z" stroke="#164960" fill="none" stroke-width="9" className="svg-elem-10"></path></g><g transform="translate(85 8)"><path d="M0 -120L103.9 -60L103.9 60L0 120L-103.9 60L-103.9 -60Z" stroke="#164960" fill="none" stroke-width="9" className="svg-elem-11"></path></g><g transform="translate(1080 46)"><path d="M0 -211L182.7 -105.5L182.7 105.5L0 211L-182.7 105.5L-182.7 -105.5Z" stroke="#164960" fill="none" stroke-width="9" className="svg-elem-12"></path></g></g>
        </svg>
        <div className="dashboard-welcome-message slide-top " >
          
          Welcome to
          <span style={{ color: "#36827F", fontSize: "65px", fontFamily: "fantasy", fontWeight: "bolder" }}> H.I.V.E</span>
        </div>
      </div>
      <QueryClientProvider client={queryClient}>
        <div>
          <Navbar />
        </div>

        <section className="mainSection">
          <Routes >
            <Route path="/" element={!isAuthenticated ? <Navigate to="/Login" /> : <Dashboard />} />
            <Route path="/devices" element={!isAuthenticated ? <Navigate to="/Login" /> : <Relay />} />
            <Route path="/Login/*" element={<Login />} />
            <Route path="/Register/*" element={<Registration />} />
          </Routes>
        </section>
      </QueryClientProvider>
      <div>
        {/* <Toaster /> */}

      </div>

    </div>
  );
}

export default App;
