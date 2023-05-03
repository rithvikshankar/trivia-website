import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
// import styled from "@emotion/styled";

import React, { useReducer } from "react";

const quizReducer = (currentDetails, action) => {
  switch (action.type) {
    case "set_question":
      return {
        ...currentDetails,
        question: {
          value: action.payload,
          error: "",
        },
      };
    // case "set_options":
    //   return {
    //     ...currentDetails,
    //     options: [
    //       ...currentDetails.options.map((option, index) =>
    //         index === action.payload.index
    //           ? { ...option, value: action.payload.value, error: "" }
    //           : option
    //       ),
    //     ],
    //   };
    case "set_options":
      const { index, value } = action.payload;
      const updatedOption = {
        ...currentDetails.options[index],
        value: value,
        error: "",
      };
      const updatedOptions = [
        ...currentDetails.options.slice(0, index),
        updatedOption,
        ...currentDetails.options.slice(index + 1),
      ];
      return {
        ...currentDetails,
        options: updatedOptions,
      };

    case "set_correct_option":
      return {
        ...currentDetails,
        correct_option: {
          value: action.payload,
          error: "",
        },
      };

    case "reset":
      return initialState;
    case "set_error": //field is name, age, contact or address, action.payload.error is the error message
      return {
        ...currentDetails,
        [action.payload.field]: {
          ...currentDetails[action.payload.field],
          error: action.payload.error,
        },
      };
    default:
      throw new Error("Default case reached");
  }
};

let initialState = {
  question: { value: "", error: "" },
  options: [
    { value: "", error: "" },
    { value: "", error: "" },
    { value: "", error: "" },
    { value: "", error: "" },
  ], // Might give a problem
  correct_option: { value: "", error: "" },
};

