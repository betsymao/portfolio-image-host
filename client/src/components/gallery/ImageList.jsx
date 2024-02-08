// components
import Image from './Image';


function ImageList({ uploads }) {

  return (
    <>
    <div className="gallery">
      {/* gallery nav - all images, by category*/}
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