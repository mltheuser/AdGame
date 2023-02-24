import Grid from '@mui/material/Grid';
import Brand from "../../datastructures/Brand";
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';

const labelOptions = [
    new Brand("Old Spice", "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Old_Spice_wordmark.svg/1280px-Old_Spice_wordmark.svg.png"),
    new Brand("Heinz", "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Heinz-logo.svg/1280px-Heinz-logo.svg.png"),
    new Brand("IKEA", "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Ikea_logo.svg/2560px-Ikea_logo.svg.png"),
    new Brand("T-Mobile", "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Deutsche_Telekom_2022.svg/225px-Deutsche_Telekom_2022.svg.png"),
]

function Item(props: any) {
    return (
        <Chip
        avatar={<Avatar alt={props.brand.name} src={props.brand.logo_url} />}
        label={props.brand.name}
        variant="outlined"
        onClick={() => props.logAnswer(props.brand.name)}
        />
    )
}

export default function Suggestions(props: any) {
    let filteredOptions = [];
    if (props.input === "") {
        filteredOptions = labelOptions;
    } else {
        filteredOptions = labelOptions.filter((el: Brand) => {
            return el.name.toLowerCase().includes(props.inputText);
        });
    }

    return (
        <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        >
            {filteredOptions.map((brand, index) => (
            <Grid item xs="auto" key={index}>
                <Item brand={brand} logAnswer={props.logAnswer}/>
            </Grid>
            ))}
      </Grid>
    )
}