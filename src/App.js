import React, { useState } from 'react';
import {
    Route,
    Switch,
    Redirect,BrowserRouter as Router,
} from 'react-router-dom';


import Login from "./components/sign/Login"
import Register from "./components/sign/Signup"
import Reset from "./components/sign/reset"
import Home from "./components/home"
import Employes from "./components/employes/employes"
import EmployesRoles from "./components/employes/roles"

import Products from "./components/product/product";
import AddBasicProducts from "./components/product/addbasicproduct";


import Category from "./components/product/category";

import 'antd/dist/antd.css';
import './App.css';

      function Base  () {

          const [isAuthenticated, userHasAuthenticated] = useState(false);
          const [isAuthenticating, setIsAuthenticating] = useState(true);
          const [email,setEmail] = useState()
          const [firstName,setFirstName] = useState()


          const isAuth = () => localStorage.getItem("user") != null

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





          /* useEffect(() => {
               onLoad();
           }, []);
 */


          return(

              <div className="hv100" style={{overflowY:'scroll'}}>




                  <Router>





                          <Switch>

                              <PrivateRoute exact path="/" component={Home}/>

                              <PrivateRoute exact path="/employes" component={Employes}/>
                              <PrivateRoute exact path="/employes/roles" component={EmployesRoles}/>

                              <PrivateRoute exact path="/products" component={Products}/>
                              <PrivateRoute exact path="/products/new/basic" component={AddBasicProducts}/>

                              <PrivateRoute exact path="/products/category" component={Category}/>

                              <Route exact path="/login" component={Login}/>
                              <Route exact path="/register" component={Register}/>
                              <Route exact path="/reset" component={Reset}/>


                          </Switch>

                  </Router>



              </div>

          )
      }

    export default Base;


