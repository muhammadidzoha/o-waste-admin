import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import { Navigate, Route, Routes } from "react-router-dom";
import routes from "../routes/routes";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const RootLayout = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const storedData = sessionStorage.getItem("data");
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(
    sessionStorage.getItem("isLoggedIn")
  );

  const getRoutes = (routes) => {
    return routes.map((prop) => {
      if (prop.layout === "/admin") {
        if (prop.subRoutes) {
          return prop.subRoutes.map((route) => (
            <Route
              path={`/${prop.path}/${route.path}`}
              element={route.component}
              key={route.id}
            />
          ));
        } else {
          return (
            <Route
              path={`/${prop.path}`}
              element={prop.component}
              key={prop.id}
            />
          );
        }
      } else {
        return null;
      }
    });
  };

  return (
    <div className="flex">
      <div className="w-1/5">
        <Sidebar isLoggedIn={isLoggedIn} />
      </div>
      <div className="w-4/5">
        <div className="flex flex-col justify-between min-h-screen">
          <div>
            <Header username={data?.Name} />
            <div className="p-4">
              <Routes>
                {getRoutes(routes)}
                <Route
                  path="/"
                  element={<Navigate to="/admin/dashboard" replace />}
                />
              </Routes>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default RootLayout;
