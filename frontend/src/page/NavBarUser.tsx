import {Outlet} from "react-router-dom";
import React from "react";
import AccountMenuUser from "../Components/Menu/AccountMenuUserComponent";

const NavBar = () => {
    return (
        <div className="menu">
            <nav>
                <AccountMenuUser/>
            </nav>
            <hr />
            <Outlet />
        </div>
    );
}

export default NavBar;