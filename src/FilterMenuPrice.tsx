import Slider from "@mui/material/Slider";
import React from "react";
import FilterPrice from "./FilterPrice";

function FilterMenuPrice(props: { filter: FilterPrice }) {
  const [value, setValue] = React.useState<number[]>([
    props.filter.low,
    props.filter.high,
  ]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  return (
    <Slider
      getAriaLabel={() => "Price"}
      value={value}
      onChange={handleChange}
      valueLabelDisplay="auto"
      max={props.filter.max}
      min={props.filter.min}
      step={1000}
    />
  );
}

export default FilterMenuPrice;
