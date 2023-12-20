// IconProfile.tsx
import React, { useContext } from "react";

import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Logout from '@mui/icons-material/Logout';
import Menu from '@mui/material/Menu';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../../Components/user/Context/UserContext';

interface IconProfileProps {
    onLogout: () => void;
    isAdmin: boolean;
}

const IconProfile: React.FC<IconProfileProps> = ({ onLogout, isAdmin }) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const { user } = useContext(UserContext);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Tooltip title="Account settings">
                <IconButton
                    onClick={handleClick}
                    size="small"
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    {isAdmin ? (
                        <Avatar sx={{ width: 40, height: 40 }}>A</Avatar>
                    ) : (
                        <Avatar src={`http://localhost:8080/images/${user.image_url}`} sx={{ width: 40, height: 40 }}></Avatar>
                    )}
                </IconButton>
            </Tooltip>

            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                {isAdmin ? (
                    null
                ) : (
                    <MenuItem component={Link} to="/perfil" onClick={handleClose}>
                        <Avatar src={`http://localhost:8080/images/${user.image_url}`} sx={{ width: 40, height: 40 }} /> Profile
                    </MenuItem>
                )}
                <MenuItem onClick={onLogout}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </div >
    );
}

export default IconProfile;
