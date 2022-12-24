import "./Item.css";
import data from "./data.json";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Helpers from "./helpers.js";

function Item() {
  const { itemId } = useParams();

  function getItem() {
    return data.find((element) => element.id == itemId);
  }

  const item = getItem();
  return (
    <Box>
      <img src={Helpers.getImageUrl(item.image)}></img>
    </Box>
  );
}

export default Item;
