import GridItem from "./GridItem";
import Grid2 from "@mui/material/Unstable_Grid2";

function Grid(props) {
  return (
    <Grid2 container spacing={2}>
      {props.data.map((item) => (
        <Grid2 xs={6} sm={4} md={4} lg={2} key={item.id} sx={{mb: "50px"}}>
          <GridItem key={item.id} item={item} />
        </Grid2>
      ))}
    </Grid2>
  );
}

export default Grid;
