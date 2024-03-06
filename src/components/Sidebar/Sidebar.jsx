import {
  Card,
  CardBody,
  Collapse,
  List,
  ListItem,
  ListItemPrefix,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import React, { useState } from "react";
import routes from "../../routes/routes";
import { Link, useLocation } from "react-router-dom";
import { IoMdArrowDropdown } from "react-icons/io";
import PropTypes from "prop-types";

const Sidebar = ({ isLoggedIn }) => {
  const location = useLocation();

  const activeRoute = (routeName) => {
    return location.pathname.includes(routeName);
  };

  const [open, setOpen] = useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const handleMobileSubMenuClick = () => {
    setOpen(0);
    handleCloseCollapse();
  };

  const handleCloseCollapse = () => {
    setOpen(false);
  };

  return (
    <div>
      <Card
        className="fixed w-1/5 min-h-screen rounded-none border-r border-gray-200"
        shadow={false}
      >
        <CardBody>
          <div className="flex flex-col items-center space-y-10">
            <div>
              <img
                src="/logo.png"
                alt="logo"
                className="w-[100px] rounded-full"
              />
            </div>
            <div>
              {routes.map((route) => {
                if (isLoggedIn && route.name === "Sign In") {
                  return null;
                }

                if (route.layout === "/admin" || route.layout === "/auth") {
                  return (
                    <List key={route.name} className="3xl:w-[350px]">
                      {route.subRoutes ? (
                        <>
                          <Menu open={open === route.id}>
                            <MenuHandler>
                              <Typography
                                as="div"
                                variant="small"
                                color="gray"
                                className="font-medium"
                              >
                                <ListItem
                                  selected={open === route.id}
                                  onClick={() => handleOpen(route.id)}
                                  className={`${
                                    activeRoute(route.path) === true
                                      ? "bg-[#004D3D] text-white hover:!bg-[#004D3D] hover:!text-white"
                                      : "bg-transparent"
                                  }`}
                                >
                                  <ListItemPrefix
                                    className={`${
                                      activeRoute(route.path) === true
                                        ? "text-white "
                                        : "text-gray-600"
                                    }`}
                                  >
                                    {route.icon}
                                  </ListItemPrefix>
                                  {route.name}
                                  <IoMdArrowDropdown
                                    className={`block h-4 w-4 transition-transform 3xl:ml-[105px] ${
                                      open === route.id ? "rotate-180" : ""
                                    }`}
                                  />
                                </ListItem>
                              </Typography>
                            </MenuHandler>
                            <MenuList className="hidden">
                              {route.subRoutes.map((subRoute) => (
                                <Typography
                                  as="div"
                                  key={subRoute.id}
                                  variant="small"
                                  color="gray"
                                >
                                  <MenuItem>{subRoute.name}</MenuItem>
                                </Typography>
                              ))}
                            </MenuList>
                          </Menu>
                          <div>
                            <Collapse
                              open={open === route.id}
                              className="flex flex-col"
                            >
                              {route.subRoutes.map((subRoute) => (
                                <Link
                                  key={subRoute.id}
                                  to={`${route.layout}/${route.path}/${subRoute.path}`}
                                  onClick={handleMobileSubMenuClick}
                                >
                                  <Typography
                                    key={subRoute.id}
                                    as="div"
                                    variant="small"
                                    className="font-medium mt-3"
                                    color="gray"
                                  >
                                    <MenuItem>{subRoute.name}</MenuItem>
                                  </Typography>
                                </Link>
                              ))}
                            </Collapse>
                          </div>
                        </>
                      ) : (
                        <Link to={`${route.layout}/${route.path}`}>
                          <Typography
                            as="div"
                            variant="small"
                            className="font-medium"
                          >
                            <ListItem
                              className={`${
                                activeRoute(route.path) === true
                                  ? "bg-[#004D3D] text-white hover:!bg-[#004D3D] hover:!text-white"
                                  : "bg-transparent"
                              }`}
                            >
                              <ListItemPrefix
                                className={`${
                                  activeRoute(route.path) === true
                                    ? "text-white"
                                    : "text-gray-600"
                                }`}
                              >
                                {route.icon}
                              </ListItemPrefix>
                              {route.name}
                            </ListItem>
                          </Typography>
                        </Link>
                      )}
                    </List>
                  );
                }
              })}
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

Sidebar.propTypes = {
  isLoggedIn: PropTypes.string,
};

export default Sidebar;
