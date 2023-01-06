import "./GridItem.css";
import Helpers from "./Helpers.js";

function GridItem(props) {
  const item = props.item;
  return (
    <div>
      <a href={"#/item/" + item.id}>
        <img
          style={{ maxWidth: "50%" }}
          src={Helpers.getImageUrl(item.image)}
          alt={item.brand + " " + item.collection}
        />
      </a>
      <div>
        <div className="brandText">{item.brand}</div>
        <div className="collectionText">{item.collection}</div>
        <div className="moneyText">{Helpers.formatMoney(item.price)}</div>
      </div>
    </div>
  );
}

export default GridItem;
