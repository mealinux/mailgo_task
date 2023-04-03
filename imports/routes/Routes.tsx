import React from "react";
import LoginView from "../ui/views/Auth/LoginView";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RoutesEnum } from "../ui/constants/RoutesEnum";
import RegisterView from "../ui/views/Auth/RegisterView";
import DashboardView from "../ui/views/DashboardView";

export const RenderRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path={RoutesEnum.LOGIN} element={<LoginView />}></Route>
      <Route path={RoutesEnum.REGISTER} element={<RegisterView />}></Route>
      <Route path={RoutesEnum.DASHBOARD} element={<DashboardView />}></Route>
    </Routes>
  </BrowserRouter>
);
