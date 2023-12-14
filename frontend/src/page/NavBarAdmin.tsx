import {Outlet, Link, Navigate} from "react-router-dom";
import AccountMenuAdmin from "../Components/Menu/admin/AccountMenuAdminComponent";

const NavBar = () => {
    return (
        <div className="menu">

            <nav>
                <AccountMenuAdmin/>
            </nav>
            <Outlet />
        </div>
    );
}

export default NavBar;