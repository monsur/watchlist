import './Grid.css';
import GridItem from './GridItem';

function Grid(props) {

  function getKey(item) {
    let key = item.brand + ' ' + item.collection;
    if (item.detail) {
      key += ' ' + item.detail;
    }
    return key;
  }

  return (
    <div className="Grid">
    {props.data.map((item) => <GridItem key={getKey(item)} item={item} />)}
    </div>
  );
}

export default Grid;