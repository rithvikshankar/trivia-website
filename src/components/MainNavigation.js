import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import styled from "@emotion/styled";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import MainLogoCustom from "../assets/Logo_blue_48px.svg";
import {
  AppBar,
  Box,
  Button,
  Icon,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";

export default function MainNavigation() {
  const navigate = useNavigate();

  // const handleClickPatient = (event) => {
  //   setPatientAnchorEl(event.currentTarget);
  // };

  // const handleClosePatient = () => {
  //   setPatientAnchorEl(null);
  // };

  // const handleClickDoctor = (event) => {
  //   setDoctorAnchorEl(event.currentTarget);
  // };

  // const handleCloseDoctor = () => {
  //   setDoctorAnchorEl(null);
  // };

  // const buttonRef = useImperativeHandle(null);

  const TitleCaseButton = styled(Button)({
    textTransform: "capitalize",
    fontWeight: 500,
    fontFamily: "Open Sans, sans-serif",
    letterSpacing: "1px",
    fontSize: "20px",
    color: "#757db5",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "&:hover": {
      backgroundColor: "rgba(117,125,181,0.25)",
    },
  });

  const styles = {
    link: {
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      color: "inherit",
    },
    icon: {
      fontSize: "2rem !important",
    },
  };

  const MainLogo = (
    <Icon
      sx={{
        height: "100%",
        width: "100%",
      }}
    >
      <img alt="logo" src={MainLogoCustom} />
    </Icon>
  );

  const LogoButton = styled(Button)({
    "& .MuiSvgIcon-root": {
      // width: "auto",

      letterSpacing: "1px",
      "&:hover": {
        backgroundColor: "rgba(117,125,181,0.25)",
      },
    },
  });

  return (
    <AppBar position="static" sx={{ backgroundColor: "#373d70" }} elevation={0}>
      <Toolbar
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            borderRadius: "0.2rem",
            "&:hover": { backgroundColor: "rgba(117,125,181,0.25)" },
            height: "100%",
          }}
        >
          <Link to="/" sx={styles.link}>
            <LogoButton
              startIcon={MainLogo}
              sx={{
                height: "3rem",
                width: "3rem",
                ml: "2.5rem",
                mr: "2.5rem",
                // "&:hover": {
                //   backgroundColor: "rgba(117,125,181,0.25)",
                // },
              }}
            >
              <Typography
                variant="h5"
                component="div"
                sx={{ flexGrow: 1, color: "#757db5", fontWeight: "700" }}
              >
                Trivia
              </Typography>
            </LogoButton>
          </Link>
        </Box>

        <Stack direction="row" spacing={1} sx={{ paddingLeft: "1rem" }}>
          <Link style={styles.link} to="/">
            <TitleCaseButton startIcon={<HomeIcon sx={styles.icon} />}>
              Home
            </TitleCaseButton>
          </Link>

          <Link style={styles.link} to="/appointments">
            <TitleCaseButton
              startIcon={<EventAvailableIcon sx={styles.icon} />}
            >
              Appointments
            </TitleCaseButton>
          </Link>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
