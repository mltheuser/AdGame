import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export default function CountdownBar(props: any) {

  const [progress, setProgress] = React.useState(0);

  function getProgress() {
    return (props.end_t - props.player.getCurrentTime()) / props.end_t * 100;
  }

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress(() => {
        return getProgress();
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, [props.end_t]);

  return (
    <Box sx={{ width: '50%' }}>
      <LinearProgress variant="determinate" value={progress} />
    </Box>
  );
}