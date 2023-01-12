import FilterOptions from "./FilterOptions";
import Checkbox from "@mui/material/Checkbox";
import { Box, Button, FormControlLabel, FormGroup } from "@mui/material";
import { useEffect, useState } from "react";
import FilterMenuItem from "./FilterMenuItem";
import Filters from "./Filters";
import FilterString from "./FilterString";
import { useSearchParams } from "react-router-dom";
import FilterMenuPrice from "./FilterMenuPrice";
import FilterPrice from "./FilterPrice";

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

  return (
    <Box>
      <Button variant="outlined" onClick={handleClear}>
        Clear
      </Button>
      <Button variant="contained" onClick={handleApply}>
        Apply
      </Button>
      <FilterMenuPrice filter={props.filters.get("price") as FilterPrice}></FilterMenuPrice>
      <FilterMenuItem filter={props.filters.get("brand") as FilterString} handleCheck={setChecked} />
      <FilterMenuItem filter={props.filters.get("type") as FilterString} handleCheck={setChecked} />
      <FilterMenuItem filter={props.filters.get("color") as FilterString} handleCheck={setChecked} />
    </Box>
  );
}

export default FilterMenu;
