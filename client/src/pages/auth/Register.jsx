// libraries
import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// services
import authService from '../../services/authService';

// hooks
import useAuth from '../../hooks/useAuth';

// assets
import HeroImg from '../../assets/register_hero.jpg';

function Register() {

    const { loginSaveUser } = useAuth();
    const navigate = useNavigate();
    const passwordConfirmRef = useRef();

    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);

    const { username, email, password } = user;

    const handleTextChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (password !== passwordConfirmRef.current.value) {
            toast.error('Passwords do not match.');
            setLoading(false);
            return;
          }

        try {
            const response = await authService.register(user);
            loginSaveUser(response.data);
            navigate('/');
        } catch (err) {
            console.log(err?.response);
            setTimeout(() => {setLoading(false)}, 1000);
        }
    }

    return (
        <>
            <div className="root__content--grid root__content--margin">

                <img className="form__img" src={HeroImg} alt="register hero image" />
                
                <div className="card">
                    {/* header */}
                    <div className="card__header">
                        <h2 className="card__title">Register as a new user</h2>
                    </div>

                    {/* form document */}
                    <form className="card__form" onSubmit={ handleSubmit }>
                    
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
                            value={username}
                            onChange={ handleTextChange }
                            required />
                        </div>

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

                        {/* confirm password */}
                        <div className="formGroup">
                            <label className="formLabel">
                            Confirm Password:
                            </label>
                            <input 
                            className="formInput"
                            placeholder="********" 
                            type="password"
                            ref={passwordConfirmRef}
                            required />
                        </div>

                        <button className="formBtn">
                            { loading ? '...' : 'Register'}
                        </button>

                    </form>

                    {/* footer */}
                    <div className="card__footer">
                        <p className="card__subtext">Already have an account? <Link to="/login" className="card__link">Login</Link> as an existing user.</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;
  