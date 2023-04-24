import { Paper, Typography } from "@mui/material";
import React, { useState } from "react";

export default function CategoryCard(props) {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
    props.setSelectedCategory(props.category.id);
  };

  return (
    <Paper
      onClick={handleClick}
      elevation={0}
      sx={{
        p: 2,
        textAlign: "center",
        cursor: "pointer",
        background: clicked ? "#92a2c6" : "#2c313c",
        color: clicked ? "#2c313c" : "#92a2c6",
        "&:hover": { background: "#1e2227", color: "#92a2c6" },
      }}
    >
      <Typography variant="h6">{props.category.name}</Typography>
    </Paper>
  );
}
