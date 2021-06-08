
import React, { useState,Fragment } from 'react';

import logo from '../../logo.svg';
import {Form, Input, Button, message} from 'antd';
import {Link} from "react-router-dom";
import axios from "axios";
import {URL} from "../../urlapi";
import {useHistory} from "react-router";
import { Auth } from "aws-amplify";
import  './sign.css';
import {useAppContext} from "../../libs/contextLib";
import jwt_decode from "jwt-decode";


export default function  Login () {

    const [loading,setLoading] = useState(false)
    const history = useHistory()
    const { setUsername } = useAppContext();
    const { setPermissions } = useAppContext();


    const onSubmit = ( values ) =>  {



            setLoading(true)


            Auth.signIn(values.email,values.password)
                .then(user => {


                    localStorage.setItem("token", user.signInUserSession.idToken.jwtToken);

                    const decoded = jwt_decode(user.signInUserSession.idToken.jwtToken);
                    // set permissions and username here
                    setUsername(decoded["cognito:username"])

                    history.push("/tempoadmin");
                    message.success('Connexion réussie!!')

                    setLoading(false)


                }).catch(e => {
            setLoading(false)
            console.log('error signing in:', e);

            message.warning('Erreur connexion!')

        })

    }





    return (


        <Fragment>



        <div className="flex column w100 h100  justcenter itemcenter" >


        <Form
            name="normal_login"
            className="login-form w35 bgwhite  u-pad-horizontal-l u-pad-top-l rad8 z999"
            size="large"
            initialValues={{
                remember: true,
            }}
            onFinish={onSubmit}
        >

            <img src={logo} className="w22 u-mar-bottom-sm"/>

            <h1 className="av-heavy fs30 u-mar-bottom-l coltext" > Connexion</h1>
            <Form.Item
                name="email"
                rules={[
                    {
                        //type:'email',
                        required: true,
                        message: 'Inserer votre email',
                    },
                ]}
                className="u-mar-bottom-m"
            >
                <Input  placeholder="Email"  />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Inserer votre mot de passe!',
                    },
                ]}
                className="u-mar-bottom-xs"
            >
                <Input

                    type="password"
                    placeholder="Mot de passe"

                />
            </Form.Item>

            <div className="fl-r w100 u-mar-bottom-l av-roman " style={{textAlign:'right'}}>
            </div>





            <Form.Item className="w100">
                <Button type="primary" htmlType="submit" size="large" loading={loading}  className="rad8 w100">
                    <span className="fs18 av-heavy">   Connexion </span>
                </Button>
            </Form.Item>



           


        </Form>



        </div>

        </Fragment>
            );


}
