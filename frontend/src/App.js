import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {routeConfig} from "./config/routeConfig";

// Pages
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Navigation from "./components/Navigation";
import Auth from "./pages/Auth";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Navigation />
          <Routes>
            <Route path={routeConfig.HOME.url} element={<Home />} />
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
