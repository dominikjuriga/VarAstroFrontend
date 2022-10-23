import React from 'react'
import Link from "next/link"
import s from "../../styles/Sidebar.module.css"
import useAuthentication from '../../features/auth/hooks/useAuthentication'
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import SendIcon from '@mui/icons-material/Send';
import SidebarItem from "./SidebarItem"
import SidebarCollapsibleList from './SidebarCollapsibleList';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import SidebarCollapsibleItem from './SidebarCollapsibleItem';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CenterFocusWeakIcon from '@mui/icons-material/CenterFocusWeak';
import AddIcon from '@mui/icons-material/Add';
import VillaIcon from '@mui/icons-material/Villa';
import TimelineIcon from '@mui/icons-material/Timeline';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import GroupIcon from '@mui/icons-material/Group';
interface IProps {
  sidebarToggled: boolean
}

const Sidebar = ({ sidebarToggled }: IProps) => {
  const { user, logout } = useAuthentication();

  return (
    <div className={`${s.sidebar} ${sidebarToggled ? s.sidebarToggled : ""}`}>
      <List
        sx={{ width: '100%', maxWidth: 360, height: "100%", overflowY: "auto" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      // subheader={
      //   <ListSubheader component="div" id="nested-list-subheader">
      //     Navigation
      //   </ListSubheader>
      // }
      >
        <SidebarItem title="Home" href='/' icon={<SendIcon />} />
        <SidebarCollapsibleList title="Stars" icon={<StarBorderIcon />}>
          <SidebarCollapsibleItem title='List' href='/Stars' icon={<FormatListBulletedIcon />} />
        </SidebarCollapsibleList>
        {!user && (
          <>
            <SidebarItem title={'Log In'} icon={<LoginIcon />} href={'/Auth/Login'} />
            <SidebarItem title={'Sign Up'} icon={<PersonAddIcon />} href={'/Auth/SignUp'} />
          </>
        )}
        {user && (
          <>
            <SidebarCollapsibleList title="Light Curves" icon={<TimelineIcon />}>
              <SidebarCollapsibleItem title='List' href='/LightCurves' icon={<FormatListBulletedIcon />} />
              <SidebarCollapsibleItem title='Upload New Curve' href='/LightCurves/Upload' icon={<AddIcon />} />
            </SidebarCollapsibleList>
            <SidebarCollapsibleList title="Devices" icon={<CenterFocusWeakIcon />}>
              <SidebarCollapsibleItem title='List' href='/Devices' icon={<FormatListBulletedIcon />} />
              <SidebarCollapsibleItem title='Create New' href='/Devices/CreateDevice' icon={<AddIcon />} />
            </SidebarCollapsibleList>
            <SidebarCollapsibleList title="Observatories" icon={<VillaIcon />}>
              <SidebarCollapsibleItem title='List' href='/Observatories' icon={<FormatListBulletedIcon />} />
              <SidebarCollapsibleItem title='Create New' href='/Observatories/CreateObservatory' icon={<AddIcon />} />
            </SidebarCollapsibleList>
            <SidebarCollapsibleList title="Admin" icon={<AdminPanelSettingsIcon />}>
              <SidebarCollapsibleItem title='Manage Users' href='/Admin/Users' icon={<GroupIcon />} />

            </SidebarCollapsibleList>
            <SidebarItem title={`${user.firstName} ${user.lastName}`} icon={<AssignmentIndIcon />} href={'/User/Profile'} />
            <SidebarItem clickHandler={logout} title={'Log Out'} icon={<LogoutIcon />} href={'#'} />
          </>
        )}
      </List>

    </div>
  )
}

export default Sidebar