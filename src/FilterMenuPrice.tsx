import { InputAdornment } from "@mui/material";
import TextField from "@mui/material/TextField";

function FilterMenuPrice(props: {
  lowPrice: string;
  highPrice: string;
  setLowPrice: (a: string) => void;
  setHighPrice: (a: string) => void;
}) {
  const handleLowChange = (newValue: string) => {
    props.setLowPrice(newValue);
  };

  const handleHighChange = (newValue: string) => {
    props.setHighPrice(newValue);
  };

  return (
    <div>
      <TextField
        id="outlined-basic"
        label="Min"
        variant="outlined"
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
        onChange={(event) => handleLowChange(event.target.value)}
        defaultValue={props.lowPrice}
      />
      <TextField
        id="outlined-basic"
        label="Max"
        variant="outlined"
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
        onChange={(event) => handleHighChange(event.target.value)}
        defaultValue={props.highPrice}
      />
    </div>
  );
}

export default FilterMenuPrice;
