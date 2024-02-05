// libraries
import { Link } from 'react-router-dom';

function Login() {
    return (
        <>
            <div className="root__content--grid root__content--margin">

                <img className="form__img" src="https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=1950&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />

                <div className="card">
                    {/* header */}
                    <div className="card__header">
                        <h2 className="card__title">Log in as an existing user</h2>
                    </div>

                    {/* form document */}
                    <form className="card__form">

                        {/* email */}
                        <div className="formGroup">
                            <label className="formLabel">
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
                            <label className="formLabel">
                            Password:
                            </label>
                            <input 
                            className="formInput"
                            placeholder="********" 
                            type="password"
                            name="password"
                            required />
                        </div>

                        <button className="formBtn">Login</button>

                    </form>

                    {/* footer */}
                    <div className="card__footer">
                        <p className="card__subtext">Don't have an account? <Link to="/register">Register</Link> as a new user.</p>
                    </div>

                </div>
            </div>
        </>
    );
}
  
export default Login;
  