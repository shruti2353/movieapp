import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Component/Login";
import MyMovie from "./Component/MyMovie";
import Empty from "./Component/Empty";
import CreateMovie from "./Component/CreateMovie";
import ListMovie from "./Component/ListMovie";
import EditMovie from "./Component/EditMovie";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/MyMovie" element={<MyMovie />} />
          <Route path="/empty" element={<Empty />} />
          <Route path="/listmovie" element={<ListMovie />} />
          <Route path="/CreateMovie" element={<CreateMovie />} />
          <Route path="/editmovie" element={<EditMovie />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
