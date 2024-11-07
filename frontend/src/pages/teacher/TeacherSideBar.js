import * as React from 'react';
import { Divider, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import { useSelector } from 'react-redux';
import {
    Home,
    GraduationCap,
    BookOpen,
    Users,
    User,
    Bell,
    AlertTriangle,
    UserCircle,
    LogOut
} from 'lucide-react'

const TeacherSideBar = () => {
    const { currentUser } = useSelector((state) => state.user);
    const sclassName = currentUser.teachSclass
    const isActive = (path) => {
        if (path === '/') {
            return location.pathname === '/' || location.pathname === '/Admin/dashboard'
        }
        return location.pathname.startsWith(path)
    }

    const location = useLocation();
    return (
        <>
            <React.Fragment>
                <ListItemButton component={Link} to="/">
                    <ListItemIcon>
                        <Home className={`mr-3 h-5 w-5 ${isActive('/') ? ' text-orange-500' : 'text-gray-500'}`} />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItemButton>
                <ListItemButton component={Link} to="/Teacher/class">
                    <ListItemIcon>
                        <GraduationCap className={`mr-3 h-5 w-5 ${isActive('/Teacher/class') ? 'text-orange-500' : 'text-gray-500'}`} />
                    </ListItemIcon>
                    <ListItemText primary={`Class ${sclassName.sclassName}`} />
                </ListItemButton>
                {/* <ListItemButton component={Link} to="/Teacher/complain">
                    <ListItemIcon>
                        <AnnouncementOutlinedIcon color={location.pathname.startsWith("/Teacher/complain") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Complain" />
                </ListItemButton> */}
                <ListItemButton component={Link} to="/Teacher/addnotice">
                    <ListItemIcon>
                        <Bell className={`mr-3 h-5 w-5 ${isActive('/Teacher/addnotice') ? 'text-orange-500' : 'text-gray-500'}`} />
                    </ListItemIcon>
                    <ListItemText primary="Notices" />
                </ListItemButton>
            </React.Fragment>
            <Divider sx={{ my: 1 }} />
            <React.Fragment>
                <ListSubheader component="div" inset>
                    User
                </ListSubheader>
                <ListItemButton component={Link} to="/Teacher/profile">
                    <ListItemIcon>
                        <UserCircle className={`mr-3 h-5 w-5 ${isActive('/Teacher/profile') ? 'text-orange-500' : 'text-gray-500'}`} />
                    </ListItemIcon>
                    <ListItemText primary="Profile" />
                </ListItemButton>
                <ListItemButton component={Link} to="/logout">
                    <ListItemIcon>
                        <LogOut className={`mr-3 h-5 w-5 ${isActive('/logout') ? 'text-orange-500' : 'text-gray-500'}`} />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItemButton>
            </React.Fragment>
        </>
    )
}

export default TeacherSideBar