import {
  Avatar,
  Breadcrumbs,
  Card,
  CardBody,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Navbar,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import PropTypes from "prop-types";

const Header = ({ currentRoute, username }) => {
  const logout = () => {
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("data");
    window.location.reload();
  };

  const getPathnames = () => {
    const pathnames = location.pathname
      .split("/")
      .filter((pathname) => pathname !== "");
    const filteredPathnames = pathnames
      .filter((pathname) => pathname.toLowerCase() !== "admin")
      .map((pathname) => pathname.replace(/-/g, " "));
    return filteredPathnames;
  };

  return (
    <Navbar
      shadow={false}
      fullWidth
      className="sticky top-0 z-[900] flex items-center justify-between bg-white/10"
    >
      <div>
        <Breadcrumbs className="bg-transparent p-0">
          <Typography variant="small" color="gray">
            Pages
          </Typography>
          {getPathnames().map((pathname, index) => (
            <Typography
              key={index}
              variant="small"
              color="gray"
              className="capitalize"
            >
              {pathname}
            </Typography>
          ))}
        </Breadcrumbs>
        <Typography variant="h4" color="gray" className="capitalize">
          {getPathnames().length > 0
            ? getPathnames()[getPathnames().length - 1]
            : currentRoute}
        </Typography>
      </div>
      <div>
        <div className="w-96">
          <Card shadow={false} className="rounded-full">
            <CardBody className="flex items-center justify-between !p-2">
              <input
                type="text"
                className="bg-[#F4F7FE] text-sm focus:outline-none w-72 px-4 py-2.5 rounded-full"
                placeholder="Cari.."
              />
              <Menu placement="bottom-end">
                <MenuHandler>
                  <Avatar
                    size="sm"
                    src="https://docs.material-tailwind.com/img/face-2.jpg"
                    alt="avatar"
                    className="cursor-pointer"
                  />
                </MenuHandler>
                <MenuList className="flex flex-col space-y-2">
                  <MenuItem className="cursor-text">
                    <Typography
                      variant="small"
                      color="gray"
                      className="lowercase"
                    >
                      Hai, {username}
                    </Typography>
                  </MenuItem>
                  <MenuItem className="bg-red-100 hover:!bg-red-100">
                    <Typography
                      variant="small"
                      className="text-red-500"
                      onClick={logout}
                    >
                      Logout
                    </Typography>
                  </MenuItem>
                </MenuList>
              </Menu>
            </CardBody>
          </Card>
        </div>
      </div>
    </Navbar>
  );
};

Header.propTypes = {
  currentRoute: PropTypes.string,
  username: PropTypes.string,
};

export default Header;
