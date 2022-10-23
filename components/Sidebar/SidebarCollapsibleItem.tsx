import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText';
import Link from 'next/link'
import React from 'react'
import { item, itemCategory } from './SidebarClasses';

interface ISidebarCollapsibleItem {
  title: string;
  icon: React.ReactNode;
  href: string;
}

const SidebarCollapsibleItem = ({ title, icon, href }: ISidebarCollapsibleItem) => {
  return (
    <Link href={href}>
      <ListItemButton sx={{ ...item, ...itemCategory, pl: 5 }}>
        <ListItemIcon>
          {icon}
        </ListItemIcon>
        <ListItemText primary={title} />

      </ListItemButton>
    </Link>
  )
}

export default SidebarCollapsibleItem