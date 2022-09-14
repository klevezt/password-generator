import {
  Checkbox,
  IconButton,
  Input,
  Slide,
  Slider,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";

import React, { forwardRef, useState } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const letters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const specialChars = "!@#$%^&*()+_?";

function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}

function App() {
  const [password, setPassword] = useState(null);

  const [value, setValue] = useState(12);
  const [uppercaseChecked, setUppercaseChecked] = useState(false);
  const [specialCharsChecked, setSpecialCharsChecked] = useState(false);
  const [numbersChecked, setNumbersChecked] = useState(false);
  const [transition, setTransition] = useState(undefined);


  const [open, setOpen] = useState(false);
  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClick = (Transition) => {
    setTransition(() => Transition);

    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleCopy = () => {
    handleClick(TransitionUp);
    navigator.clipboard.writeText(password);
  };

  const letterCheck = (lettersArr, letterRnd, psw) => {
    let p = psw;
    if (uppercaseChecked && Math.random() > 0.7) {
      p = psw.concat(lettersArr[letterRnd].toUpperCase());
    } else {
      p = psw.concat(lettersArr[letterRnd]);
    }
    return p;
  };

  const handleGeneratePassword = () => {
    let psw = "";
    for (let index = 0; index < value; index++) {
      const lettersArr = letters.split("");
      const numbersArr = numbers.split("");
      const specialArr = specialChars.split("");

      const letterRnd = Math.floor(Math.random() * 26);
      const numbersRnd = Math.floor(Math.random() * 10);
      const specialRnd = Math.floor(Math.random() * 13);

      if (numbersChecked || specialCharsChecked) {
        if (Math.random() > 0.8 && numbersChecked) {
          psw = psw.concat(numbersArr[numbersRnd]);
        } else if (Math.random() > 0.8 && specialCharsChecked) {
          psw = psw.concat(specialArr[specialRnd]);
        } else {
          psw = letterCheck(lettersArr, letterRnd, psw);
        }
      } else {
        psw = letterCheck(lettersArr, letterRnd, psw);
      }
    }
    setPassword(psw.toString());
  };

  const handleUppercaseChange = (event) => {
    setUppercaseChecked(event.target.checked);
  };
  const handleSpecialCharsChange = (event) => {
    setSpecialCharsChecked(event.target.checked);
  };
  const handleNumbersChange = (event) => {
    setNumbersChecked(event.target.checked);
  };

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 8) {
      setValue(8);
    } else if (value > 30) {
      setValue(30);
    }
  };

  return (
    <div className="relative ">
      <div
        className="absolute"
        style={{
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "100%",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundImage: "url(blackboard.jpg)",
          zIndex: "-1",
        }}
      ></div>
      <div className="flex justify-center items-center min-h-[100vh]">
        <div className="my-10 md:w-3/5 text-center p-5 md:p-10 z-1 bg-yellow-200/[.85] rounded">
          <h2 className="text-5xl mb-4 font-lobster">Password Generator</h2>
          <hr className="my-10 border border-black" />
          <div>
            <div className="flex justify-between items-center w-full shadow-lg hover:cursor-pointer py-2 px-4 mb-4">
              <h4 className="text-4xl m-0 font-lobster">Length</h4>
              <div className="flex w-2/3 my-2">
                <Slider
                  value={typeof value === "number" ? value : 0}
                  onChange={handleSliderChange}
                  aria-labelledby="input-slider"
                  className="mx-10"
                  min={8}
                  max={30}
                />
                <Input
                  value={value}
                  size="small"
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  inputProps={{
                    step: 1,
                    min: 8,
                    max: 30,
                    type: "number",
                    "aria-labelledby": "input-slider",
                  }}
                />
              </div>
            </div>
            <div className="flex justify-between items-center w-full shadow-lg hover:cursor-pointer py-2 px-4 mb-4">
              <h4 className="text-4xl m-0 font-lobster">Uppercase</h4>
              <div className="flex my-2">
                <Checkbox
                  checked={uppercaseChecked}
                  onChange={handleUppercaseChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </div>
            </div>
            <div className="flex justify-between items-center w-full shadow-lg hover:cursor-pointer py-2 px-4 mb-4">
              <h4 className="text-4xl m-0 font-lobster">Include Numbers</h4>
              <div className="flex my-2">
                <Checkbox
                  checked={numbersChecked}
                  onChange={handleNumbersChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </div>
            </div>
            <div className="flex justify-between items-center w-full shadow-lg hover:cursor-pointer py-2 px-4 mb-4">
              <h4 className="text-4xl m-0 font-lobster">
                Include Special Characters
              </h4>
              <div className="flex my-2">
                <Checkbox
                  checked={specialCharsChecked}
                  onChange={handleSpecialCharsChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </div>
            </div>
            <button
              className="uppercase rounded border bg-blue-500 px-8 py-4 text-white my-4 md:text-4xl font-lobster"
              onClick={handleGeneratePassword}
            >
              Generate
            </button>
          </div>
          {password && (
            <>
              <h1 className="text-2xl mt-5 font-lobster mb-5">
                Your password is :{" "}
              </h1>
              <strong className="border-2 px-4 py-1 rounded border-blue-500 border-4 text-2xl">
                {password}
                <IconButton onClick={handleCopy}>
                  <ContentCopyIcon color="primary" />
                </IconButton>
              </strong>
              <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                open={open}
                autoHideDuration={2000}
                onClose={handleClose}
                TransitionComponent={transition}
              >
                <Alert
                  onClose={handleClose}
                  severity="success"
                  sx={{ width: "100%" }}
                >
                  Copied!
                </Alert>
              </Snackbar>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
