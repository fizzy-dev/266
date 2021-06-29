import React, { useState, useContext } from 'react';
import './../../styles/login.css';
import { Link, useHistory } from 'react-router-dom';

import { AuthContext } from '../../contexts/authContext';


function Login(props) {
    //LocalState
    const [loginForm, setLoginForm] = useState({
        username: '',
        password: ''
    })
    //context
    const { loginUser } = useContext(AuthContext);

    // const history = useHistory();

    const handleLoginFormChange = (event) => {
        setLoginForm({ ...loginForm, [event.target.name]: event.target.value })
    }

    const handleSubmitLoginForm = async (e) => {
        // chan reload trang khi submit
        e.preventDefault()
        const loginData = await loginUser(loginForm)
        if (loginData.success) {
            // history.push('/feeds') //redirect to home
        } else {

        }

        setLoginForm({
            username: '',
            password: ''
        })
    }

    return (
        <div className="wrapper flex">
            {/*     MAIN */}
            <main className="main">
                <article className="section flex">
                    <div className="phones">
                        <div className="slider-img">
                            <img className="img" src="https://www.instagram.com/static/images/homepage/screenshot1-2x.jpg/9144d6673849.jpg" alt="" />
                            {/*             <div class="imgd"></div> */}
                        </div>
                    </div>
                    <div className="form-section">
                        <div className="form-block header-logo">
                            <h1>Instagram</h1>
                            <form className="form" id="form" onSubmit={handleSubmitLoginForm}>
                                <div className="form-div">
                                    <div className="f-row login-block">
                                        <label className="login-label" htmlFor="form">
                                            <span className="login-label-span" />
                                            <input className="login-label-input" type="text" name="username" value={loginForm.username} onChange={handleLoginFormChange} placeholder="Username" />
                                        </label>
                                    </div>
                                    <div className="f-row password-block">
                                        <div className="row-block">
                                            <label className="password-label" htmlFor="form">
                                                <span className="password-label-span" />
                                                <input className="password-label-span" type="password" name='password' value={loginForm.password} onChange={handleLoginFormChange} placeholder="Password" />
                                            </label>
                                        </div>
                                    </div>
                                    <div className="f-row btn-submit">
                                        <button type="submit">Log In</button>
                                    </div>
                                    {/* <div className="f-row or-block flex">
                                        <div className="line" />
                                        <div className="or">or</div>
                                        <div className="line" />
                                    </div>
                                    <div className="f-row fb-btn-block">
                                        <button className="fb-btn" type="button">
                                            <span className="fb-logo" />
                                            <span className="enter">Log In with Facebook</span>
                                        </button>
                                    </div> */}


                                    <a className="f-row fogotpas" href="#">Forgot password?</a>
                                </div>
                            </form>
                        </div>
                        <div className="form-block signup">
                            <div className="signup__block">
                                <p className="signup__span">Don't have an account?
                                    {/* <a href className="signup__link">Sign Up</a> */}
                                    <Link to="/register">Sign up</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </article>
            </main>
            {/*     FOOTER */}
            <footer className="footer">
            </footer>
        </div>
    );
}

export default Login;