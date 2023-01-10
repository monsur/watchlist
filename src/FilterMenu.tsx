import FilterOptions from "./FilterOptions";
import Checkbox from "@mui/material/Checkbox";
import { Box, Button, FormControlLabel, FormGroup } from "@mui/material";
import { useEffect, useState } from "react";
import FilterMenuItem from "./FilterMenuItem";
import Filters from "./Filters";
import FilterString from "./FilterString";
import { useSearchParams } from "react-router-dom";

function FilterMenu(props: { filters: Filters, handleClose: any }) {
  let [searchParams, setSearchParams] = useSearchParams();
  
  function handleClear() {
    setSearchParams({});
    props.handleClose();
  }

  function handleApply() {
    setSearchParams(props.filters.getQueryParam());
    props.handleClose();
  }

  function setChecked(fieldName: string, fieldValue: string, checked: boolean) {
    props.filters.setChecked(fieldName, fieldValue, checked);
  }
  
  const brandFilter = props.filters.get("brand") as FilterString;
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
