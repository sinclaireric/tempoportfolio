
import React, {useEffect, useState} from 'react';
import moment from 'moment';
import 'moment/locale/fr';

import Header from '../header';
import LeftSide from '../sider/sider'
import {Button, Layout,Drawer,Select,Spin, Menu,Tag, Table,Input} from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import Formcategory from './form/formcategory';
import axios from "axios";
import {URL} from "../../urlapi";
import { Link } from "react-router-dom";


const {  Content } = Layout;
export default function  Employes () {

    const [loading,setLoading] = useState(true)
    const [reload,setReload] = useState(1)
    const [visible,setVisible] = useState(false)
    const token = JSON.parse(localStorage.getItem('user')).token;

    const [categories,setCategories] = useState(null)



    useEffect(() => {


        const getCategories= async () => {


            const result = await axios.get(URL+'/api/category/all', {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })

            setCategories(result.data);
            setLoading(false)
        };




        getCategories();


    }, [reload]);


    const close = () => {

        setVisible(false)
        setReload(reload+1)

    }



    const columns = [


        {
            title: 'Nom',
            dataIndex: 'name',
            width: 200,
        },

        {
            title: 'Parent',
            dataIndex: 'parentid',
        },

        {
            title: 'Description',
            dataIndex: 'description',
        },



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
                            <div className="bmc-dash-pill p-relative  cursor rel">
                                <span className=" xs-text-fs-14 av-heavy color-6E6 fs18">Produits</span>
                                <Link to={'/products'} className="ab-link t-0">
                                </Link>
                            </div>


                                <div className="bmc-dash-pill  cursor  bmc-dash-pill-active  rel">
                                    <span className=" xs-text-fs-14 av-heavy color-6E6 fs18">Catégories</span>
                                    <Link to={'/products/category'} className="ab-link t-0">
                                      </Link>
                                </div>

                                <div className="bmc-dash-pill p-relative cursor-pointer  cursor rel">
                                    <span className=" xs-text-fs-14 av-heavy color-6E6 fs18">Fournisseurs</span>
                                    <Link to={'/products/supplier'} className="ab-link t-0">
                                    </Link>
                                </div>


                                <div className="bmc-dash-pill   cursor rel">
                                    <span className=" xs-text-fs-14 av-heavy color-6E6 fs18">Marques</span>
                                    <Link to={'/products/brand'} className="ab-link t-0">
                                    </Link>
                                </div>

                            </div>

                            <Spin tip="Chargment..." size="large" spinning={loading }>

                            <div className="grille w100  u-pad-top-s u-pad-horizontal-s u-mar-top-m   blok noshadow noborder hauto rad16 u-mar-top-xl-res nopadres noradres ">


                                <div className="flex justbtw u-mar-bottom-s">

                                <div>

                                    <Input placeholder="Rechercher dans la table" style={{minWidth:'250px',height:'35px!important'}} />

                                </div>

                                    <Button type="primary" size="large"  className="rad8" onClick={()=>setVisible(true)}>
                                    <span className="fs18 av-heavy">  Ajouter une categorie </span>
                                </Button>


                                    <Drawer

                                        width={450}
                                        onClose={()=>setVisible(false)}
                                        visible={visible}
                                        bodyStyle={{ paddingBottom: 0,paddingTop:12 }}
                                        destroyOnClose={true}

                                    >

                                     <Formcategory close={close} categories={categories != null && categories.filter(u=>u.parentId == null)}/>

                                    </Drawer>



                                </div>

                                <Table columns={columns} dataSource={categories} size="default" pagination={{showSizeChanger:false,size:"small"}} showSizeChanger={false}  />,


                            </div>

                            </Spin>


                        </div>


                    </Content>
                </Layout>
            </Content>
        </Layout>



    );


}
