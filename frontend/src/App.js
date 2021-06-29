import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { useState } from 'react'
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Auth from './views/Auth';
import AuthContextProvider from './contexts/authContext';
import Home from './components/App/Home'
import ProtectedRoute from './components/routing/ProtectedRoute';


function App() {
  const [currentUser, setCurrentUser] = useState(null);
  return (
    <AuthContextProvider>
      <Router>
        <Switch>
          <Route path="/login" render={props => <Auth authRoute="login"></Auth>}></Route>
          <Route path="/register" render={props => <Auth authRoute="register"></Auth>}></Route>
          <ProtectedRoute path='/feeds' render={props => (<Home></Home>)}></ProtectedRoute>
        </Switch>
      </Router>
    </AuthContextProvider>
  );
}

export default App;