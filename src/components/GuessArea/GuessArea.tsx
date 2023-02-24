import { TextField } from "@mui/material";
import { useState } from "react";
import Suggestions from "./Suggestions";

export default function GuessArea(props: any) {

    const [inputText, setInputText] = useState("");

    function inputHandler(e: any) {
        const lowerCase = e.target.value.toLowerCase();
        setInputText(lowerCase);
    }

    return (
        <div>
            <TextField id="outlined-basic" label="Guess" variant="outlined" onChange={inputHandler} />
            <Suggestions inputText={inputText} logAnswer={props.logAnswer} />
        </div>
    );
}