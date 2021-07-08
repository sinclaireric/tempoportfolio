
import React, { useState } from 'react';
import logo from '../logo.svg';


import {Input, Menu,Dropdown } from 'antd';

import {useHistory} from "react-router";

import { PlusOutlined, CaretDownOutlined, LogoutOutlined} from '@ant-design/icons';

import notif from './notif.svg'
import {useAppContext} from "../libs/contextLib";
import { Auth } from "aws-amplify";


export default function  Header ({show}) {

 const [loading,setLoading] = useState(false)
    const { username } = useAppContext();

    const history = useHistory()


    async function logout () {
        try {
            localStorage.removeItem('token')
            history.push('/login')
            await Auth.signOut();
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }

    const goAdmin = () => {
        history.push('/admin')
    }



    const menu = (
        <Menu style={{width:'200px'}} >
            <Menu.Item key="0" className="flex itemcenter" onClick={goAdmin} >


            <div className="  itemcenter flex">

<div className="btnaction btnsmall br50 u-mar-right-s justcenter itemcenter flex ">


    <PlusOutlined style={{color:'#000', fontSize:'20px'}}/>



</div>
<span className="av-heavy fs14">Backoffice</span>

</div>

            </Menu.Item>
            <Menu.Divider />

         



            <Menu.Item key="1" class="flex itemcenter rad8 u-pad-vertical-s" onClick={logout}>

                <div className="  itemcenter flex">

                    <div className="btnaction btnsmall br50 u-mar-right-s justcenter itemcenter flex ">


                        <LogoutOutlined style={{color:'#000', fontSize:'20px'}}/>



                    </div>
                    <span className="av-heavy fs14">Déconnexion</span>

                </div>




            </Menu.Item>

        </Menu>
    );


 





    return (





                <div className="header  flex justbtw u-pad-horizontal-s fixed w100 itemcenter">
                    <div className="flex itemcenter">
                        <a href="https://tempo-video.com" target='_blank' >
                    <img src={logo} className="w40 "/>
                    </a>
                    <a href="https://tempo-video.com" style={{marginLeft:15,color:'#1a1b1f', fontSize:'14px'}} target='_blank' >
                    Accueil
                    </a>

                    </div>
                   <div className="flex itemcenter">

{show &&
                       <Dropdown overlay={menu} class="cursor" trigger={['click']}>
                                <div className="flex itemcenter cursor">
                                    <span className="fs12 fW600 u-mar-right-xs"> Administration </span>
                                    <span style={{marginTop:'4.5px'}}>
                                        <CaretDownOutlined />
                                    </span>
                                </div>


                           </Dropdown>
                        }
                   </div>
                </div>



            );


}
