import FilterOptions from "./FilterOptions";
import Checkbox from "@mui/material/Checkbox";
import { Box, Button, FormControlLabel, FormGroup } from "@mui/material";
import { useEffect, useState } from "react";
import FilterMenuItem from "./FilterMenuItem";
import Filters from "./Filters";
import FilterString from "./FilterString";

function FilterMenu(props: { filters: Filters }) {
  const [filters, setFilters] = useState(props.filters);

  function handleClear() {}

  function handleApply() {}

  function setChecked(fieldName: string, fieldValue: string, checked: boolean) {
    props.filters.setChecked(fieldName, fieldValue, checked);
  }

  useEffect(() => {
    setFilters(props.filters);
  }, [props.filters]);

  const brandFilter = filters.get("brand") as FilterString;
  if (!brandFilter) {
    throw new Error(`Filter for "brand" not found.`);
  }

  return (
    <Box>
      <Button variant="outlined" onClick={handleClear}>
        Clear
      </Button>
      <Button variant="contained" onClick={handleApply}>
        Apply
      </Button>
      <FilterMenuItem filter={brandFilter} handleCheck={setChecked} />
    </Box>
  );
}

export default FilterMenu;
