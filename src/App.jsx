// import styles from "./App.module.css";

import { Checkbox, Input, Slider } from "@mui/material";
import { useState } from "react";

const letters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const specialChars = "!@#$%^&*()+_?";

function App() {
  const [password, setPassword] = useState(null);

  const [value, setValue] = useState(12);
  const [uppercaseChecked, setUppercaseChecked] = useState(false);
  const [specialCharsChecked, setSpecialCharsChecked] = useState(false);
  const [numbersChecked, setNumbersChecked] = useState(false);

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

      // if (specialCharsChecked) {
      //   if (Math.random() > 0.25) {
      //     psw = letterCheck(lettersArr, letterRnd, psw);
      //   } else {
      //     psw = psw.concat(specialArr[specialRnd]);
      //   }
      //   continue;
      // }
    }
    setPassword(psw.toString());
    console.log(psw);
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
    <div className="m-auto md:max-w-[60%] text-center p-5 md:p-20">
      <h2 className="text-4xl mb-4">Password Generator</h2>
      <div>
        <div className="flex justify-between items-center w-full shadow-lg hover:cursor-pointer py-2 px-4 mb-4">
          <h4 className="text-2xl m-0">Length</h4>
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
          <h4 className="text-2xl m-0">Uppercase</h4>
          <div className="flex my-2">
            <Checkbox
              checked={uppercaseChecked}
              onChange={handleUppercaseChange}
              inputProps={{ "aria-label": "controlled" }}
            />
          </div>
        </div>
        <div className="flex justify-between items-center w-full shadow-lg hover:cursor-pointer py-2 px-4 mb-4">
          <h4 className="text-2xl m-0">Include Numbers</h4>
          <div className="flex my-2">
            <Checkbox
              checked={numbersChecked}
              onChange={handleNumbersChange}
              inputProps={{ "aria-label": "controlled" }}
            />
          </div>
        </div>
        <div className="flex justify-between items-center w-full shadow-lg hover:cursor-pointer py-2 px-4 mb-4">
          <h4 className="text-2xl m-0">Include Special Characters</h4>
          <div className="flex my-2">
            <Checkbox
              checked={specialCharsChecked}
              onChange={handleSpecialCharsChange}
              inputProps={{ "aria-label": "controlled" }}
            />
          </div>
        </div>
        <button
          className="uppercase rounded border bg-blue-500 p-3 text-white w-1/3 my-4 text-2xl"
          onClick={handleGeneratePassword}
        >
          Generate
        </button>
      </div>
      {password && (
        <h1 className="text-lg mt-5">
          Your password is :{" "}
          <i>
            <strong className="border-2 px-4 py-1 rounded border-blue-500 ">
              {password}
            </strong>
          </i>
        </h1>
      )}
    </div>
  );
}

export default App;
