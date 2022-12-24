import "./GridItem.css";

const moneyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

function GridItem(props) {
  const item = props.item;
  const itemName = item.brand + " " + item.collection;

  return (
    <div className="GridItem">
      <a href={item.link}>
        <img
          src={process.env.PUBLIC_URL + "/images/" + item.image}
          alt={itemName}
        />
      </a>
      <div className="description">
        <div>{itemName}</div>
        <div>{moneyFormatter.format(item.price)}</div>
      </div>
    </div>
  );
}

export default GridItem;
