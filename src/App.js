import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { CreateAccount } from "./components/CreateAccount";
import { Login } from "./components/Login";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" exact element={<Login />}></Route>
          <Route path="/create-account" element={<CreateAccount />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
