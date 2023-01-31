import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useState } from "react";
import FilterString from "./FilterString";
import { CountData } from "./Types";

function FilterMenuItem(props: {
  filter: FilterString;
  handleCheck: (a: string, b: string, c: boolean) => void;
}) {
  const [checkedItems, setCheckedItems] = useState(
    new Array(props.filter.filterItems.length).fill(false)
  );

  function handleCheck(index: number, item: CountData) {
    const updatedCheckedState = checkedItems.map((i, position) =>
      position === index ? !i : i
    );
    setCheckedItems(updatedCheckedState);
    props.handleCheck(props.filter.fieldName, item.fieldValue, !item.checked);
  }

  return (
    <FormGroup>
      <div>{props.filter.fieldName}</div>
      {props.filter.filterItems.map((item: CountData, index) => {
        return (
          <FormControlLabel
            control={
              <Checkbox
                checked={item.checked}
                onChange={() => handleCheck(index, item)}
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
