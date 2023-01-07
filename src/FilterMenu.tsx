import FilterOptions from "./FilterOptions";
import Checkbox from "@mui/material/Checkbox";
import { FormControlLabel, FormGroup } from "@mui/material";

function FilterMenu(props: { filterOptions: FilterOptions }) {
  return (
    <FormGroup>
      {props.filterOptions.brands.map(({ key, count }, index) => {
        return (<FormControlLabel control={<Checkbox />} label={`${key} (${count})`} key={key} />);
      })}
    </FormGroup>
  );
}

export default FilterMenu;
