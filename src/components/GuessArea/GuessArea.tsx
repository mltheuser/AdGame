import styled from "@emotion/styled";
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import GameProgress from "../GameProgress";
import Suggestions from "./Suggestions";

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

    useEffect(() => {
        setInputText("");
    }, [props.progress])

    return (
        <div>
            <CssTextField autoComplete='off' value={inputText} sx={{width: '45%', float: 'left'}} id="outlined-basic" label="Guess" variant="outlined" onChange={inputHandler} />
            <GameProgress progress={props.progress}/>
            <Suggestions inputText={inputText.toLowerCase()} lables={props.lables} logAnswer={props.logAnswer} />
        </div>
    );
}