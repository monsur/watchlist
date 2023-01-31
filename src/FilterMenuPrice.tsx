import TextField from '@mui/material/TextField';
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
    <div>
    <TextField id="outlined-basic" label="Outlined" variant="outlined" />
    <TextField id="outlined-basic" label="Outlined" variant="outlined" />
    </div>
  );
}

export default FilterMenuPrice;
