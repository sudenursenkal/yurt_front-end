import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import { blueGrey } from "@mui/material/colors";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import ColorLensIcon from "@mui/icons-material/ColorLens";

const colorOptions = [
  { label: "Blue", value: "blue" },
  { label: "Red", value: "red" },
  { label: "Green", value: "green" },
  { label: "Purple", value: "purple" },
  { label: "Orange", value: "orange" },
  { label: "Pink", value: "pink" },
];

function NavBar() {
  const [selectedColor, setSelectedColor] = useState("blue");
  const [paletteOpen, setPaletteOpen] = useState(false);

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const togglePalette = () => {
    setPaletteOpen((prevOpen) => !prevOpen);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: selectedColor }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            aria-label="home"
            sx={{ mr: 2, color: blueGrey[50] }}
          >
            <Link to="/">
              <HomeIcon fontSize="large" sx={{ color: blueGrey[50] }} />
            </Link>
          </IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <NavLink
              to="/dormitory"
              style={navLinkStyles}
              activeStyle={activeNavLinkStyles}
            >
              Dormitory Info
            </NavLink>

            <NavLink
              to="/room"
              style={navLinkStyles}
              activeStyle={activeNavLinkStyles}
            >
              Room Info
            </NavLink>

            <NavLink
              to="/student"
              style={navLinkStyles}
              activeStyle={activeNavLinkStyles}
            >
              Student Profiles
            </NavLink>

            <NavLink
              to="/createstudent"
              style={navLinkStyles}
              activeStyle={activeNavLinkStyles}
            >
              Create Student
            </NavLink>

            <NavLink
              to="/address"
              style={navLinkStyles}
              activeStyle={activeNavLinkStyles}
            >
              Address
            </NavLink>
          </Typography>

          <SpeedDial
            ariaLabel="ColorPicker SpeedDial"
            sx={{ position: "absolute", top:"6%" , right: 30,}}
            icon={<ColorLensIcon  />}
            direction="down"
            open={paletteOpen}
            onOpen={togglePalette}
            onClose={togglePalette}
          >
            {colorOptions.map((color) => (
              <SpeedDialAction
                key={color.value}
                icon={
                  <div
                    style={{
                      backgroundColor: color.value,
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                    }}
                  />
                }
                tooltipTitle={color.label}
                onClick={() => handleColorChange(color.value)}
              />
            ))}
          </SpeedDial>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

const navLinkStyles = {
  textDecoration: "none",
  padding: "10px 20px",
  borderRadius: "5px",
  position: "relative",
  display: "inline-block",
  color: "white",
  transition: "background 0.5s ease-in-out",
};

const activeNavLinkStyles = {
  fontWeight: "bold",
  background: "rgba(0, 0, 0, 0.05)",
  border: "5px solid rgba(0, 0, 0, 0.001)",
  borderRadius: "5px",
};

export default NavBar;
