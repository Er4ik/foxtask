import './Login.scss';
import Logo from '../assets/logo_white_alt.svg';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/ducks/auth';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const emailRef = useRef();
    const passwordRef = useRef();
    const dispatch = useDispatch();

    const loginError = useSelector(state => state.auth.loginError);
    const loginSuccess = useSelector(state => state.auth.loginSuccess);

    const handleLogin = () => {
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        dispatch(login({ email, password }));
    };

    useEffect(() => {
        if (loginSuccess) {
            setTimeout(() => navigate('/'), 1000);
        }
    }, [loginSuccess]);

    return (
        <div className="login">
            <div className={`display__none ${loginError ? 'login__error': ''} ${loginSuccess ? 'login__success' : ''}`}>
                { loginError ? loginError.response.data.message : '' }
                { loginSuccess ? 'Successfully logged in' : '' }
            </div>
            <div className="login__modal">
                <img width={64} alt="Logo" src={Logo} />
                <div className="login__title">Login</div>

                <label for="email" className="login__label">Email</label>
                <input type="text" name="email" ref={emailRef} className="login__input" />

                <label for="password" className="login__label">Password</label>
                <input type="password" name="password" ref={passwordRef} className="login__input" />

                <button className="login__button" onClick={handleLogin}>Log in</button>

                <div className="login__signup">Don't have an account? <Link to="/signup">Sign up</Link></div>
            </div>
        </div>
    );
};

export default Login;