
import React, {Fragment, useEffect, useState} from 'react';
import moment from 'moment';
import 'moment/locale/fr';

import Header from '../header';
import LeftSide from '../sider/sider'
import {Button, Layout,Drawer,Select,Spin,Modal, Menu,Tag, Table,Input} from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import Formemploye from '../employes/form';
import simple from './images/simple_product.png';
import variant from './images/variant_product.png';
import combo from './images/bundle_product.png';
import axios from "axios";
import {URL} from "../../urlapi";
import { Link } from "react-router-dom";
import noneimg from "./images/product-none.png";

const {  Content } = Layout;
export default function  Employes () {

    const [loading,setLoading] = useState(true)
    const [reload,setReload] = useState(1)
    const [visible,setVisible] = useState(false)
    const [visibleModal,setVisibleModal] = useState(false)
    const token = JSON.parse(localStorage.getItem('user')).token;

    const [products,setProducts] = useState(null)



    useEffect(() => {


        const getProducts= async () => {


            const result = await axios.get(URL+'/api/product/all', {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })

            setProducts(result.data);
            setLoading(false)
        };




        getProducts();


    }, [reload]);






    const columns = [

        {
            title: '',
            dataIndex: '',
            width: 50,
            render: text =>
                <>
<img src={noneimg} width="40" height="40" />
                </>

        },
        {
            title: 'Designation',
            dataIndex: 'designation',
            width: 150,
        },
        {
            title: 'Prix vente',
            dataIndex: 'salePrice',
            width: 150,
        },
        {
            title: "Prix d'achat",
            dataIndex: 'suplyPrice',
            width: 150,
        },
        {
            title: 'Stock',
            dataIndex: 'inStock',
        },
        {
            title: 'Catégorie',
            dataIndex: 'category',
            render: category => (
                <>


                                {category.name}

                </>
            ),
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
                            <div className="bmc-dash-pill p-relative cursor-pointer bmc-dash-pill-active cursor rel">
                                <span className=" xs-text-fs-14 av-heavy color-6E6 fs18">Produits</span>
                                <Link to={'/products'} className="ab-link t-0">
                                </Link>
                            </div>


                                <div className="bmc-dash-pill p-relative cursor-pointer  cursor rel">
                                    <span className=" xs-text-fs-14 av-heavy color-6E6 fs18">Categories</span>
                                    <Link to={'/products/category'} className="ab-link t-0">
                                      </Link>
                                </div>

                                <div className="bmc-dash-pill p-relative cursor-pointer  cursor rel">
                                    <span className=" xs-text-fs-14 av-heavy color-6E6 fs18">Fournisseurs</span>
                                    <Link to={'/products/supplier'} className="ab-link t-0">
                                    </Link>
                                </div>


                                <div className="bmc-dash-pill p-relative cursor-pointer  cursor rel">
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

                                    <Button type="primary" size="large"  className="rad8" onClick={()=>setVisibleModal(true)}>
                                    <span className="fs18 av-heavy">  Ajouter un produit </span>
                                </Button>


                                    <Drawer

                                        width={450}
                                        onClose={()=>setVisible(false)}
                                        visible={visible}
                                        bodyStyle={{ paddingBottom: 0,paddingTop:12 }}
                                        destroyOnClose={true}

                                    >

                                      {/*<Formemploye roles={roles} branches={branches} close={close}/>*/}

                                    </Drawer>



                                    <Modal

                                        width={850}
                                        onCancel={()=>setVisibleModal(false)}
                                        visible={visibleModal}
                                        bodyStyle={{ paddingBottom: 0,paddingTop:12}}
                                        destroyOnClose={true}
                                        closable={false}
                                        footer=""
                                        className={"trans"}
                                        maskClosable={true}

                                    >


                                        <Fragment>

                                        <h2 className="av-heavy" style={{color:'white'}}>type de produit </h2>

                                        <div className="flex itemcenter justcenter wrap  justbtw h100 rescolumn ">


                                            <Link to={'/products/new/basic'}  className="typeproduit flex column u-mar-bottom-s-res basis31 rad8 u-pad-l bgwhite" >

                                                <img src={simple} style={{height:80}} />
                                                <h3 className=" av-heavy u-mar-top-xs"> Produit Basique </h3>

                                                <p className="collab center lightfibra nomar"> Créer un produit qui sera vendu individuelement </p>
                                            </Link>

                                            <div className="typeproduit u-mar-bottom-s-res basis31 rad8 u-pad-l bgwhite" >

                                                <img src={variant} style={{height:80}} />


                                                <h3 className="av-heavy u-mar-top-xs"> Produit avec variantes </h3>

                                                <p className="collab center lightfibra nomar"> Créer un produit avec de multiple taille, coleur... </p>

                                            </div>

                                            <div className="typeproduit basis31 rad8 u-pad-l bgwhite" >

                                                <img src={combo} style={{height:80}} />

                                                <h3 className="av-heavy u-mar-top-xs"> Produit composé </h3>

                                                <p className="collab center lightfibra nomar"> Créer un produit composés d'autres(cocktail,pack...) </p>

                                            </div>





                                        </div>

                                        </Fragment>




                                    </Modal>

                                </div>

                                <Table columns={columns} dataSource={products} size="default" pagination={{showSizeChanger:false,size:"small"}} showSizeChanger={false}  />,


                            </div>

                            </Spin>


                        </div>


                    </Content>
                </Layout>
            </Content>
        </Layout>



    );


}
