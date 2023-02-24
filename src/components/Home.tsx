import { Button } from "@mui/material";
import { useState } from "react";
import VideoSurface from "./VideoSurface";

const gameModes = [
    {steps: 3, challange: "test", lables: "international_tv_commercials"},
    {steps: 5, challange: "test", lables: "international_tv_commercials"}
];

export default function Home() {
    const [currentGameMode, setCurrentGameMode] = useState(-1);

    if (currentGameMode < 0) {
        return (
            <div>
                <Button variant="contained" onClick={() => setCurrentGameMode(0)}>Start Test Mode</Button>
                <Button variant="contained" onClick={() => setCurrentGameMode(1)}>Start Test Mode 2</Button>
            </div>
        )
    } else {
        return <VideoSurface setGameMode={setCurrentGameMode} gameConfig={gameModes[currentGameMode]}/>
    }
}