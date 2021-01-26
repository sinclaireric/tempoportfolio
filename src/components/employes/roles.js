
import React, {useEffect, useState} from 'react';
import moment from 'moment';
import 'moment/locale/fr';
import { Link } from "react-router-dom";

import Header from '../header';
import LeftSide from '../sider/sider'
import {Button, Layout,Drawer,Select,Spin, Menu,Tag, Table,Input} from 'antd';
import Formrole from './formrole';
import axios from "axios";
import {URL} from "../../urlapi";


const {  Content } = Layout;
const {Option} = Select;

export default function  Employes () {

    const [loading,setLoading] = useState(true)
    const [reload,setReload] = useState(1)
    const [visible,setVisible] = useState(false)
    const token = JSON.parse(localStorage.getItem('user')).token;

    const [roles,setRoles] = useState(null)



    useEffect(() => {


        const getRoles = async () => {


            const result = await axios.get(URL+'/api/roles/all', {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })

            setRoles(result.data);
            setLoading(false)
        };




        getRoles();


    }, [reload]);



    const close = () => {

        setVisible(false)
        setReload(reload+1)

    }

    const columns = [


        {
            title: 'Role',
            dataIndex: 'name',
            width: 150,
        },
        {
            title: 'Description',
            dataIndex: 'description',
        }
    ];







    return (





        <Layout className=" bgapp">
            <Header />

            <Content style={{ padding: '0 100px' }} className="u-mar-top-xl">

                <Layout className="bgapp" >
                    <LeftSide />
                    <Content style={{ padding: '0 0 24px 24px'}}>


                        <div className="flex column">


                            {/*<h1 className="fs30 color-0d0 av-heavy u-mar-top-xs ">Employes</h1>*/}

                            <div className="flex u-mar-top-xs">
                            <div className="bmc-dash-pill   cursor rel">
                                <span className=" xs-text-fs-14 av-heavy color-6E6 fs18">Employes</span>
                                <Link to={'/employes'} className="ab-link t-0">
                                </Link>
                            </div>


                                <div className="bmc-dash-pill  bmc-dash-pill-active  cursor rel">
                                    <span className=" xs-text-fs-14 av-heavy color-6E6 fs18">Roles</span>
                                    <Link to={'/employes/roles'} className="ab-link t-0">
                                      </Link>
                                </div>

                                <div className="bmc-dash-pill  cursor rel flex">
                                    <span className=" xs-text-fs-14 av-heavy color-6E6 fs18">Emploi de temps</span>
                                    <Link to={'/employes/roles'} className="ab-link t-0">
                                    </Link>

                                    <div
                                        className="beta-tag fs12 av-book color-6e6 grey-bg-dim rad16 flex justcenter itemcenter u-mar-left-xs">SOON
                                    </div>
                                </div>

                            </div>

                            <Spin tip="Chargment..." size="large" spinning={loading}>

                            <div className="grille w100  u-pad-top-s u-pad-horizontal-s u-mar-top-m   blok noshadow noborder hauto rad16 u-mar-top-xl-res nopadres noradres ">


                                <div className="flex justbtw u-mar-bottom-s">

                                <div>

                                    <Input placeholder="Rechercher dans la table" style={{minWidth:'250px',height:'35px!important'}} />

                                </div>

                                    <Button type="primary" size="large"  className="rad8" onClick={()=>setVisible(true)}>
                                    <span className="fs18 av-heavy">  Ajouter un role</span>
                                </Button>


                                    <Drawer

                                        width={600}
                                        onClose={()=>setVisible(false)}
                                        visible={visible}
                                        bodyStyle={{ paddingBottom: 0,paddingTop:12 }}
                                        destroyOnClose={true}

                                    >

                                      <Formrole close={close} />

                                    </Drawer>



                                </div>

                                <Table columns={columns} dataSource={roles} size="default" pagination={{showSizeChanger:false,size:"small"}} showSizeChanger={false}  />,


                            </div>

                            </Spin>


                        </div>


                    </Content>
                </Layout>
            </Content>
        </Layout>



    );


}
