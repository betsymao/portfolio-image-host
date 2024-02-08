// libraries
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// services
import uploadService from '../../services/uploadService';

function AddImage() {

  const navigate = useNavigate();
  const [uploadData, setUploadData] = useState({
    title: '',
    category: '',
    image: '',
  });
  const [loading, setLoading] = useState(false);

  const { title, category } = uploadData;

  const handleTextChange = (e) => {
    const { title, value } = e.target;
    setUploadData({ ...uploadData, title: value });
  };

  const handleCategoryChange = (e) => {
    const { category, value } = e.target;
    setUploadData({ ...uploadData, category: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setUploadData({ ...uploadData, image: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();      
    setLoading(true);

    try {
      const response = await uploadService.post(uploadData);
      navigate('/');

    } catch (err) {
      toast.error(`${err.response.data}`);
      window.scroll({top: 0, left: 0, behavior: 'smooth' });
      setTimeout(() => {setLoading(false)}, 1000);
    }
  };

  return (
    <>
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
          <form className="card__form" onSubmit={ handleSubmit }>

              {/* title */}
              <div className="formGroup">
                <label className="formLabel">
                  Title:
                </label>
                <input 
                className="formInput"
                type="text" 
                placeholder=" e.g. Cat in a box"
                name="title"
                value={title}
                onChange={ handleTextChange }
                required />
              </div>

              {/* category */}
              <div className="formGroup">
                <label className="formLabel">
                  Category:
                </label>
                <select 
                className="formInput"
                name="category"
                value={category}
                onChange={ handleCategoryChange }>
                  <option value="">--Please choose a category--</option>
                  <option value="animals">Animals</option>
                  <option value="nature">Nature</option>
                  <option value="food">Food</option>
                  <option value="city">City</option>
                  <option value="people">People</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* file */}
              <div className="formGroup">
                  <label className="formLabel">
                    File:
                  </label>
                  <input 
                  type="file" 
                  onChange={ handleFileChange }
                  required />
              </div>

              <button className="formBtn">
                { loading ? '...' : 'Upload'}
              </button>

          </form>
        </div>
      </div>
    </>
  );
}
  
export default AddImage;
  