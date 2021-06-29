import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router';
import { AuthContext } from '../../contexts/authContext';
import Spinner from 'react-bootstrap/esm/Spinner';


function ProtectedRoute(props) {
    const { path, render } = props
    const { authState: { authLoading, isAuthenticated } } = useContext(AuthContext)

    const renderProtectedRoute = () => {
        if (authLoading) {
            return (
                <div className="d-flex justify-content-center mt-2">
                    <Spinner animation='border' variant='info'></Spinner>
                </div>
            )
        } else {
            if (!isAuthenticated) {
                return <Redirect to='/login'></Redirect>
            } else {
                return (
                    <Route path={path} render={render}></Route>)
            }
        }
    }

    return (
        <div>
            {renderProtectedRoute()}
        </div>
    );
}

export default ProtectedRoute;