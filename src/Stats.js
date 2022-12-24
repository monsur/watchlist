const moneyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

function Stats(props) {
  let total = 0;
  for (let i in props.data) {
    total += props.data[i].price;
  }

  return (
    <div style={{color: '#fff'}}>{moneyFormatter.format(total)}</div>
  );
}

export default Stats;
