import Grid from '@mui/material/Grid';
import Button, { ButtonProps } from '@mui/material/Button';
import styled from '@emotion/styled';
import Slide from '@mui/material/Slide';
import topKClosestMatches from '../../utils/matcher';

const ItemButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: "rgb(0 0 0 / 75%)",
    backgroundColor: "white",
    '&:hover': {
      backgroundColor: "white",
    },
}));

function Item(props: any) {
    return (
        <ItemButton sx={{fontFamily: "Krona One, Roboto"}} variant="contained" onClick={() => props.logAnswer(props.id)}>
            {props.lable.name}
        </ItemButton>
    )
}

function filter_by_guess(input: string, lables: Array<any>) {
    let filteredOptions = [];
    if (input === "") {
        filteredOptions = lables;
    } else {
        /*
        filteredOptions = lables.filter((el: any) => {
            return el[0].name.toLowerCase().includes(input);
        });
        */
        filteredOptions = topKClosestMatches(lables, input, 3);
        console.log(filteredOptions);
    }
    return filteredOptions;
}

function Suggestions(props: any) {

    const filteredOptions = filter_by_guess(props.inputText, props.lables);

    return (
        <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={{ xs: 2, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}
        >
            {filteredOptions.map((e: any) => (
            <Grid item xs="auto" key={e[1]}>
                <Item lable={e[0]} id={e[1]} logAnswer={props.logAnswer}/>
            </Grid>
            ))}
      </Grid>
    )
}

export {Suggestions, filter_by_guess};