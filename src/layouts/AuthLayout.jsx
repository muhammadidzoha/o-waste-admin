import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import routes from "../routes/routes";

const AuthLayout = () => {
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/auth") {
        return (
          <Route path={`/${prop.path}`} element={prop.component} key={key} />
        );
      } else {
        return null;
      }
    });
  };

  return (
    <div>
      <Routes>
        {getRoutes(routes)}
        <Route path="/" element={<Navigate to="/auth/masuk" replace />} />
      </Routes>
    </div>
  );
};

export default AuthLayout;
