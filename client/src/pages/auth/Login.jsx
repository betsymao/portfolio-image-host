// libraries
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// services
import authService from '../../services/authService';

// hooks
import useAuth from '../../hooks/useAuth';

function Login() {
    
    const { loginSaveUser } = useAuth();
    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);

    const { email, password } = user;

    const handleTextChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        try {
          const response = await authService.login(user);
          loginSaveUser(response.data);
          navigate('/');
        } catch (err) {
          console.log(err?.response);
          setTimeout(() => {setLoading(false)}, 1000);
        }
    };

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
                    <form className="card__form" onSubmit={ handleSubmit }>

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
                            value={email} 
                            onChange={ handleTextChange }
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
                            value={password} 
                            onChange={ handleTextChange }
                            required />
                        </div>

                        <button className="formBtn">
                            { loading ? '...' : 'Login'}
                        </button>

                    </form>

                    {/* footer */}
                    <div className="card__footer">
                        <p className="card__subtext">Don't have an account? <Link to="/register" className="card__link">Register</Link> as a new user.</p>
                    </div>

                </div>
            </div>
        </>
    );
}
  
export default Login;
  