import GridItem from "./GridItem";
import Grid2 from "@mui/material/Grid";
import { WatchData } from "./Types";

function Grid(props: { data: WatchData[], source: string }) {
  return (
    <Grid2 container spacing={2}>
      {props.data.map((item) => (
        <Grid2 size={{xs: 12, sm: 6, md: 4, lg: 2}} key={item.id} sx={{ mb: "50px" }}>
          <GridItem key={item.id} item={item} source={props.source} />
        </Grid2>
      ))}
    </Grid2>
  );
}

export default Grid;
