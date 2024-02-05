// components
import Image from './Image';

function ImageList() {
    return (
      <>
      <div className="gallery">
        {/* gallery nav - all images, is popular boolean, oldest, newest*/}
        {/* <p>gallery nav</p> */}

        {/* render gallery collection */}
        <div className="gallery__collection">
          {/* map over images */}
          <Image />
          <Image />
          <Image />
          <Image />
          <Image />
          <Image />
        </div>
      </div>
      </>
    );
  }
  
  export default ImageList;
  