import React from "react";
import LoginView from "../ui/views/Auth/LoginView";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RoutesEnum } from "../ui/constants/RoutesEnum";
import RegisterView from "../ui/views/Auth/RegisterView";
import DashboardView from "../ui/views/DashboardView";
import CategoriesView from "../ui/views/Category/CategoriesView";
import CampaignsView from "../ui/views/Campaign/CampaignsView";
import SubscribersView from "../ui/views/Subscriber/SubscribersView";
import { CampaignVerification } from "../ui/Verification/CampaignVerification";
import { NotFoundView } from "../ui/views/Util/NotFoundView";
import { UnsubscribeVerification } from "../ui/Verification/UnsubscribeVerification";
import { UnsubscribeSuccessView } from "../ui/views/Util/UnsubscribeSuccessView";

export const RenderRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path={RoutesEnum.LOGIN} element={<LoginView />}></Route>
      <Route path={RoutesEnum.REGISTER} element={<RegisterView />}></Route>

      <Route
        path={RoutesEnum.UNSUBSCRIBED_SUCCESS + "/:hash"}
        Component={UnsubscribeSuccessView}
      ></Route>

      <Route
        path={RoutesEnum.UNSUBSCRIBE + "/:hash"}
        Component={UnsubscribeVerification}
      ></Route>
      <Route
        path={RoutesEnum.VERIFY + "/:hash"}
        Component={CampaignVerification}
      ></Route>
      <Route
        path={RoutesEnum.DASHBOARD}
        element={<DashboardView title={"Dashboard"} />}
      ></Route>
      <Route
        path={RoutesEnum.CATEGORY}
        element={<CategoriesView title={"Category"} />}
      ></Route>
      <Route
        path={RoutesEnum.CAMPAIGN}
        element={<CampaignsView title={"Campaign"} />}
      ></Route>
      <Route
        path={RoutesEnum.SUBSCRIBERS}
        element={<SubscribersView title={"Subscribers"} />}
      ></Route>

      <Route path={RoutesEnum.NOTFOUND} element={<NotFoundView />}></Route>
    </Routes>
  </BrowserRouter>
);
