// libraries
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// services
import authService from '../../services/authService';

// hooks
import useAuth from '../../hooks/useAuth';

// assets
import HeroImg from '../../assets/login_hero.jpg';

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
          toast.error(`${err.response.data}`);
          setTimeout(() => {setLoading(false)}, 1000);
        }
    };

    return (
        <>
            <div className="root__content--grid root__content--margin">

                <img className="form__img" src={HeroImg} alt="login hero image" />

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
  