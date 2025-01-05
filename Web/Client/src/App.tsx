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
      <QueryClientProvider client={queryClient}>
        <div>
          <Navbar />
        </div>
        <section className="mainSection">
          <Routes>
            <Route path="/" element={!isAuthenticated ? <Navigate to="/Login" /> : <Dashboard />} />
            <Route path="/devices" element={!isAuthenticated ? <Navigate to="/Login" /> :<Relay />} />
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
