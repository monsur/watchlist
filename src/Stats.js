import Helpers from "./helpers.js";

function Stats(props) {
  let total = 0;
  for (let i in props.data) {
    total += props.data[i].price;
  }

  return (
    <div style={{color: '#fff'}}>{Helpers.formatMoney(total)}</div>
  );
}

export default Stats;
