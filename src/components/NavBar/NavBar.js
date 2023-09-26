import React from "react";
import { Link, NavLink } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import { blue } from '@mui/material/colors';





function NavBar() {



    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"

                        aria-label="home"
                        sx={{ mr: 2, color: blue[50] }}
                    >

                        <Link to="/">
                            <HomeIcon fontSize="large" sx={{ color: blue[50] }} />
                        </Link>
                    </IconButton>

                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>

                        <NavLink
                            to="/dormitory"
                            style={{
                                textDecoration: "none",
                                padding: "10px 20px",
                                borderRadius: "5px",
                                position: "relative",
                                display: "inline-block",
                                color: "white",
                                transition: "background 0.5s ease-in-out",
                            }}
                            activeStyle={{
                                fontWeight: "bold",
                                background: "rgba(0, 0, 0, 0.05)",
                                border: "5px solid rgba(0, 0, 0, 0.001)",
                                borderRadius: "5px",

                            }}>

                            <Typography variant="h6" gutterBottom>
                                Dormitory Info
                            </Typography>

                        </NavLink>

                        <NavLink to="/room"
                            style={{
                                textDecoration: "none",
                                padding: "10px 20px",
                                borderRadius: "5px",
                                position: "relative",
                                display: "inline-block",
                                color: "white",
                                transition: "background 0.5s ease-in-out",
                            }}
                            activeStyle={{
                                fontWeight: "bold",
                                background: "rgba(0, 0, 0, 0.05)",
                                border: "5px solid rgba(0, 0, 0, 0.0001)",
                                borderRadius: "5px",

                            }}>
                            <Typography variant="h6" gutterBottom>
                                Room  Info
                            </Typography>
                        </NavLink>

                        <NavLink to="/student"
                            style={{
                                textDecoration: "none",
                                padding: "10px 20px",
                                borderRadius: "5px",
                                position: "relative",
                                display: "inline-block",
                                color: "white",
                                transition: "background 0.5s ease-in-out",
                            }}
                            activeStyle={{
                                fontWeight: "bold",
                                background: "rgba(0, 0, 0, 0.05)",
                                border: "5px solid rgba(0, 0, 0, 0.0001)",
                                borderRadius: "5px",

                            }}>
                            <Typography variant="h6" gutterBottom>
                                Student Profiles
                            </Typography>
                        </NavLink>

                        <NavLink to="/createstudent"
                            style={{
                                textDecoration: "none",
                                padding: "10px 20px",
                                borderRadius: "5px",
                                position: "relative",
                                display: "inline-block",
                                color: "white",
                                transition: "background 0.5s ease-in-out",
                            }}
                            activeStyle={{
                                fontWeight: "bold",
                                background: "rgba(0, 0, 0, 0.05)",
                                border: "5px solid rgba(0, 0, 0, 0.0001)",
                                borderRadius: "5px",

                            }}>
                            <Typography variant="h6" gutterBottom>
                                Create Student
                            </Typography>
                        </NavLink>
                        {/*<NavLink to="/student/update"
                            style={{
                                textDecoration: "none",
                                padding: "10px 20px",
                                borderRadius: "5px",
                                position: "relative",
                                display: "inline-block",
                                color: "white",
                                transition: "background 0.5s ease-in-out",
                            }}
                            activeStyle={{
                                fontWeight: "bold",
                                background: "rgba(0, 0, 0, 0.05)",
                                border: "5px solid rgba(0, 0, 0, 0.0001)",
                                borderRadius: "5px",

                            }}>
                            <Typography variant="h6" gutterBottom>
                                Edit Student
                            </Typography>
                        </NavLink>*/}
                        <NavLink
                            to="/address"
                            style={{
                                textDecoration: "none",
                                padding: "10px 20px",
                                borderRadius: "5px",
                                position: "relative",
                                display: "inline-block",
                                color: "white",
                                transition: "background 0.5s ease-in-out",
                            }}
                            activeStyle={{
                                fontWeight: "bold",
                                background: "rgba(0, 0, 0, 0.05)",
                                border: "5px solid rgba(0, 0, 0, 0.001)",
                                borderRadius: "5px",

                            }}>

                            <Typography variant="h6" gutterBottom>
                                Address
                            </Typography>


                        </NavLink>
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box >


    )
}

export default NavBar;