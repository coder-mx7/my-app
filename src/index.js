import React from "react";
import { createRoot } from "react-dom/client"; // تم استبدال هذا الاستيراد
import Namess from "./names";

import "./index.css";
import Login from "./login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./regster";
import Home from "./home";
import Dashboard from "./dashbord";
import Users from "./users";
import Update from "./update";
const root = document.getElementById("root");
const reactRoot = createRoot(root); // تم استبدال هذا الاستخدام
reactRoot.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="users" element={<Users />} />
          <Route path="/dashboard/update/:id" element={<Update />} />
          <Route path="namess" element={<Namess />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);
