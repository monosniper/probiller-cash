import React, {useContext, useEffect} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {guestRoutes, privateRoutes, publicRoutes} from "../routes";
import {HOME_ROUTE, LOGIN_ROUTE} from "../utils/routes";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import Loading from "./Loading";

const AppRouter = () => {

    const {store} = useContext(Context);

    const iterateRoutes = (routes) => {
        return routes.map(({path, element, children}) =>
            <Route key={path} path={path} element={element} exact={true}>
                {children ? iterateRoutes(children) : undefined}
            </Route>
        )
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth();
        } else {
            store.setAuth(false);
        }
    }, []);

    if(store.isLoading) return <Loading />

    return store.isAuth ?
        (
            <Routes>
                {iterateRoutes(privateRoutes)}
                <Route path="*" element={<Navigate replace to={HOME_ROUTE}/>}/>
            </Routes>
        )
        :
        (
            <Routes>
                {iterateRoutes([...publicRoutes, ...guestRoutes])}
                <Route path="*" element={<Navigate replace to={LOGIN_ROUTE}/>}/>
            </Routes>
        );
};

export default observer(AppRouter);