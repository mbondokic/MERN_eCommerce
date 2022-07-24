import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {routeConfig} from "./config/routeConfig";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Navigation from "./components/Navigation";

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Navigation />
          <Routes>
            <Route path={routeConfig.DASHBOARD.url} element={<Dashboard/>} />
            <Route path={routeConfig.LOGIN.url} element={<Login/>} />
            <Route path={routeConfig.REGISTER.url} element={<Register/>} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
