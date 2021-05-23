
import React, { useState} from 'react';
import jwt_decode from "jwt-decode";
import logo from '../../logo.svg';
import { Form,Row,Col,message, Input, Button,Select} from 'antd';
import axios from "axios";

import {useHistory} from "react-router";
import {URL} from '../../urlapi';
import { useAppContext } from "../../libs/contextLib";

import {Link} from "react-router-dom";
import { Auth } from "aws-amplify";


export default function  Login () {


    const [loading,setLoading] = useState(false)
    const history = useHistory()
    const { setUsername } = useAppContext();
    const { setPermissions } = useAppContext();


    const {Option} = Select;
    const [form] = Form.useForm();





   async function onSubmit ( values )  {


if(!loading) {

       try {
           setLoading(true)

           const { user } = await Auth.signUp({
               username:values.email,
               password:values.password,
               attributes: {
                   email:values.email,          // optional
                   phone_number:values.phone,   // optional - E.164 number convention
                   // other custom attributes
               },
               clientMetadata: {
                   businessType: values.businessType,
                   businessName: values.businessName,
                   firstName:values.firstname,
                   lastName:values.lastname,

               }
           });





           Auth.signIn(values.email,values.password)
               .then(user => {


                   localStorage.setItem("token", user.signInUserSession.idToken.jwtToken);

                   const decoded = jwt_decode(user.signInUserSession.idToken.jwtToken);
                   // set permissions and username here

                   setUsername(decoded["cognito:username"])

                   history.push("/");
                   message.success('Inscription réussie!!')

                   setLoading(false)

               }).catch(e => {
               setLoading(false)
               console.log('error signing in:', e);

               message.warning('Erreur connexion!')

           })




       } catch (error) {
           setLoading(false)

           console.log('error signing up:', error);
       }

}


    }



    return (

        <div className="flex column w100 h100  itemcenter justcenter ">
        <Form
            name="normal_login"
            className="login-form w35 bgwhite  u-pad-horizontal-l u-pad-top-s rad8 z999"
            size="large"
            form={form}
            initialValues={{
                remember: true,
            }}
            onFinish={onSubmit}
        >


<div className="flex justbtw itemcenter">
            <h1 className="av-heavy fs24 u-mar-bottom-s coltext grille25" > Crééer un compte</h1>

            <img src={logo} className="w15 u-mar-bottom-xs grille"/>

</div>
            <Row gutter={24}>
                <Col span={12}>
            <Form.Item
                name="firstname"
                rules={[
                    {
                        required: true,
                        message: 'Inserer votre nom',
                    },
                ]}
                className="u-mar-bottom-m"
            >
                <Input  placeholder="Nom"   />
            </Form.Item>

                </Col>

                <Col span={12}>
                <Form.Item
                    name="lastname"

                    className="u-mar-bottom-m"
                >
                    <Input  placeholder="Prénom"   />
                </Form.Item>
                </Col>

            </Row>




            <Form.Item
                name="phone"
                rules={[
                    {
                        required: true,
                        message: 'Inserer votre numéro de telephone',
                    },
                ]}
                className="u-mar-bottom-m"
            >
                <Input  placeholder="Télephone" maxLength={25} />
            </Form.Item>


            <Form.Item
                name="businessName"
                rules={[
                    {
                        required: true,
                        message: 'Inserer le nom de votre entreprise',
                    },
                ]}
                className="u-mar-bottom-m"
            >
                <Input  placeholder="Nom de votre boutique"  />
            </Form.Item>




            <Form.Item
                name="businessType"
                rules={[
                    {
                        required: true,
                        message: 'Inserer le type de votre activié',
                    },
                ]}
                className="u-mar-bottom-m"
            >
                <Select placeholder="Type de business" >

                    <Option value="Boutique généraliste"> Boutique généraliste</Option>
                    <Option value="Boutique ecommerce"> Boutique ecommerce</Option>
                    <Option value={"Institut de beauté"}>Institut de beauté  </Option>
                    <Option value={"Pressing"}> Pressing </Option>
                    <Option value={"Restaurant/Cafe"}> Restaurant/Cafe </Option>
                    <Option value={"Pizerria"}> Pizerria </Option>
                    <Option value={"Prêt à porter"} > Prêt à porter </Option>
                    <Option value="Autres">Autres </Option>

                </Select>
            </Form.Item>



            <Form.Item
                name="email"
                rules={[
                    {
                        type:'email',
                        required: true,
                        message: 'Insérer un email correcte',
                    },
                ]}
                className="u-mar-bottom-m"
            >
                <Input  placeholder="Email"   />
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






            <Form.Item className="w100 u-mar-top-l u-mar-bottom-xxs">
                <Button type="primary" htmlType="submit" size="large"  loading={loading}  className="rad8 w100">
                    <span className="fs18 av-heavy">  S'inscrire maintenant </span>
                </Button>
            </Form.Item>


        </Form>

            <div className="fl-r w100  av-roman fs10" style={{textAlign:'center'}}>
                En vous inscrivant vous acceptez les
                <a className="login-form-forgot fs12" href="">
                conditions d'utilisation
            </a>
            </div>

            <div className="fl-r w100 u-mar-top-s av-roman coltext" style={{textAlign:'center'}}>
                Déja inscrit ?
                <Link to={'/login'} className="login-form-forgot fs12" >
                    Se connecter
                </Link>
            </div>

        </div>

            );


}
