import Dashboard from "../views/Root/Dashboard/Dashboard";
import UserManagement from "../views/Root/UserManagement/UserManagement";
import {
  CiHome,
  CiUser,
  CiTrash,
  CiAlignCenterH,
  CiUnlock,
} from "react-icons/ci";
import View from "../views/Root/WasteManagement/View";
import Transaction from "../views/Root/WasteManagement/Transaction";
import Management from "../views/Root/WasteManagement/Management";
import ContentManagement from "../views/Root/ContentManagement/ContentManagement";
import SignIn from "../views/Auth/SignIn/SignIn";

const routes = [
  {
    id: 1,
    name: "Dashboard",
    layout: "/admin",
    path: "dashboard",
    component: <Dashboard />,
    icon: <CiHome className="h-6 w-6" />,
  },
  {
    id: 2,
    name: "User Management",
    layout: "/admin",
    path: "user-management",
    component: <UserManagement />,
    icon: <CiUser className="h-6 w-6" />,
  },
  {
    id: 3,
    name: "Waste Management",
    layout: "/admin",
    path: "waste-management",
    component: "",
    icon: <CiTrash className="h-6 w-6" />,
    subRoutes: [
      {
        id: 1,
        name: "View",
        path: "view",
        component: <View />,
      },
      {
        id: 2,
        name: "Transaction",
        path: "transaction",
        component: <Transaction />,
      },
      {
        id: 3,
        name: "Management",
        path: "management",
        component: <Management />,
      },
    ],
  },
  {
    id: 4,
    name: "Content Management",
    layout: "/admin",
    path: "content-management",
    component: <ContentManagement />,
    icon: <CiAlignCenterH className="h-6 w-6" />,
  },
  {
    name: "Sign In",
    layout: "/auth",
    path: "sign-in",
    component: <SignIn />,
    icon: <CiUnlock className="h-6 w-6" />,
  },
];

export default routes;
