// import { Box, Button } from "@mui/material";
// import React, { useEffect, useState } from "react";

// export default function Quiz() {
//   const [questions, setQuestions] = useState(null);
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [score, setScore] = useState(0);

//   // Fetch questions from the API
//   useEffect(() => {
//     fetch(
//       "https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple"
//     )
//       .then((response) => response.json())
//       .then((data) => setQuestions(data.results));
//   }, []);

//   // Function to handle user's answer
//   function handleAnswer(answer) {
//     // Check if the answer is correct
//     if (answer === questions[currentQuestion].correct_answer) {
//       setScore((prevScore) => prevScore + 1);
//     }

//     // Set a delay of 1 second before moving on to the next question
//     setTimeout(() => {
//       // Move on to the next question
//       setCurrentQuestion((currentQuestion) => currentQuestion + 1);
//     }, 1000);
//   }

//   // Render the current question and its options
//   function renderQuestion() {
//     const question = questions[currentQuestion];
//     let questionTitle = `Q${currentQuestion}. ${question.question}`;
//     const options = [
//       ...question.incorrect_answers,
//       question.correct_answer,
//     ].sort(() => Math.random() - 0.5);

//     return (
//       <Box sx={{ color: "#92a2c6" }}>
//         <h2>{questionTitle}</h2>

//         {options.map((option) => (
//           <div sx={{ borderRadius: "0.1rem", border: "1px solid grey" }}>
//             <Button
//               key={option}
//               variant="outlined"
//               onClick={() => handleAnswer(option)}
//               sx={{ mb: "0.5rem" }}
//             >
//               {option}
//             </Button>
//           </div>
//         ))}
//       </Box>
//     );
//   }

//   // Render the final score
//   function renderScore() {
//     return (
//       <div>
//         <h2>Your score: {score}</h2>
//       </div>
//     );
//   }

//   return (
//     <Box
//       sx={{
//         border: "1px solid grey",
//         borderRadius: "1rem",
//         mt: "2rem",
//         p: "1rem",
//       }}
//     >
//       {questions &&
//         (currentQuestion < questions.length ? renderQuestion() : renderScore())}
//     </Box>
//   );
// }

// import { Box, Button } from "@mui/material";
// import React, { useEffect, useState } from "react";

// export default function Quiz() {
//   const [questions, setQuestions] = useState([]);
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [score, setScore] = useState(0);

//   // Fetch questions from the API
//   useEffect(() => {
//     fetch(
//       "https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple"
//     )
//       .then((response) => response.json())
//       .then((data) => setQuestions(data.results));
//   }, []);

//   // Function to handle user's answer
//   function handleAnswer(answer) {
//     // Check if the answer is correct
//     if (answer === questions[currentQuestion].correct_answer) {
//       setScore(score + 1);
//     }

//     // Set a delay of 1 second before moving on to the next question
//     setTimeout(() => {
//       // Move on to the next question
//       setCurrentQuestion((currentQuestion) => currentQuestion + 1);
//     }, 1000);
//   }

//   // Render the current question and its options
//   function renderQuestion() {
//     const question = questions[currentQuestion];
//     let questionTitle = `Q${currentQuestion + 1}. ${question.question}`;
//     const options = [
//       ...question.incorrect_answers,
//       question.correct_answer,
//     ].sort(() => Math.random() - 0.5);

//     return (
//       <Box sx={{ color: "#92a2c6" }}>
//         <h2>{questionTitle}</h2>
//         {questions[currentQuestion] && (
//           <ul>
//             {options.map((option) => (
//               <div sx={{ borderRadius: "1rem", border: "1px solid grey" }}>
//                 <Button
//                   key={option}
//                   variant="outlined"
//                   onClick={() => handleAnswer(option)}
//                   sx={{ mb: "0.5rem" }}
//                 >
//                   {option}
//                 </Button>
//               </div>
//             ))}
//           </ul>
//         )}
//       </Box>
//     );
//   }

//   // Render the final score
//   function renderScore() {
//     return (
//       <div>
//         <h2>Your score: {score}</h2>
//       </div>
//     );
//   }

