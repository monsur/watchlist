import "./GridItem.css";

const moneyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

function GridItem(props) {
  const item = props.item;
  return (
    <div>
      <a href={item.link}>
        <img
          style={{ maxWidth: "50%" }}
          src={process.env.PUBLIC_URL + "/images/" + item.image}
          alt={item.brand + " " + item.collection}
        />
      </a>
      <div>
        <div className="brandText">{item.brand}</div>
        <div className="collectionText">{item.collection}</div>
        <div className="moneyText">{moneyFormatter.format(item.price)}</div>
      </div>
    </div>
  );
}

export default GridItem;
