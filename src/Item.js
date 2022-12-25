import "./Item.css";
import data from "./data.json";
import { useParams, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Helpers from "./helpers.js";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function Item() {
  const { itemId } = useParams();
  const navigate = useNavigate();

  function getItem() {
    return data.find((element) => element.id === itemId);
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
    <Box>
      <Box sx={{ flexGrow: 1, marginBottom: "100px" }}>
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
              My Watch Wishlist
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <div>
        <img src={Helpers.getImageUrl(item.image)} alt={item.brand + ' ' + item.collection}></img>
      </div>
      <div>
        <div>{item.brand}</div>
        <div>{item.collection}</div>
        {detail}
        <div>{Helpers.formatMoney(item.price)}</div>
        <div>
          <a href={item.link}>{getDomain(item.link)}</a>
        </div>
        <div>Diameter: {item.diameter}mm</div>
        <div>Thickness: {item.thickness}mm</div>
      </div>
    </Box>
  );
}

export default Item;
