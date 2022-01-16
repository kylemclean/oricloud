import React, { SyntheticEvent, useState } from 'react';
import { AppBar, Box, Container, Toolbar, Typography, IconButton, Menu, MenuItem, Button, Tooltip, Avatar, Drawer, List, ListItemIcon, ListItemText, ListItemButton } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const pages = [
    {
        name: "Programs",
        href: "/programs"
    },
    {
        name: "Jobs",
        href: "/jobs"
    },
];

const settings = [
    {
        name: "Nothing",
        href: "#"
    }
];

export default function NavigationBar(): JSX.Element {
    const [drawerIsOpen, setDrawerIsOpen] = useState<boolean>(false);
    const [anchorElUser, setAnchorElUser] = useState<Element | null>(null);

    const handleOpenNavMenu = () => {
        setDrawerIsOpen(true);
    };

    const handleCloseNavMenu = () => {
        setDrawerIsOpen(false);
    };

    const handleOpenUserMenu = (event: SyntheticEvent) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <>
            <Drawer anchor="left" open={drawerIsOpen} onClose={handleCloseNavMenu}>
                <List>
                    {pages.map(({ name, href }, index) => (
                        <ListItemButton key={index} onClick={handleCloseNavMenu} component={RouterLink} to={href}>
                            <ListItemIcon>
                                <MenuIcon />
                            </ListItemIcon>
                            <ListItemText primary={name} />
                        </ListItemButton>
                    ))}
                </List>
            </Drawer>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                        >
                            Oricloud
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="navigation menu"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                        </Box>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                        >
                            Oricloud
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {pages.map(({ name, href }, index) => (
                                <Button
                                    key={index}
                                    component={RouterLink}
                                    to={href}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {name}
                                </Button>
                            ))}
                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map(({ name, href }, index) => (
                                    <MenuItem key={index} onClick={handleCloseUserMenu} component={RouterLink} to={href}>
                                        <Typography textAlign="center">{name}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    );
};