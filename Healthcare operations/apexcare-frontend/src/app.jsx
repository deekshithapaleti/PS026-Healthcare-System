import { useState } from "react";

import Billing from "./pages/billing";
import Appointments from "./pages/appointments";
import Sidebar from "./components/sidebar";
import Header from "./components/header";
import Patients from "./pages/patients";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";

import "./app.css";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  const [activePage, setActivePage] = useState("Dashboard");

  function handleLogin() {
    setIsLoggedIn(true);
  }

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
  }

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="application">

      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <div className="application-main">

       <Header onLogout={handleLogout} />

        <main className="application-content">

          {activePage === "Dashboard" && (
            <Dashboard />
          )}

          {activePage === "Patients" && (
            <Patients />
          )}

          {activePage === "Appointments" && (
            <Appointments />
          )}

          {activePage === "Billing" && (
            <Billing />
          )}

          {activePage !== "Dashboard" &&
           activePage !== "Patients" &&
           activePage !== "Appointments" &&
           activePage !== "Billing" && (

            <div className="coming-soon">

              <div className="coming-icon">

                {activePage === "Architecture" && "◇"}

                {activePage === "Service Health" && "●"}

              </div>

              <h2>
                {activePage}
              </h2>

              <p>
                This module is being prepared for the
                ApexCare operations platform.
              </p>

            </div>

          )}

        </main>

      </div>

    </div>
  );
}

export default App;