import {Outlet, Link, Navigate} from "react-router-dom";

import React from "react";
import AccountMenuAdmin from "../Components/Menu/AccountMenuAdminComponent";

const NavBar = () => {
    return (
        <div className="menu">

            <nav>
                <AccountMenuAdmin/>
            </nav>
            <hr />
            <Outlet />
        </div>
    );
}

export default NavBar;