import {Outlet} from "react-router-dom";
import AccountMenuUser from "../Components/Menu/user/AccountMenuUserComponent";

interface NavBarProps {
    isAuthenticated: boolean;
    onLogout: () => void;
  }

const NavBar : React.FC<NavBarProps> = ({ isAuthenticated, onLogout}) => {
    return (
        <div className="menu">
            <nav>
                <AccountMenuUser isAuthenticated={isAuthenticated} onLogout={onLogout} />
            </nav>
            <Outlet />
        </div>
    );
}

export default NavBar;