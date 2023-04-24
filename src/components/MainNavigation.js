import React from "react";
import { Link, NavLink } from "react-router-dom";

import styled from "@emotion/styled";

// import PersonIcon from "@mui/icons-material/Person";
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import PeopleIcon from "@mui/icons-material/People";

import { AppBar, Box, Button, Stack, Toolbar, Typography } from "@mui/material";

export default function MainNavigation() {
  const TitleCaseButton = styled(Button)({
    textTransform: "capitalize",
    fontWeight: 500,
    fontFamily: "Open Sans, sans-serif",
    letterSpacing: "0.3px",
    fontSize: "20px",
    // color: "#757db5",
    // color: "#92a2c6",
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
      // "&.active": {
      //   color: "green",
      // },
      // activeLink: { color: "red" },
    },
    icon: {
      fontSize: "2rem !important",
    },
  };

  // const MainLogo = (
  //   <Icon
  //     sx={{
  //       height: "100%",
  //       width: "100%",
  //     }}
  //   >
  //     <img alt="logo" src={MainLogoCustom} />
  //   </Icon>
  // );

  const LogoButton = styled(Button)({
    "& .MuiSvgIcon-root": {
      fontSize: "2rem",
      letterSpacing: "1px",
    },
  });

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1e2227" }} elevation={0}>
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
              startIcon={
                <ElectricBoltIcon
                  sx={{
                    ...styles.icon,
                    color: "#E55897",
                  }}
                />
              }
              sx={{
                height: "3rem",
                width: "3rem",
                ml: "2.5rem",
                mr: "3rem",
              }}
              disableElevation
            >
              <Typography
                variant="h5"
                component="div"
                sx={{
                  flexGrow: 1,
                  fontWeight: "700",
                  textTransform: "none",
                  background:
                    "linear-gradient(90deg, #E55897 0%, rgba(186, 108, 236, 0.76) 103.53%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  textFillColor: "transparent",
                }}
              >
                ThinkFast
              </Typography>
            </LogoButton>
          </Link>
        </Box>

        <Stack direction="row" spacing={1} sx={{ paddingLeft: "1rem" }}>
          <NavLink
            // style={styles.link}
            to="/quizzes/our"
            // activeClassName="active-link"
            // activeStyle={{ color: "red" }}
            // className={({ isActive }) => (isActive ? "active-link" : "")}
            style={({ isActive }) =>
              isActive
                ? {
                    ...styles.link,
                    background: "#2c313c",
                    borderRadius: "0.2rem",
                  }
                : { ...styles.link, background: "none" }
            }
          >
            <TitleCaseButton
              startIcon={<WorkspacePremiumIcon sx={styles.icon} />}
              sx={{ color: "#92a2c6" }}
            >
              Our Trivia
            </TitleCaseButton>
          </NavLink>

          <NavLink
            style={({ isActive }) =>
              isActive
                ? {
                    ...styles.link,
                    background: "#2c313c",
                    borderRadius: "0.2rem",
                  }
                : { ...styles.link, background: "none" }
            }
            to="/quizzes/community"
            // activeClassName="active-link"
            // activeStyle={{ color: "red" }}
            // className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            <TitleCaseButton
              startIcon={<PeopleIcon sx={styles.icon} />}
              sx={{ color: "#92a2c6" }}
            >
              Community Trivia
            </TitleCaseButton>
          </NavLink>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
