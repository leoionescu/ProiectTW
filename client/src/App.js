import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { CreateAccount } from "./components/CreateAccount";
import { CreateProject } from "./components/CreateProject";
import { Login } from "./components/Login";
import { Home } from "./components/Home";
import { Project } from "./components/Project";
import { Professor } from "./components/Professor";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" exact element={<Login />}></Route>
          <Route path="/create-account" exact element={<CreateAccount />}></Route>
          <Route path="/home" exact element={<Home/>}></Route>
          <Route path="/professor" exact element={<Professor/>}></Route>
          <Route path="/create-project" exact element={<CreateProject />}></Route>
          <Route path="/project" exact element={<Project />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
