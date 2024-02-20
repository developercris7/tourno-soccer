import "./App.css";
import { Routes, Route } from "react-router-dom";
import Welcome from "./Components/Welcome/Welcome";
import Signup from "./Components/Signup/Signup";
import Signin from "./Components/Signin/Signin";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
// import Dashboard from './Components/Dashboard/Dashboard'
import Dashboard from "./Components/Dashboard/Dashboard";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
      </Routes>
    </div>
  );
}

export default App;
