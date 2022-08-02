import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {routeConfig} from "./config/routeConfig";
import axios from "axios";

// Pages
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Navigation from "./components/Navigation";
import Auth from "./pages/Auth";
import Home from "./pages/Home";

axios.defaults.baseURL = 'http://localhost:4000';

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Navigation />
          <Routes>
            <Route index path={routeConfig.HOME.url} element={<Home />} />
            <Route path={routeConfig.AUTH.url} element={<Auth/>}>
              <Route index element={<Login />}/>
              <Route path={routeConfig.REGISTER.url} element={<Register />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
