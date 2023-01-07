import FilterOptions from "./FilterOptions";
import Checkbox from "@mui/material/Checkbox";
import { Box, Button, FormControlLabel, FormGroup } from "@mui/material";

function FilterMenu(props: { filterOptions: FilterOptions }) {
  return (
    <Box>
      <Button variant="outlined">Clear</Button>
      <Button variant="contained">Apply</Button>
      <FormGroup>
        {props.filterOptions.brands.map(({ key, count }, index) => {
          return (
            <FormControlLabel
              control={<Checkbox />}
              label={`${key} (${count})`}
              key={key}
            />
          );
        })}
      </FormGroup>
    </Box>
  );
}

export default FilterMenu;
