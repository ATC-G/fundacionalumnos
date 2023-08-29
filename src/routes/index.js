import { Redirect } from "react-router-dom";
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import Carrito from "../pages/Carrito";
import Colegiatura from "../pages/Colegiatura";
import Dashboard from "../pages/Dashboard";
import DatosFiscales from "../pages/DatosFiscales";
import Pago from "../pages/Pago";
import Success from "../pages/Pago/success";

const authProtectedRoutes = [
  { path: "/logout", component: Logout },
  { path: "/dashboard", component: Dashboard },
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
];

const publicRoutes = [
  { path: "/login", component: Login },
  { path: "/ok", component: Success },
];

const adminRoutes = [
  //user
  // { path: "/user-list", exact: true, component: UserList },
  // { path: "/user-add", exact: true, component: UserAdd },
  // { path: "/user-edit/:id", exact: true, component: UserEdit },
];
const managerRoutes = [
  //satges
  { path: "/colegiatura", exact: true, component: Colegiatura },
  { path: "/carrito", exact: true, component: Carrito },
  { path: "/datos-facturacion", exact: true, component: DatosFiscales },
  { path: "/pago", exact: true, component: Pago },

  //  //satges
  //  { path: "/relationship-list", exact: true, component: RelationshipList },
  //  { path: "/relationship-add", exact: true, component: RelationshipAdd },
  //  { path: "/relationship-edit/:id", exact: true, component: RelationshipEdit },

  //  //header report
  //  { path: "/topconfiguration-list", exact: true, component: HeaderReportList },
  //  { path: "/topconfiguration-add", exact: true, component: HeaderReportAdd },
  //  { path: "/topconfiguration-edit/:id", exact: true, component: HeaderReportEdit },

  //  //header report
  //  { path: "/survey-list", exact: true, component: SurveyList },
  //  { path: "/survey-add", exact: true, component: SurveyAdd },
  //  { path: "/survey-edit/:id", exact: true, component: SurveyEdit },
];
const agentRoutes = [
  //documents
  // { path: "/case-list", exact: true, component: DocumentList },
  // { path: "/case-add", exact: true, component: DocumentAdd },
  // { path: "/case-edit/:id", exact: true, component: DocumentEdit },
];

export {
  authProtectedRoutes,
  publicRoutes,
  adminRoutes,
  managerRoutes,
  agentRoutes,
};
