import Button from '@mui/material/Button';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Link from 'next/link';
import React from 'react'
import { item, itemCategory } from './SidebarClasses';

interface ISidebarItem {
  title: string;
  icon: React.ReactNode;
  href: string;
  clickHandler?: () => void;
}

const SidebarItem = ({ title, icon, href, clickHandler }: ISidebarItem) => {

  return (
    <Link href={href}>
      <ListItemButton sx={{ ...item, ...itemCategory }}>
        <ListItemIcon>
          {icon}
        </ListItemIcon>
        {clickHandler ?
          (<ListItemText role={"button"} onClick={clickHandler} primary={title} />)
          :
          <ListItemText primary={title} />
        }
      </ListItemButton>
    </Link>
  )
}

export default SidebarItem