import { Box, Button, Grid, Menu, MenuItem, Typography } from "@mui/material";
import styled from "@emotion/styled";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import React, { useEffect, useState } from "react";

const category = {
  1: 23, // History
  2: 11, // Movies
  3: 22, // Geography
  4: 21, // Sports
  5: 31, // Anime,
  6: 15, // Video Games
  7: 10, // Books
  8: 9, // General Knowledge
};

export default function Quiz(props) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [optionColor, setOptionColor] = useState({});
  const [timeoutId, setTimeoutId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [playAgain, setPlayAgain] = useState(false);
  const [difficulty, setDifficulty] = useState(null);
  const [difficultyAnchorEl, setDifficultyAnchorEl] = useState(null);

  const handleClickDifficulty = (event) => {
    setDifficultyAnchorEl(event.currentTarget);
  };

  const handleCloseDifficulty = () => {
    setDifficultyAnchorEl(null);
  };

  const categoryId = category[props.selectedCategory];

  const MenuItemMod = styled(MenuItem)({
    "&:hover": { background: "black" },
  });

  // Fetch questions from the API
  // Call the fetchQuestions function when the component mounts
  useEffect(() => {
    const fetchQuestions = async () => {
      setIsLoading(true);
      let response;
      if (difficulty && categoryId) {
        response = await fetch(
          `https://opentdb.com/api.php?amount=10&category=${categoryId}&difficulty=${difficulty}&type=multiple`
        );
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error("Error in fetching questions");
      }

      const shuffledQuestions = data.results.map((question) => {
        const shuffledOptions = [
          ...question.incorrect_answers,
          question.correct_answer,
        ].sort(() => Math.random() - 0.5);
        return {
          ...question,
          options: shuffledOptions,
        };
      });

      setQuestions(shuffledQuestions);
      setIsLoading(false);
      setCurrentQuestion(0);
      setScore(0);
    };

    fetchQuestions();
  }, [categoryId, playAgain, props.selectedCategory, difficulty]);

  const handleAnswer = (userAnswer) => {
    clearTimeout(timeoutId);

    // Check if the answer is correct
    const isCorrect = userAnswer === questions[currentQuestion].correct_answer;
    const updatedOptionColor = {};

    questions[currentQuestion].options.forEach((option) => {
      if (option === userAnswer) {
        updatedOptionColor[option] = isCorrect ? "green" : "red";
      } else if (option === questions[currentQuestion].correct_answer) {
        updatedOptionColor[option] = "green";
      } else {
        updatedOptionColor[option] = optionColor[option] || "#92a2c6";
      }
    });

    setOptionColor(updatedOptionColor);

    // Update score
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }

    // Move on to the next question
    if (currentQuestion < questions.length) {
      const timeoutId = setTimeout(() => {
        setCurrentQuestion((questionNo) => questionNo + 1);
      }, 500);
      setTimeoutId(timeoutId);
    }
  };

  // Decodes the inner HTML from the encoded string
  const decodeEntities = (encodedString) => {
    const div = document.createElement("div");
    div.innerHTML = encodedString;
    return div.innerText;
  };

  const handlePlayAgain = () => {
    setCurrentQuestion(0);
    setScore(0);
    setPlayAgain(!playAgain);
  };

  // Render the current question and its options
  const renderQuestion = () => {
    const question = questions[currentQuestion];
    let questionTitle = `Q${currentQuestion + 1}. ${decodeEntities(
      question.question
    )}`;

    return (
      <Box sx={{ color: "#92a2c6" }}>
        <Typography variant="h5" sx={{ mb: "1rem" }}>
          {questionTitle}
        </Typography>

        <Grid container spacing={1}>
          {question.options.map((option) => (
            <Grid item xs={12} sm={6} key={option}>
              <Button
                variant="outlined"
                onClick={() => {
                  handleAnswer(option);
                }}
                sx={{
                  mb: "0.5rem",
                  width: "100%",
                  color: optionColor[option],
                  textOverflow: "ellipsis",
                  // whiteSpace: "nowrap",
                  // p: "0.5rem",
                  flexGrow: 1,
                }}
              >
                {/* Options in plain text */}
                {decodeEntities(option)}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };

  // Render the final score
  const renderScore = () => {
    return (
      <>
        <Box
          sx={{
            borderRadius: "0.2rem",
            textAlign: "center",
            p: "1rem",
            background:
              "linear-gradient(90deg, #E55897 0%, rgba(186, 108, 236, 0.76) 103.53%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            textFillColor: "transparent",
          }}
        >
          <Typography variant="h4" sx={{ mb: "1rem" }}>
            Your score: {score}
          </Typography>
          {/* <Button variant="outlined">Play Again</Button> */}
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button variant="outlined" onClick={handlePlayAgain}>
            Play Again
          </Button>
        </Box>
      </>
    );
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mx: "auto",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: "1.5rem",
          }}
        >
          <Button
            sx={{
              textTransform: "capitalize",
              fontWeight: 400,
              fontFamily: "Open Sans, sans-serif",
              letterSpacing: "1px",
              fontSize: "1rem",
              display: "flex",
              color: "#92a2c6",
              border: "1px solid #92a2c6",
              width: "8rem",
            }}
            onClick={handleClickDifficulty}
            endIcon={<ArrowDropDownIcon />}
          >
            {difficulty ? difficulty : "Difficulty"}
          </Button>
          <Menu
            id="difficulty-menu"
            anchorEl={difficultyAnchorEl}
            open={Boolean(difficultyAnchorEl)}
            onClose={handleCloseDifficulty}
            MenuListProps={{
              "aria-labelledby": "menu-difficulty",
            }}
            PaperProps={{
              sx: {
                backgroundColor: "#1e2227",
                color: "#92a2c6",
              },
            }}
          >
            <MenuItemMod
              onClick={() => {
                setDifficulty("easy");
                handleCloseDifficulty();
              }}
            >
              Easy
            </MenuItemMod>
            <MenuItemMod
              onClick={() => {
                setDifficulty("medium");
                handleCloseDifficulty();
              }}
            >
              Medium
            </MenuItemMod>
            <MenuItemMod
              onClick={() => {
                setDifficulty("hard");
                handleCloseDifficulty();
              }}
            >
              Hard
            </MenuItemMod>
          </Menu>
        </Box>
        {difficulty && !isLoading && currentQuestion < questions.length && (
          <Box
            sx={{
              border: "1px solid #92a2c6",
              borderRadius: "0.3rem",
              mt: "2rem",
              p: "1rem",
              width: {
                xs: "80vw", // on extra small screens, set the width to 100%
                sm: "70vw", // on small screens and up, set the width to 80%
                md: "50vw", // on medium screens and up, set the width to 60%
                lg: "40vw", // on large screens and up, set the width to 50%
              },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              // background: "#2e2e41",
            }}
          >
            {questions.length > 0 &&
              currentQuestion < questions.length &&
              renderQuestion()}
          </Box>
        )}

        <Box
          sx={{
            // width: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: "2rem",
          }}
        >
          <Box>
            <Box>
              {questions.length > 0 &&
                currentQuestion >= questions.length &&
                renderScore()}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
