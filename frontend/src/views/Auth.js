import React from 'react';
import Login from '../components/Auth/Login'
import Register from '../components/Auth/Register'
import { useContext } from 'react';
import { AuthContext } from '../contexts/authContext';
import { Redirect } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner'


function Auth(props) {
    const { authRoute } = props

    const { authState: { authLoading, isAuthenticated } } = useContext(AuthContext)
    const renderAuth = () => {
        if (authLoading) {
            return (
                <div className="d-flex justify-content-center mt-2">
                    <Spinner animation='border' variant='info'></Spinner>
                </div>
            )
        } else {
            if (isAuthenticated) {
                return <Redirect to='/feeds'></Redirect>
            } else {
                return (
                    < div >
                        {authRoute === 'login' && <Login></Login>}
                        {authRoute === 'register' && <Register></Register>}
                    </div >
                )
            }
        }
    }
    return (
        <div>
            {renderAuth()}
        </div>
    );
}

export default Auth;