//   return (
//     <Box
//       sx={{
//         border: "1px solid grey",
//         borderRadius: "1rem",
//         mt: "2rem",
//         p: "1rem",
//       }}
//     >
//       {questions.length > 0 &&
//         (currentQuestion < questions.length ? renderQuestion() : renderScore())}
//     </Box>
//   );
// }

// import { Box, Button } from "@mui/material";
// import React, { useEffect, useState } from "react";

// export default function Quiz() {
//   const [questions, setQuestions] = useState([]);
//   const [currentQuestion, setCurrentQuestion] = useState(null);
//   const [score, setScore] = useState(0);

//   // Fetch questions from the API
//   useEffect(() => {
//     fetch(
//       "https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple"
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         setQuestions(data.results);
//         setCurrentQuestion(0);
//       });
//   }, []);

//   // Function to handle user's answer
//   function handleAnswer(answer) {
//     // Check if the answer is correct
//     if (answer === questions[currentQuestion].correct_answer) {
//       setScore(score + 1);
//     }

//     // Move on to the next question
//     setCurrentQuestion(currentQuestion + 1);
//   }

//   // Render the current question and its options
//   function renderQuestion() {
//     const question = questions[currentQuestion];
//     let questionTitle = `Q${currentQuestion + 1}. ${question.question}`;
//     const options = [
//       ...question.incorrect_answers,
//       question.correct_answer,
//     ].sort(() => Math.random() - 0.5);

//     return (
//       <Box sx={{ color: "#92a2c6" }}>
//         <h2>{questionTitle}</h2>
//         <ul>
//           {options.map((option) => (
//             <div sx={{ borderRadius: "1rem", border: "1px solid grey" }}>
//               <Button
//                 key={option}
//                 variant="outlined"
//                 onClick={() => handleAnswer(option)}
//                 sx={{ mb: "0.5rem" }}
//               >
//                 {option}
//               </Button>
//             </div>
//           ))}
//         </ul>
//       </Box>
//     );
//   }

//   // Render the final score
//   function renderScore() {
//     return (
//       <div>
//         <h2>Your score: {score}</h2>
//       </div>
//     );
//   }

//   return (
//     <Box
//       sx={{
//         border: "1px solid grey",
//         borderRadius: "0.3rem",
//         mt: "2rem",
//         p: "1rem",
//       }}
//     >
//       {currentQuestion !== null
//         ? currentQuestion < questions.length
//           ? renderQuestion()
//           : renderScore()
//         : "Loading questions..."}
//     </Box>
//   );
// }

import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  // Fetch questions from the API

  // Call the fetchQuestions function when the component mounts
  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch(
        "https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple"
      );
      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        throw new Error("Error in fetching questions");
      }

      setQuestions(data.results);
    };

    fetchQuestions();
  }, []);

  // Function to handle user's answer
  function handleAnswer(userAnswer) {
    // Check if the answer is correct
    if (userAnswer === questions[currentQuestion].correct_answer) {
      setScore((prevScore) => prevScore + 1);
    }

    // Move on to the next question
    setCurrentQuestion((questionNo) => questionNo + 1);
  }

  // Render the current question and its options
  function renderQuestion() {
    const question = questions[currentQuestion];
    let questionTitle = `Q${currentQuestion + 1}. ${question.question}`;
    const options = [
      ...question.incorrect_answers,
      question.correct_answer,
    ].sort(() => Math.random() - 0.5);

    return (
      <Box sx={{ color: "#92a2c6" }}>
        <Typography variant="h5" sx={{ mb: "1rem" }}>
          {questionTitle}
        </Typography>

        {options.map((option) => (
          <Button
            key={option}
            variant="outlined"
            onClick={() => handleAnswer(option)}
            sx={{ mb: "0.5rem", width: "50%" }}
          >
            {option}
          </Button>
        ))}
      </Box>
    );
  }

  // Render the final score
  function renderScore() {
    return (
      <Box sx={{ color: "#92a2c6" }}>
        <Typography variant="h4">Your score: {score}</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Box
        sx={{
          border: "1px solid grey",
          borderRadius: "0.3rem",
          mt: "2rem",
          p: "1rem",
          width: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {questions.length > 0 &&
          (currentQuestion < questions.length
            ? renderQuestion()
            : renderScore())}
      </Box>
    </Box>
  );
}
