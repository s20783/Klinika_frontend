import React from 'react'
import {Navigate, Outlet} from "react-router";
import {getCurrentUser} from "./authHelper";

function ProtectedRouter() {
    if (!getCurrentUser()) {
        return <Navigate to={{
            pathname: "/",
            state: {

            }
        }}/>;
    }

    return <Outlet/>;
}

export default ProtectedRouter;