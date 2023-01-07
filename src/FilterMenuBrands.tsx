import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useState } from "react";
import { CountData } from "./Types";

function FilterMenuBrands(props: { data: CountData[] }) {
  const [checkedBrands, setCheckedBrands] = useState(
    new Array(props.data.length).fill(false)
  );

  function handleBrandCheck(index: number) {
    const updatedCheckedState = checkedBrands.map((item, position) =>
      position === index ? !item : item
    );
    setCheckedBrands(updatedCheckedState);
  }

  return (
    <FormGroup>
      {props.data.map(({ key, count }, index) => {
        return (
          <FormControlLabel
            control={
              <Checkbox
                checked={checkedBrands[index]}
                onChange={() => handleBrandCheck(index)}
              />
            }
            label={`${key} (${count})`}
            key={key}
          />
        );
      })}
    </FormGroup>
  );
}

export default FilterMenuBrands;
