import "./App.css";

import { Outlet } from "react-router-dom";
import Nav from "./component/Nav";

function App() {
  return (
    <>
      <Nav></Nav>

      <Outlet></Outlet>
    </>
  );
}

export default App;
