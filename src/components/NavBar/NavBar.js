import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import { blueGrey } from "@mui/material/colors";
import {SpeedDial, SpeedDialIcon} from "@mui/material";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import ColorLensIcon from "@mui/icons-material/ColorLens";

const gradientOptions = {
  blue: "linear-gradient(45deg, rgba(20,56,162,1) 18%, rgba(29,188,253,1) 69%, rgba(101,250,246,1) 87%)",
  red: "linear-gradient(45deg, rgba(255,0,0,1) 18%, rgba(255,34,34,1) 69%, rgba(255,85,85,1) 87%)",
  green: "linear-gradient(45deg, rgba(0,152,17,1) 18%, rgba(34,200,22,1) 69%, rgba(85,250,101,1) 87%)",
  purple: "linear-gradient(45deg, rgba(128,0,128,1) 18%, rgba(159,61,255,1) 69%, rgba(186,85,211,1) 87%)",
  orange: "linear-gradient(45deg, rgba(255,140,0,1) 18%, rgba(255,165,34,1) 69%, rgba(255,204,85,1) 87%)",
  pink: "linear-gradient(45deg, rgba(255,192,203,1) 18%, rgba(255,105,180,1) 69%, rgba(238,130,238,1) 87%)",
};
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

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: gradientOptions[selectedColor] }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            aria-label="home"
            sx={{ mr: 2, color: 'white' }}
          >
            <Link to="/">
              <HomeIcon fontSize="large" sx={{ color: 'white' }} />
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

          <div
            onMouseEnter={() => setPaletteOpen(true)}
            onMouseLeave={() => setPaletteOpen(false)}
            style={{
              position: "relative",
              backgroundColor: gradientOptions[selectedColor],
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            
            <SpeedDial
              ariaLabel="SpeedDial Example"
              sx={{
                position: "absolute",
                top: "6%",
                right: 30,
                backgroundColor: gradientOptions[selectedColor],
              }}
              icon={<SpeedDialIcon icon={<ColorLensIcon
                style={{ color: "white", cursor: "pointer",backgroundColor: gradientOptions[selectedColor] }}
              />}/>}
              direction="down"
              open={paletteOpen}
              onOpen={() => setPaletteOpen(true)}
              onClose={() => setPaletteOpen(false)}
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
          </div>
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
