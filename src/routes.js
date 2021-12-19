import {
    ADMIN_ROUTE,
    HOME_ROUTE,
    LOGIN_ROUTE,
    CABINET_ROUTE,
    PROFILE_ROUTE,
    MERCHANTS_ROUTE,
    HISTORY_ROUTE,
} from "./utils/routes";
import Home from "./components/pages/Home";
import Admin from "./components/pages/Admin";
import Login from "./components/pages/Login";
import Cabinet from "./components/pages/Cabinet";
import Profile from "./components/pages/Profile";
import Merchants from "./components/pages/Merchants";
import History from "./components/pages/History";

export const guestRoutes = [
    {
        path: LOGIN_ROUTE,
        element: <Login/>,
    },
]

export const publicRoutes = [
    {
        path: HOME_ROUTE,
        element: <Home/>,
    },
];

export const privateRoutes = [
    ...publicRoutes,

    {
        path: ADMIN_ROUTE,
        element: <Admin/>,
    },
    {
        path: CABINET_ROUTE,
        element: <Cabinet/>,
        children: [
            {
                path: PROFILE_ROUTE,
                element: <Profile/>,
            },
            {
                path: MERCHANTS_ROUTE,
                element: <Merchants/>,
            },
            {
                path: HISTORY_ROUTE,
                element: <History/>,
            },

        ]
    },
];