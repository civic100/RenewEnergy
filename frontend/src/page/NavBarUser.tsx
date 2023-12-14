import {Outlet} from "react-router-dom";
import AccountMenuUser from "../Components/Menu/user/AccountMenuUserComponent";

const NavBar = () => {
    return (
        <div className="menu">
            <nav>
                <AccountMenuUser/>
            </nav>
            <Outlet />
        </div>
    );
}

export default NavBar;