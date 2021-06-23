import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import React, { useState } from 'react'
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

function App() {
  const [currentUser,setCurrentUser]= useState(null);
  return (
    <Router>
      <div className="App">
        {/* <Route path="/" exact component={ }></Route> */}
        <Route path="/login" component={Login}></Route>
        <Route path="/signup" component={Register}></Route>
      </div>

    </Router>
  );
}

export default App;