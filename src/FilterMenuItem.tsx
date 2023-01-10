import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useState } from "react";
import FilterString from "./FilterString";
import { CountData, Filter } from "./Types";

function FilterMenuItem(props: { filter: FilterString, handleCheck: (a: string, b: string, c: boolean) => void }) {
  function handleCheck(fieldValue: string, checked: boolean) {
    props.handleCheck(props.filter.fieldName, fieldValue, !checked);
  }

  return (
    <FormGroup>
      {props.filter.filterItems.map((item: CountData, index) => {
        return (
          <FormControlLabel
            control={
              <Checkbox
                checked={item.checked}
                onChange={() => handleCheck(item.fieldValue, item.checked)}
              />
            }
            label={`${item.fieldValue} (${item.count})`}
            key={item.fieldValue}
          />
        );
      })}
    </FormGroup>
  );
}

export default FilterMenuItem;
