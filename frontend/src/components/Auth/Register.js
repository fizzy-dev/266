import React, { useState } from 'react';
import './../../styles/login.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


function Login(props) {
    const [registerForm, setRegisterForm] = useState({
        email: '',
        username: '',
        password: '',
        confirmpassword: ''
    })


    const handleRegisterFormChange = (event) => {
        setRegisterForm({ ...registerForm, [event.target.name]: event.target.value })
    }

    function handleSignupClick(e) {
        e.preventDefault();
        //ngawn reload

        console.log(registerForm);

        //set cac gia tri ve rong
        setRegisterForm({
            email: '',
            username: '',
            password: '',
            confirmpassword: ''
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
                            <form className="form" id="form" onSubmit={handleSignupClick}>
                                <div className="form-div">
                                    <div className="f-row login-block">
                                        <label className="login-label" htmlFor="form">
                                            <span className="login-label-span" />
                                            <input className="login-label-input" type="text" name="email" placeholder="Your email" value={registerForm.email} onChange={handleRegisterFormChange} />
                                        </label>
                                    </div>
                                    <div className="f-row login-block">
                                        <label className="login-label" htmlFor="form">
                                            <span className="login-label-span" />
                                            <input className="login-label-input" type="text" name="username" placeholder="Username" value={registerForm.username} onChange={handleRegisterFormChange} />
                                        </label>
                                    </div>
                                    <div className="f-row password-block">
                                        <div className="row-block">
                                            <label className="password-label" htmlFor="form">
                                                <span className="password-label-span" />
                                                <input className="password-label-span" type="password" name="password" placeholder="Password" value={registerForm.password} onChange={handleRegisterFormChange} />
                                            </label>
                                        </div>
                                    </div>
                                    <div className="f-row password-block">
                                        <div className="row-block">
                                            <label className="password-label" htmlFor="form">
                                                <span className="password-label-span" />
                                                <input className="password-label-span" type="password" name="confirmpassword" placeholder='Confirm password' value={registerForm.confirmpassword} onChange={handleRegisterFormChange} />
                                            </label>
                                        </div>
                                    </div>
                                    <div className="f-row btn-submit">
                                        <button type="submit">Sign up</button>
                                    </div>
                                    {/* <a className="fogotpas" href="#">Forgot password?</a> */}
                                </div>
                            </form>
                        </div>
                        <div className="form-block signup">
                            <div className="signup__block">
                                <p className="signup__span">Already have an account?
                                    {/* <a href className="signup__link">Sign Up</a> */}
                                    <Link to="/Login">Log in</Link>
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