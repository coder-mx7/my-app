import React from "react";
import { createRoot } from "react-dom/client";
import Namess from "./names";

import "./index.css";
import Login from "./pages/auth/login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/auth/regster";
import Home from "./pages/home";
import Dashboard from "./pages/dashbored/dashbord";
import Users from "./users";
import Update from "./pages/auth/update";
import UserProvider from "./Context/contex";
import RequriedAuth from "./requredAuth";
import Rest from "./pages/auth/rest";
const root = document.getElementById("root");
const reactRoot = createRoot(root); // تم استبدال هذا الاستخدام
reactRoot.render(
  <React.StrictMode>
    <Router>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="Register" element={<Register />} />
          <Route path="login" element={<Login />} />

          <Route element={<Rest />}>
            <Route element={<RequriedAuth />}>
              <Route path="/dashboard" element={<Dashboard />}>
                <Route path="users" element={<Users />} />
                <Route path="/dashboard/update/:id" element={<Update />} />
                <Route path="users/create" element={<Namess />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </UserProvider>
    </Router>
  </React.StrictMode>
);
