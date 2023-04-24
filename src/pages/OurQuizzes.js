import { Box, Grid } from "@mui/material";
import React, { useState } from "react";
import CategoryCard from "../components/CategoryCard";
import Quiz from "../components/Quiz";

export default function OurQuizzes() {
  const [selectedCategory, setSelectedCategory] = useState();

  const categories = [
    { id: 1, name: "History" },
    { id: 2, name: "Movies" },
    { id: 3, name: "Geography" },
    { id: 4, name: "Sports" },
    { id: 5, name: "Anime" },
    { id: 6, name: "Video Games" },
    { id: 7, name: "Books" },
    { id: 8, name: "General Knowledge" },
  ];

  return (
    <Box sx={{ p: "2rem" }}>
      <Grid container spacing={2}>
        {categories.map((category) => (
          <Grid item key={category.id} xs={12} sm={6} md={4} lg={3}>
            <CategoryCard
              category={category}
              setSelectedCategory={setSelectedCategory}
            />
          </Grid>
        ))}
      </Grid>
      {/* {selectedCategory && console.log("Selected category: ", selectedCategory)} */}
      {selectedCategory && <Quiz selectedCategory={selectedCategory} />}
    </Box>
  );
}
