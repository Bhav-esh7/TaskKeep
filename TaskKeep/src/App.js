import React from 'react';
import './App.css';
import Signup from './components/Signup';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute'; 
import { AuthProvider } from './context/AuthContext';
import { Switch , Route } from 'react-router-dom';
import BaseComp from './BaseComp';
import ForgotPassword from './components/ForgotPassword';

const App = () => {
  
  return(
    <>
      <AuthProvider>
        <Switch>
          <Route exact path="/" component = {Login} />
          <Route path="/signup" component = {Signup} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <PrivateRoute path="/basecomp" component={BaseComp} />
        </Switch>
      </AuthProvider>
    </>
  )
}

export default App;