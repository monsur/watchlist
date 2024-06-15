import "./GridItem.css";
import Helpers from "./Helpers";
import { WatchData } from "./Types";

function GridItem(props: { item: WatchData, source: string }) {
  const item = props.item;
  return (
    <div>
      <a href={Helpers.getItemUrl(item.id, props.source)}>
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
