import FilterOptions from "./FilterOptions";
import Checkbox from "@mui/material/Checkbox";
import { Box, Button, FormControlLabel, FormGroup } from "@mui/material";
import { useState } from "react";
import FilterMenuBrands from "./FilterMenuBrands";

function FilterMenu(props: { filterOptions: FilterOptions }) {
  function handleClear() {}

  function handleApply() {}

  return (
    <Box>
      <Button variant="outlined" onClick={handleClear}>
        Clear
      </Button>
      <Button variant="contained" onClick={handleApply}>
        Apply
      </Button>
      <FilterMenuBrands data={props.filterOptions.brands} />
    </Box>
  );
}

export default FilterMenu;
