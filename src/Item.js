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

  function getDomain(link) {
    let hostname = new URL(link).hostname;
    let hostnameFragments = hostname.split(".");
    let domain = "";
    for (let i = 0; i < 2; i++) {
      if (!domain) {
        domain = hostnameFragments.pop();
      } else {
        domain = hostnameFragments.pop() + "." + domain;
      }
    }
    return domain;
  }

  const item = getItem();

  return (
    <Box>
      <div>
        <img src={Helpers.getImageUrl(item.image)}></img>
      </div>
      <div>
        <div>{item.brand}</div>
        <div>{item.collection}</div>
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
