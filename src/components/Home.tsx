import { Button, Typography } from "@mui/material";
import { useState } from "react";
import VideoSurface from "./VideoSurface";

const gameModes = [
    {steps: 3, challange: "test", lables: "international_tv_commercials"},
];

export default function Home() {
    const [currentGameMode, setCurrentGameMode] = useState(-1);

    if (currentGameMode < 0) {
        return (
            <div className="LandingPage-content">
                <Typography variant="h1" className="LandingPage-title">
                    Guess the Brand
                </Typography>
                <Typography className="LandingPage-subtitle">
                    Watch the commercial. Name the brand. How sharp are you?
                </Typography>
                <Button
                    variant="contained"
                    onClick={() => setCurrentGameMode(0)}
                    // The sx prop is perfect for one-off style overrides
                    sx={{
                        backgroundColor: 'white',
                        color: 'black',
                        fontFamily: '"Krona One", sans-serif',
                        fontWeight: 'bold',
                        fontSize: '1rem',
                        padding: '12px 28px',
                        '&:hover': {
                            backgroundColor: '#e0e0e0', // A slightly darker white on hover
                        }
                    }}
                >
                    Start Demo
                </Button>
            </div>
        )
    } else {
        return <VideoSurface setGameMode={setCurrentGameMode} gameConfig={gameModes[currentGameMode]}/>
    }
}