import './Grid.css';
import GridItem from './GridItem';

function Grid(props) {
  return (
    <div className="Grid">
    {props.data.map((item) => <GridItem key={item.id} item={item} />)}
    </div>
  );
}

export default Grid;