import React from 'react'
import { AppBar, Box, CssBaseline, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'
import { Routes } from '../../../features/routes/Routes'
import { NavLink, Route, Routes as BrowsingRoutes } from 'react-router-dom'

const drawerWidth = 280

const Sidebar = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar color={'transparent'} position='fixed' sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
        <Toolbar>
          {/*  To do : Match the name with the route */}
          <Typography variant='h6' noWrap component='div'>
            Contacts
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          backgroundColor: '#053086',
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box'
          }
        }}
        variant='permanent'
        anchor='left'
      >
        <Toolbar>
          <Typography variant='h6' noWrap component='div'>
            INVENTORUM
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          {Routes.map((route) => (
            <NavLink style={{ textDecoration: 'inherit', transition: 'all 0.3s ease' }} to={route.path} key={route.id}>
              <ListItem button>
                {route.icon && (
                  <ListItemIcon>
                    <route.icon />
                  </ListItemIcon>
                )}
                <ListItemText sx={{ color: 'text.disabled' }} primary={route.sidebarName} />
              </ListItem>
            </NavLink>
          ))}
        </List>
      </Drawer>

      <Box component='main' sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
        <Toolbar />
        <BrowsingRoutes>
          {Routes.map((route) => (
            <Route path={route.path} key={route.path} element={<route.component />} />
          ))}
        </BrowsingRoutes>
      </Box>
    </Box>
  )
}

export default Sidebar
