
import React, { useState} from 'react';

import logo from '../../logo.svg';
import { Form,Row,Col,message, Input, Button,Select} from 'antd';
import axios from "axios";

import {useHistory} from "react-router";
import {URL} from '../../urlapi';

import {Link} from "react-router-dom";


export default function  Login () {


    const [loading,setLoading] = useState(false)
    const history = useHistory()


    const {Option} = Select;
    const [form] = Form.useForm();





   async function onSubmit ( values )  {


       console.log(values)



       try {
           setLoading(true)
           const result = await axios.post(URL + '/api/staff/create-start',
               values
           )
           const serializedState = JSON.stringify(result.data)
           localStorage.setItem('user',serializedState )
           history.push("/");
           message.success('Enregistrement réussi!!')
           setLoading(false)

       } catch(e) {
           setLoading(false)
           message.warning('Erreur enregistrement!')

       }

    }



    return (

        <div className="flex column w100 h100  itemcenter ">
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

            <img src={logo} className="w22 u-mar-bottom-s"/>

            <h1 className="av-heavy fs30 u-mar-bottom-s coltext" > Crééer un compte</h1>

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