export default function QuizForm(props) {
  const [quizState, dispatch] = useReducer(
    quizReducer,
    initialState
    // props.type === "edit" ? props.initialState : initialState // If the type is edit, initial state is the current values of the fields, not ''
  );

  const submitQuestion = async () => {
    const response = await fetch(props.url, {
      method: props.method,
      body: JSON.stringify({
        question: quizState.question.value,
        options: quizState.options.value,
        correct_option: quizState.correct_option.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      console.log("Response is ok");
      // props.setShowMessage(true);
      // setTimeout(() => {
      //   props.setShowMessage(false);
      // }, 1200);
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    // if (patientState.name.error || patientState.age.error || ...)
    if (Object.values(quizState).some((prop) => prop.error)) {
      alert(
        "One or more fields are invalid. Please enter valid details and try again."
      );
    } else {
      submitQuestion();
      dispatch({ type: "reset" });
    }
  };

  // const changeHandler = (event) => {
  //   const { name, value } = event.target;

  //   dispatch({
  //     type: `set_${name}`,
  //     payload: value,
  //   });
  // };

  const changeHandler = (event) => {
    const { name, value } = event.target;

    if (name === "correct_option") {
      dispatch({
        type: `set_${name}`,
        payload: value,
      });
    } else if (name.startsWith("option_")) {
      const index = Number(name.split("_")[1]);
      dispatch({
        type: "set_options",
        payload: { index, value },
      });
    } else {
      dispatch({
        type: `set_${name}`,
        payload: value,
      });
    }

    console.log(quizState);
  };

  const blurHandler = (event) => {
    const { name, value } = event.target;

    if (name.startsWith("correct_answer")) {
      if (!value || value.trim() === "") {
        dispatch({
          type: "set_error",
          payload: {
            field: name,
            error: "This field is required.",
          },
        });
      }
    }

    // else if (name === "contact" && !contactPattern.test(value)) {
    //   dispatch({
    //     type: "set_error",
    //     payload: {
    //       field: name,
    //       error: "Contact number must be valid.",
    //     },
    //   });
    //   } else if (
    //     name === "age" &&
    //     (parseFloat(value) <= 0 ||
    //       isNaN(parseFloat(value)) ||
    //       !agePattern.test(value))
    //   ) {
    //     dispatch({
    //       type: "set_error",
    //       payload: {
    //         field: name,
    //         error: "Age must be a valid number",
    //       },
    //     });
    //   }
  };

  // const StyledTextField = styled(TextField)({
  //   color: "#FFFFFF",
  //   borderColor: "#92a2c6",
  // });
  // const CustomTextField = styled(TextField)(({ theme }) => ({
  //   "& .MuiOutlinedInput-root": {
  //     "& fieldset": {
  //       borderColor: "#92a2c6",
  //     },
  //     "&:hover fieldset": {
  //       borderColor: "#92a2c6",
  //     },
  //     "&.Mui-focused fieldset": {
  //       borderColor: "#92a2c6",
  //     },
  //   },
  // }));
  const optionList = [1, 2, 3, 4];

  return (
    <form onSubmit={submitHandler}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          p: "2rem",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: {
              xs: "90vw",
              sm: "70vw",
              md: "60vw",
              lg: "50vw",
              xl: "40vw",
            },
            border: "1px solid #92a2c6",
            borderRadius: "0.7rem",
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ mb: "2rem" }}>
            {props.question}
          </Typography>
          <TextField
            required
            autoComplete="off"
            id="question-title"
            label="Question"
            name="question"
            error={Boolean(quizState.question.error)}
            helperText={quizState.question.error}
            variant="outlined"
            value={quizState.question.value}
            sx={{
              "& fieldset": { borderColor: "#92a2c6" },
              "&:hover fieldset": { borderColor: "#92a2c6" },
              "&.Mui-focused fieldset": {
                borderColor: "#92a2c6",
              },
            }}
            inputProps={{
              sx: {
                height: "1.1rem",
                width: {
                  xs: "60vw",
                  sm: "50vw",
                  md: "45vw",
                  lg: "35vw",
                  xl: "25vw",
                },
                color: "#92a2c6",
              },
            }}
            InputLabelProps={{
              sx: {
                color: "#92a2c6 ",
              },
            }}
            // color="secondary"
            // sx={{ mb: "2rem" }}
            onChange={changeHandler}
            onBlur={blurHandler}
          />
          {/* <CustomTextField
            required
            id="question-title"
            label="Question"
            name="question"
            error={Boolean(quizState.question.error)}
            helperText={quizState.question.error}
            variant="outlined"
            value={quizState.question.value}
            inputProps={{
              sx: {
                height: "1.1rem",
                width: "20rem",
                color: "#92a2c6",
              },
            }}
            onChange={changeHandler}
            onBlur={blurHandler}
          /> */}
          <br />
          <TextField
            required
            autoComplete="off"
            id="option-0"
            name="option_0"
            label="Option 1"
            variant="outlined"
            value={quizState.options[0].value}
            error={Boolean(quizState.options.error)}
            helperText={quizState.options.error}
            sx={{
              "& fieldset": { borderColor: "#92a2c6" },
              "&:hover fieldset": { borderColor: "#92a2c6" },
              "&.Mui-focused fieldset": {
                borderColor: "#92a2c6",
              },
            }}
            inputProps={{
              sx: {
                height: "1.1rem",
                width: {
                  xs: "60vw",
                  sm: "50vw",
                  md: "45vw",
                  lg: "35vw",
                  xl: "25vw",
                },
                color: "#92a2c6",
              },
            }}
            InputLabelProps={{
              sx: {
                color: "#92a2c6 ",
              },
            }}
            onChange={changeHandler}
            onBlur={blurHandler}
          />
          <br />
          <TextField
            required
            autoComplete="off"
            id="option-1"
            name="option_1"
            label="Option 2"
            variant="outlined"
            value={quizState.options[1].value}
            error={Boolean(quizState.options.error)}
            helperText={quizState.options.error}
            sx={{
              "& fieldset": { borderColor: "#92a2c6" },
              "&:hover fieldset": { borderColor: "#92a2c6" },
              "&.Mui-focused fieldset": {
                borderColor: "#92a2c6",
              },
            }}
            inputProps={{
              sx: {
                height: "1.1rem",
                width: {
                  xs: "60vw",
                  sm: "50vw",
                  md: "45vw",
                  lg: "35vw",
                  xl: "25vw",
                },
                color: "#92a2c6",
              },
            }}
            InputLabelProps={{
              sx: {
                color: "#92a2c6 ",
              },
            }}
            onChange={changeHandler}
            onBlur={blurHandler}
          />
          <br />
          <TextField
            required
            autoComplete="off"
            id="option-2"
            name="option_2"
            label="Option 3"
            variant="outlined"
            value={quizState.options[2].value}
            error={Boolean(quizState.options.error)}
            helperText={quizState.options.error}
            sx={{
              "& fieldset": { borderColor: "#92a2c6" },
              "&:hover fieldset": { borderColor: "#92a2c6" },
              "&.Mui-focused fieldset": {
                borderColor: "#92a2c6",
              },
            }}
            inputProps={{
              sx: {
                height: "1.1rem",
                width: {
                  xs: "60vw",
                  sm: "50vw",
                  md: "45vw",
                  lg: "35vw",
                  xl: "25vw",
                },
                color: "#92a2c6",
              },
            }}
            InputLabelProps={{
              sx: {
                color: "#92a2c6 ",
              },
            }}
            onChange={changeHandler}
            onBlur={blurHandler}
          />
          <br />
          <TextField
            required
            autoComplete="off"
            id="option-3"
            name="option_3"
            label="Option 4"
            variant="outlined"
            value={quizState.options[3].value}
            error={Boolean(quizState.options.error)}
            helperText={quizState.options.error}
            sx={{
              "& fieldset": { borderColor: "#92a2c6" },
              "&:hover fieldset": { borderColor: "#92a2c6" },
              "&.Mui-focused fieldset": {
                borderColor: "#92a2c6",
              },
            }}
            inputProps={{
              sx: {
                height: "1.1rem",
                width: {
                  xs: "60vw",
                  sm: "50vw",
                  md: "45vw",
                  lg: "35vw",
                  xl: "25vw",
                },
                color: "#92a2c6",
              },
            }}
            InputLabelProps={{
              sx: {
                color: "#92a2c6 ",
              },
            }}
            onChange={changeHandler}
            onBlur={blurHandler}
          />
          <br />
          <TextField
            required
            select
            autoComplete="off"
            id="correct-option"
            name="correct_option"
            label="Correct Option"
            variant="outlined"
            value={quizState.correct_option.value}
            error={Boolean(quizState.correct_option.error)}
            helperText={quizState.correct_option.error}
            sx={{
              "& fieldset": { borderColor: "#92a2c6" },
              "&:hover fieldset": { borderColor: "#92a2c6" },
              "&.Mui-focused fieldset": {
                borderColor: "#92a2c6",
              },
            }}
            SelectProps={{
              sx: {
                height: "3.2rem",
                width: {
                  xs: "65.7vw",
                  sm: "53.7vw",
                  md: "47.9vw",
                  lg: "36.8vw",
                  xl: "26.7vw",
                },
                color: "#92a2c6",
              },
            }}
            InputLabelProps={{
              sx: {
                color: "#92a2c6 ",
              },
            }}
            onChange={changeHandler}
            onBlur={blurHandler}
          >
            {optionList.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <br />

          <Button
            type="submit"
            size="large"
            variant="contained"
            color="primary"
            sx={{ justifyContent: "flex-start", mb: "1rem" }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </form>
  );
}
