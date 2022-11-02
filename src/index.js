import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import User from "./pages/User";

disableReactDevTools();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route index element={<App />} />
      <Route path="/user" element={<User />} />
    </Routes>
  </BrowserRouter>
);
