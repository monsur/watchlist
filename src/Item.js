import "./Item.css";
import { useParams } from 'react-router-dom';

function Item() {
  const { itemId } = useParams();

  return <div className="Item">{itemId}</div>;
}

export default Item;
