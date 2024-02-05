// assets
import Logo from '../../assets/logo.svg';

function AddImage() {
  return (
    <>
      {/* add/upload image form page */}
      <div className="root__content--justify root__content--align">

        <div className="card">
        
          {/* header */}
          <div className="card__header">
            <h2 className="card__title">Upload an image</h2>
            <p className="card__text">File extensions allowed:</p>
            <ul className="card__list">
              <li className="card__list--item">.png</li>
              <li className="card__list--item">.jpg</li>
              <li className="card__list--item">.jpeg</li>
            </ul>
          </div>

          {/* form document */}
          <form className="card__form">

              {/* file */}
              <div className="formGroup">
                  <label className="formLabel">
                  File:
                  </label>
                  <input 
                  className="formInput"
                  placeholder="e.g. john@email.com" 
                  type="email" 
                  name="email"
                  required />
              </div>

              <button className="formBtn">Upload</button>

          </form>
        </div>
      </div>
    </>
  );
}
  
export default AddImage;
  