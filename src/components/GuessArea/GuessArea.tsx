import styled from "@emotion/styled";
import { Send } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import GameProgress from "../GameProgress";
import { filter_by_guess, Suggestions } from "./Suggestions";

const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
      color: 'white',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'white',
    },
    '& .MuiInputLabel-animated': {
        color: "white !important",
    },
    '& .MuiOutlinedInput-root': {
        color: 'white',
      '& fieldset': {
        borderColor: 'white',
      },
      '&:hover fieldset': {
        borderColor: 'white',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white',
      },
    },
  });

export default function GuessArea(props: any) {

    const [inputText, setInputText] = useState("");

    function inputHandler(e: any) {
        setInputText(e.target.value);
    }

    function keyPress(e: any){
      if(e.keyCode === 13){
        const options = filter_by_guess(inputText.toLowerCase(), props.lables);
        if (options.length > 0) {
          props.logAnswer(options[0][1]);
        } else {
          props.logAnswer(-1);
        }
      }
   }

    useEffect(() => {
        setInputText("");
    }, [props.progress])

    return (
        <div>
            <CssTextField autoComplete='off' 
            value={inputText} sx={{width: '45%', float: 'left'}} 
            id="outlined-basic" label="Guess" 
            variant="outlined" 
            InputProps={{
              endAdornment: <InputAdornment position="end">
                <IconButton
                  aria-label="send guess"
                  edge="end"
                >
              <Send sx={{color: "white"}}/>
              </IconButton>
            </InputAdornment>,
            }}
            onChange={inputHandler}
            onKeyDown={keyPress} />
            <GameProgress progress={props.progress}/>
            <Suggestions inputText={inputText.toLowerCase()} lables={props.lables} logAnswer={props.logAnswer} />
        </div>
    );
}