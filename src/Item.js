import "./Item.css";
import { useParams, useNavigate, useLoaderData } from "react-router-dom";
import Box from "@mui/material/Box";
import Helpers from "./Helpers.ts";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Grid2 from "@mui/material/Unstable_Grid2";

function Item() {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const data = useLoaderData();

  function getItem() {
    return data.watches.find((element) => element.id === itemId);
  }

  function getDomain(link) {
    let hostnameFragments = new URL(link).hostname.split(".");
    let domain = "";
    for (let i = 0; i < 2; i++) {
      if (domain) {
        domain = "." + domain;
      }
      domain = hostnameFragments.pop() + domain;
    }
    return domain;
  }

  const item = getItem();
  let detail;
  if (item.detail) {
    detail = <div>{item.detail}</div>;
  }

  return (
    <Box className="Item">
      <Box sx={{ marginBottom: "100px" }}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              onClick={() => navigate(-1)}
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {data.title}
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Grid2 container spacing={2}>
        <Grid2>
          <img
            src={Helpers.getImageUrl(item.image)}
            alt={item.brand + " " + item.collection}
          ></img>
        </Grid2>
        <Grid2>
          <div>{item.brand}</div>
          <div>{item.collection}</div>
          {detail}
          <div>{Helpers.formatMoney(item.price)}</div>
          <div>
            <a href={item.link}>{getDomain(item.link)}</a>
          </div>
          <div>Diameter: {item.diameter}mm</div>
          <div>Thickness: {item.thickness}mm</div>
        </Grid2>
      </Grid2>
    </Box>
  );
}

export default Item;
