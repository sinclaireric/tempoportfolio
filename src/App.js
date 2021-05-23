import React, { useState,useEffect } from 'react';
import {
    Route,
    Switch,
    Redirect,BrowserRouter as Router,
} from 'react-router-dom';

import { AppContext } from "./libs/contextLib";


import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';

import Login from "./components/sign/Login"
import Register from "./components/sign/Signup"
import Products from "./components/video/video";
import Home from "./components/home/home";


import 'antd/dist/antd.css';
import './App.css';
Amplify.configure(awsconfig)

      function Base  () {

          const [username,setUsername] = useState()
          const [permissions,setPermissions] = useState()


          const isAuth = () => localStorage.getItem("token") != null



          const PrivateRoute = ({ component: Component, ...rest }) => (
              <Route {...rest} render={props => {
                  return isAuth()
                      ? <Component {...props}/>
                      : <Redirect to={{
                          pathname: '/login',
                          state: { from: props.location }
                      }}/>
              }}/>
          )







          return(

              <div className="hv100" style={{overflowY:'scroll'}}>




                  <Router>

                      <AppContext.Provider value={{setUsername,username,permissions,setPermissions}}>

                      <Switch>
                          <Route exact path="/" component={Home}/> 
                          <PrivateRoute exact path="/admin" component={Products}/>
                          <Route exact path="/login" component={Login}/>
                          <Route exact path="/register" component={Register}/>


                      </Switch>

                      </AppContext.Provider>
                  </Router>


              </div>

          )
      }

    export default Base;


