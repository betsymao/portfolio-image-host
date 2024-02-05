// libraries
import { Link } from 'react-router-dom';

function Register() {
    return (
        <>
            <div className="root__content--grid root__content--margin">

                <img className="form__img" src="https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=1950&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                
                <div className="card">
                    {/* header */}
                    <div className="card__header">
                        <h2 className="card__title">Register as a new user</h2>
                    </div>

                

                    {/* form document */}
                    <form className="card__form">
                    
                        {/* username */}
                        <div className="formGroup">
                            <label className="formLabel">
                            Username:
                            </label>
                            <input 
                            className="formInput"
                            placeholder="e.g. john" 
                            type="text"
                            name="username"
                            required />
                        </div>

                        {/* email */}
                        <div className="formGroup">
                            <label className="form__label">
                            Email:
                            </label>
                            <input 
                            className="formInput"
                            placeholder="e.g. john@email.com" 
                            type="email" 
                            name="email"
                            required />
                        </div>

                        {/* password */}
                        <div className="formGroup">
                            <label className="form__label">
                            Password:
                            </label>
                            <input 
                            className="formInput"
                            placeholder="********" 
                            type="password"
                            name="password"
                            required />
                        </div>

                        {/* confirm password */}
                        {/* <div className="formGroup">
                            <label className="formLabel">
                            Confirm Password:
                            </label>
                            <input 
                            className="formInput"
                            placeholder="********" 
                            type="password"
                            required />
                        </div> */}

                        <button className="formBtn">Register</button>

                    </form>

                    {/* footer */}
                    <div className="card__footer">
                        <p className="card__subtext">Already have an account? <Link to="/login">Login</Link> as an existing user.</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;
  