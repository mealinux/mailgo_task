import React from "react";
import LoginView from "../ui/views/Auth/LoginView";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RoutesEnum } from "../ui/constants/RoutesEnum";
import RegisterView from "../ui/views/Auth/RegisterView";
import DashboardView from "../ui/views/DashboardView";
import CategoriesView from "../ui/views/Category/CategoriesView";
import CampaignsView from "../ui/views/Campaign/CampaignsView";
import SubscribersView from "../ui/views/Subscriber/SubscribersView";

export const RenderRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path={RoutesEnum.LOGIN} element={<LoginView />}></Route>
      <Route path={RoutesEnum.REGISTER} element={<RegisterView />}></Route>
      <Route path={RoutesEnum.DASHBOARD} element={<DashboardView />}></Route>
      <Route path={RoutesEnum.CATEGORY} element={<CategoriesView />}></Route>
      <Route path={RoutesEnum.CAMPAIGN} element={<CampaignsView />}></Route>
      <Route
        path={RoutesEnum.SUBSCRIBERS}
        element={<SubscribersView />}
      ></Route>
    </Routes>
  </BrowserRouter>
);
