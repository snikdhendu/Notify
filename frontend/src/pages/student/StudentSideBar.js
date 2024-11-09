import * as React from 'react';
import { Divider, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import AssignmentIcon from '@mui/icons-material/Assignment';


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
const StudentSideBar = () => {
    const location = useLocation();
    const isActive = (path) => {
        if (path === '/') {
            return location.pathname === '/' || location.pathname === '/Admin/dashboard'
        }
        return location.pathname.startsWith(path)
    }
    return (
        <>
            <React.Fragment>
                <ListItemButton component={Link} to="/">
                    <ListItemIcon>
                        <Home className={`mr-3 h-5 w-5 ${isActive('/') ? ' text-orange-500' : 'text-gray-500'}`} />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItemButton>
                {/* <ListItemButton component={Link} to="/Student/subjects">
                    <ListItemIcon>
                        <AssignmentIcon color={location.pathname.startsWith("/Student/subjects") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Subjects" />
                </ListItemButton>
                <ListItemButton component={Link} to="/Student/attendance">
                    <ListItemIcon>
                        <ClassOutlinedIcon color={location.pathname.startsWith("/Student/attendance") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Attendance" />
                </ListItemButton>
                <ListItemButton component={Link} to="/Student/complain">
                    <ListItemIcon>
                        <AnnouncementOutlinedIcon color={location.pathname.startsWith("/Student/complain") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Complain" />
                </ListItemButton> */}
                <ListItemButton component={Link} to="/Student/notice">
                    <ListItemIcon>
                        <Bell className={`mr-3 h-5 w-5 ${isActive('/Student/notice') ? 'text-orange-500' : 'text-gray-500'}`} />
                    </ListItemIcon>
                    <ListItemText primary="Notices" />
                </ListItemButton>
            </React.Fragment>
            <Divider sx={{ my: 1 }} />
            <React.Fragment>
                <ListSubheader component="div" inset>
                    User
                </ListSubheader>
                <ListItemButton component={Link} to="/Student/profile">
                    <ListItemIcon>
                        <UserCircle className={`mr-3 h-5 w-5 ${isActive('/Student/profile') ? 'text-orange-500' : 'text-gray-500'}`} />
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

export default StudentSideBar