import Grid from '@mui/material/Grid';
import Label from "../../datastructures/Lable";
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';

function Item(props: any) {
    return (
        <Chip
        avatar={<Avatar alt={props.lable.name} src={props.lable.logo_url} />}
        label={props.lable.name}
        variant="outlined"
        onClick={() => props.logAnswer(props.id)}
        />
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
        >
            {filteredOptions.map((e: any) => (
            <Grid item xs="auto" key={e[1]}>
                <Item lable={e[0]} id={e[1]} logAnswer={props.logAnswer}/>
            </Grid>
            ))}
      </Grid>
    )
}