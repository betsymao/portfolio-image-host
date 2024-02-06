// components
import Image from './Image';


function ImageList({ uploads }) {

  return (
    <>
    <div className="gallery">
      {/* gallery nav - all images, is popular boolean, oldest, newest*/}
      {/* <p>gallery nav</p> */}

      {/* render gallery collection */}
      <div className="gallery__collection">
        {uploads.length > 0 && uploads.map(upload => 
          <Image 
            key={upload.id}
            id={upload.id}
            title={upload.title}
            category={upload.category}
            image={upload.image}
          />
        )}
      </div>
    </div>
    </>
  );
}
  
export default ImageList;