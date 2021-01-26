
import React, { useState,Fragment } from 'react';

import logo from '../../logo.svg';
import {Form, Input, Button, message} from 'antd';
import {Link} from "react-router-dom";
import axios from "axios";
import {URL} from "../../urlapi";
import  './sign.css';
import {useHistory} from "react-router";


export default function  Login () {

    const [loading,setLoading] = useState(false)
    const history = useHistory()



    async function onSubmit ( values )  {

        try {
            setLoading(true)
            const result = await axios.post(URL + '/api/user/login',
                values
            )
            const serializedState = JSON.stringify(result.data)
            localStorage.setItem('user',serializedState )
            history.push("/");
            message.success('Connexion réussie!!')
            setLoading(false)

        } catch(e) {
            setLoading(false)
            message.warning('Erreur connexion!')

        }

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
                        type:'email',
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

            <div className="fl-r w100 u-mar-bottom-l av-roman " style={{textAlign:'right'}}><Link to={'/reset'} className="login-form-forgot fs12" >
                Mot de passe oublié ?
            </Link>
            </div>





            <Form.Item className="w100">
                <Button type="primary" htmlType="submit" size="large" loading={loading}  className="rad8 w100">
                    <span className="fs18 av-heavy">   Connexion </span>
                </Button>
            </Form.Item>



            <div className="fl-r w100 u-mar-bottom-l av-roman" style={{textAlign:'center'}}>
                je n'ai pas de compte !
                <Link to={'/register'} className="login-form-forgot fs12 u-mar-left-xs" >
                    crééer gratuitement un compte
                </Link>
            </div>


        </Form>



        </div>

        </Fragment>
            );


}
