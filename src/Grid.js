import GridItem from "./GridItem";
import Grid2 from "@mui/material/Unstable_Grid2";

function Grid(props) {
  return (
    <Grid2
      container
      spacing={{ xs: 2, md: 3 }}
      columns={12}
    >
      {props.data.map((item) => (
        <Grid2 xs={6} sm={4} md={4} lg={2} key={item.id}>
          <GridItem key={item.id} item={item} />
        </Grid2>
      ))}
    </Grid2>
  );
}

export default Grid;
