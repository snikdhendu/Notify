import * as React from 'react';
import { Divider, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

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

const SideBar = () => {
    const location = useLocation();
    const isActive = (path) => {
        if (path === '/') {
            return location.pathname === '/' || location.pathname === '/Admin/dashboard'
        }
        return location.pathname.startsWith(path)
    }
    return (
        <>
            <React.Fragment >
                <ListItemButton component={Link} to="/">
                    <ListItemIcon>
                        <Home className={`mr-3 h-5 w-5 ${isActive('/') ? ' text-orange-500' : 'text-gray-500'}`} />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItemButton>
                <ListItemButton component={Link} to="/Admin/classes">
                    <ListItemIcon>
                        <GraduationCap className={`mr-3 h-5 w-5 ${isActive('/Admin/classes') ? 'text-orange-500' : 'text-gray-500'}`} />
                    </ListItemIcon>
                    <ListItemText primary="Classes" />
                </ListItemButton>
                {/* <ListItemButton component={Link} to="/Admin/subjects">
                    <ListItemIcon>
                        <AssignmentIcon color={location.pathname.startsWith("/Admin/subjects") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Subjects" />
                </ListItemButton> */}
                <ListItemButton component={Link} to="/Admin/teachers">
                    <ListItemIcon>
                        <Users className={`mr-3 h-5 w-5 ${isActive('/Admin/teachers') ? 'text-orange-500' : 'text-gray-500'}`} />
                    </ListItemIcon>
                    <ListItemText primary="Teachers" />
                </ListItemButton>
                <ListItemButton component={Link} to="/Admin/students">
                    <ListItemIcon>
                        <User className={`mr-3 h-5 w-5 ${isActive('/Admin/students') ? 'text-orange-500' : 'text-gray-500'}`} />
                    </ListItemIcon>
                    <ListItemText primary="Students" />
                </ListItemButton>
                <ListItemButton component={Link} to="/Admin/addnotice">
                    <ListItemIcon>
                        <Bell className={`mr-3 h-5 w-5 ${isActive('/Admin/addnotice') ? 'text-orange-500' : 'text-gray-500'}`} />
                    </ListItemIcon>
                    <ListItemText primary="Notices" />
                </ListItemButton>
                {/* <ListItemButton component={Link} to="/Admin/complains">
                    <ListItemIcon>
                        <ReportIcon color={location.pathname.startsWith("/Admin/complains") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Complains" />
                </ListItemButton> */}
            </React.Fragment>
            <Divider sx={{ my: 1 }} />
            <React.Fragment>
                <ListSubheader component="div" inset>
                    User
                </ListSubheader>
                <ListItemButton component={Link} to="/Admin/profile">
                    <ListItemIcon>
                        <UserCircle className={`mr-3 h-5 w-5 ${isActive('/Admin/profile') ? 'text-orange-500' : 'text-gray-500'}`} />
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

export default SideBar

// import React from 'react'
// import { Link, useLocation } from 'react-router-dom'
// import {
//     Home,
//     GraduationCap,
//     BookOpen,
//     Users,
//     User,
//     Bell,
//     AlertTriangle,
//     UserCircle,
//     LogOut
// } from 'lucide-react'

// export default function Sidebar() {
//     const location = useLocation()

//     const isActive = (path) => {
//         if (path === '/') {
//             return location.pathname === '/' || location.pathname === '/Admin/dashboard'
//         }
//         return location.pathname.startsWith(path)
//     }

//     return (
//         <div className="flex h-full w-64 flex-col bg-white">
//             <nav className="flex-1 space-y-1 px-3 py-4">
//                 <Link
//                     to="/"
//                     className={`flex items-center rounded-lg px-3 py-2 transition-colors ${isActive('/') ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-100'
//                         }`}
//                 >
//                     <Home className={`mr-3 h-5 w-5 ${isActive('/') ? 'text-primary' : 'text-gray-500'}`} />
//                     <span className="font-medium">Home</span>
//                 </Link>

//                 <Link
//                     to="/Admin/classes"
//                     className={`flex items-center rounded-lg px-3 py-2 transition-colors ${isActive('/Admin/classes') ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-100'
//                         }`}
//                 >
//                     <GraduationCap className={`mr-3 h-5 w-5 ${isActive('/Admin/classes') ? 'text-primary' : 'text-gray-500'}`} />
//                     <span className="font-medium">Classes</span>
//                 </Link>

//                 <Link
//                     to="/Admin/subjects"
//                     className={`flex items-center rounded-lg px-3 py-2 transition-colors ${isActive('/Admin/subjects') ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-100'
//                         }`}
//                 >
//                     <BookOpen className={`mr-3 h-5 w-5 ${isActive('/Admin/subjects') ? 'text-primary' : 'text-gray-500'}`} />
//                     <span className="font-medium">Subjects</span>
//                 </Link>

//                 <Link
//                     to="/Admin/teachers"
//                     className={`flex items-center rounded-lg px-3 py-2 transition-colors ${isActive('/Admin/teachers') ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-100'
//                         }`}
//                 >
//                     <Users className={`mr-3 h-5 w-5 ${isActive('/Admin/teachers') ? 'text-primary' : 'text-gray-500'}`} />
//                     <span className="font-medium">Teachers</span>
//                 </Link>

//                 <Link
//                     to="/Admin/students"
//                     className={`flex items-center rounded-lg px-3 py-2 transition-colors ${isActive('/Admin/students') ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-100'
//                         }`}
//                 >
//                     <User className={`mr-3 h-5 w-5 ${isActive('/Admin/students') ? 'text-primary' : 'text-gray-500'}`} />
//                     <span className="font-medium">Students</span>
//                 </Link>

//                 <Link
//                     to="/Admin/notices"
//                     className={`flex items-center rounded-lg px-3 py-2 transition-colors ${isActive('/Admin/notices') ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-100'
//                         }`}
//                 >
//                     <Bell className={`mr-3 h-5 w-5 ${isActive('/Admin/notices') ? 'text-primary' : 'text-gray-500'}`} />
//                     <span className="font-medium">Notices</span>
//                 </Link>

//                 <Link
//                     to="/Admin/complains"
//                     className={`flex items-center rounded-lg px-3 py-2 transition-colors ${isActive('/Admin/complains') ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-100'
//                         }`}
//                 >
//                     <AlertTriangle className={`mr-3 h-5 w-5 ${isActive('/Admin/complains') ? 'text-primary' : 'text-gray-500'}`} />
//                     <span className="font-medium">Complains</span>
//                 </Link>

//                 <div className="my-4 h-px bg-gray-200" />

//                 <div className="px-3 text-xs font-semibold uppercase text-gray-500">User</div>

//                 <Link
//                     to="/Admin/profile"
//                     className={`flex items-center rounded-lg px-3 py-2 transition-colors ${isActive('/Admin/profile') ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-100'
//                         }`}
//                 >
//                     <UserCircle className={`mr-3 h-5 w-5 ${isActive('/Admin/profile') ? 'text-primary' : 'text-gray-500'}`} />
//                     <span className="font-medium">Profile</span>
//                 </Link>

//                 <Link
//                     to="/logout"
//                     className={`flex items-center rounded-lg px-3 py-2 transition-colors ${isActive('/logout') ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-100'
//                         }`}
//                 >
//                     <LogOut className={`mr-3 h-5 w-5 ${isActive('/logout') ? 'text-primary' : 'text-gray-500'}`} />
//                     <span className="font-medium">Logout</span>
//                 </Link>
//             </nav>
//         </div>
//     )
// }