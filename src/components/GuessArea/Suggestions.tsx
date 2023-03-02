import Grid from '@mui/material/Grid';
import Button, { ButtonProps } from '@mui/material/Button';
import styled from '@emotion/styled';

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

export default function Suggestions(props: any) {

    const lables = props.lables;

    let filteredOptions = [];
    if (props.input === "") {
        filteredOptions = lables;
    } else {
        filteredOptions = lables.filter((el: any) => {
            return el[0].name.toLowerCase().includes(props.inputText);
        });
    }

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