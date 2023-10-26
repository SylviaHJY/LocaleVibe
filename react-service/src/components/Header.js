import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import '../styles/Home.css';
import { NavLink } from "react-router-dom";
import { AppBar, Toolbar, Typography, IconButton, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const Header = () => {
    const [user, setUser] = useState(null);
    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, setUser);
        return () => unsubscribe();
    }, [auth]);

    const handleLogout = () => {
        signOut(auth).then(() => {
            console.log('User signed out');
        }).catch((error) => {
            console.error('Sign out error:', error);
        });
    };

    const theme = createTheme({
        palette: {
            primary: {
                main: '#f6f6f9',
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <AppBar class="AppBar" position="static">
                <Toolbar variant="dense">
                    <IconButton
                        size="medium"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <NavLink to="/"><MenuIcon /></NavLink>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Events
                    </Typography>
                    <Button color="inherit" onClick={user ? handleLogout : null}>
                        <NavLink to={user ? "/" : "/login"}>{user ? "Logout" : "Login"}</NavLink>
                    </Button>
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    );
};

/*     
 <AppBar position = "static" justify = "center"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
                <Toolbar justify = "space-between">
    
                    <button id="menu-btn">
                    <span class="material-symbols-outlined">menu</span>
                    </button>
        
                    <NavLink to='/'><b>Home</b></NavLink>
                    <span> </span>
                    <NavLink to='/login'><b>Login/Signup</b></NavLink>
                    </Toolbar>
           
                    
    
        </AppBar>

<div class="info">
    <p>Hey, <b>FS Digital team</b></p>
    <small class="test-muted">Admin</small>
</div>
<div class="profile-photo">
    <img src={profile}></img>
</div>
*/

export default Header;