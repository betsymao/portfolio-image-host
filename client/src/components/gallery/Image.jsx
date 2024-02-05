// libraries
import { Link } from 'react-router-dom';

function Image(props) {
    return (
      <>
        <div className="gallery__collection--item">
          <Link to={`/images/${props.id}`}>
            <img src={props.image} alt={props.title} />
          </Link>
        </div>
      </>
    );
  }
  
  export default Image;
  