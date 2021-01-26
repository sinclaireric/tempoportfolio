
import React, {useEffect, useState} from 'react';
import moment from 'moment';
import 'moment/locale/fr';

import Header from '../header';
import LeftSide from '../sider/sider'
import {Button, Layout,Drawer,Select,Spin, Menu,Tag, Table,Input} from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import Formemploye from './form';
import axios from "axios";
import {URL} from "../../urlapi";
import { Link } from "react-router-dom";


const { SubMenu } = Menu;
const {  Content } = Layout;
const {Option} = Select;
export default function  Employes () {

    const [loading,setLoading] = useState(true)
    const [reload,setReload] = useState(1)
    const [loadingrole,setLoadingrole] = useState(true)
    const [loadingbranches,setLoadingbranches] = useState(true)
    const [visible,setVisible] = useState(false)
    const token = JSON.parse(localStorage.getItem('user')).token;

    const [staffs,setStaffs] = useState(null)
    const [roles,setRoles] = useState(null)
    const [branches,setBranches] = useState(null)



    useEffect(() => {


        const getStaffs = async () => {


            const result = await axios.get(URL+'/api/staff/all', {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })

            setStaffs(result.data);
            setLoading(false)
        };




        getStaffs();


    }, [reload]);


    useEffect(() => {



        const getRoles = async () => {


            const result = await axios.get(URL+'/api/roles/all', {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })

            setRoles(result.data);
            setLoadingrole(false)
        };


        const getBranches = async () => {


            const result = await axios.get(URL+'/api/branches/all', {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })

            setBranches(result.data);
            setLoadingbranches(false);
        };

        getRoles();
        getBranches();

    }, []);



    const close = () => {

        setVisible(false)
        setReload(reload+1)

    }

    const columns = [

        {
            title: '',
            dataIndex: '',
            width: 50,
            render: text =>
                <>
                    <svg viewBox="0 0 200 200" width="40" height="40"><circle fill="#F3F7FA" cx="100" cy="100" r="100"></circle><path fill="#BCC2D0" d="M141.9 128.3c-27.1-1.4-79.3-.5-97.5-.1-7.9.2-15.6 2.6-22 7.2-4 2.9-7.9 6.9-10.2 12.3C29.1 178.9 62.1 200 100 200c13.3 0 26.4-2.6 38.6-7.7 8.3-3.7 16.1-8.5 23.3-14.1 2.5-12.9 7.1-48.5-20-49.9z"></path><path fill="#E1E4EB" d="M75.3 105.5l-.3 35.7c0 2.9.6 5.8 1.8 8.5l.2.5c3.6 8.2 12.1 13.1 21 12.1 4.2-.5 8.2-2.2 11.4-5 6.2-5.4 10.1-12.9 11.2-21l1.6-11.6-46.9-19.2z"></path><path fill="#BCC2D0" d="M118.5 144.5c.7-1.5 1.4-3.8 2.2-8.3l1.6-11.6-47-19.1 16.3 22.3c3.4 4.7 7.6 8.8 12.5 12 4.2 2.8 9.4 5.2 14.4 4.7z"></path><path fill="#E1E4EB" d="M148.5 82.1c-1.8 25-10.4 69.7-45 51.6 0 0-12.3-5.2-22.7-19.1-2.9-3.9-7.1-11.5-8.7-16.1L67.7 85c-6.1-16.6-3.3-35.4 8-49.1C82 28.2 95 22.2 108 22.3c22.8.2 31.2 10.4 36.1 24 3.2 8.8 5 26.5 4.4 35.8z"></path><path fill="#BCC2D0" d="M82 96.5c-1.5-5.3-10 2.1-10 2.1.9 2.4 2 4.7 3.2 7v3.1c5.2-1.6 8.3-7 6.8-12.2z"></path><path fill="#97A0B6" d="M83.3 11.4c-28.2 7.8-44.7 37.3-36.8 65.7 4.2 15.1 14.8 27.7 29.1 34.3v-10.7l4.5-9s38.5-14.6 53.2-49.3c0 0 5.4 15.1 11.8 27.6 1.2 2.5 2.5 4.9 3.7 7.1.1-.5.3-1 .4-1.5 2.1-8.9 2-18.1-.5-26.9-7.8-28.5-37.1-45.1-65.4-37.3z"></path><circle fill="#E1E4EB" cx="77.7" cy="95.8" r="9.9"></circle></svg>

                </>

        },
        {
            title: 'Nom',
            dataIndex: 'firstname',
            width: 150,
        },
        {
            title: 'Role',
            dataIndex: ['role','name'],
            width: 150,
        },
        {
            title: 'Telephone',
            dataIndex: 'phone',
        },
        {
            title: 'Branche',
            dataIndex: 'branchs',
            render: branchs => (
                <>
                    {branchs.map(tag => {

                        return (
                            <Tag  >
                                {tag.name.toUpperCase()}
                            </Tag>
                        );
                    })}
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
                                <span className=" xs-text-fs-14 av-heavy color-6E6 fs18">Employes</span>
                                <Link to={'/employes'} className="ab-link t-0">
                                </Link>
                            </div>


                                <div className="bmc-dash-pill p-relative cursor-pointer  cursor rel">
                                    <span className=" xs-text-fs-14 av-heavy color-6E6 fs18">Roles</span>
                                    <Link to={'/employes/roles'} className="ab-link t-0">
                                      </Link>
                                </div>

                                <div className="bmc-dash-pill p-relative cursor-pointer cursor rel flex">
                                    <span className=" xs-text-fs-14 av-heavy color-6E6 fs18">Emploi de temps</span>
                                    <Link to={'/employes/roles'} className="ab-link t-0">
                                    </Link>

                                    <div
                                        className="beta-tag fs12 av-book color-6e6 grey-bg-dim rad16 flex justcenter itemcenter u-mar-left-xs">SOON
                                    </div>
                                </div>

                            </div>

                            <Spin tip="Chargment..." size="large" spinning={loading && loadingrole && loadingbranches}>

                            <div className="grille w100  u-pad-top-s u-pad-horizontal-s u-mar-top-m   blok noshadow noborder hauto rad16 u-mar-top-xl-res nopadres noradres ">


                                <div className="flex justbtw u-mar-bottom-s">

                                <div>

                                    <Input placeholder="Rechercher dans la table" style={{minWidth:'250px',height:'35px!important'}} />

                                </div>

                                    <Button type="primary" size="large"  className="rad8" onClick={()=>setVisible(true)}>
                                    <span className="fs18 av-heavy">  Ajouter un employé </span>
                                </Button>


                                    <Drawer

                                        width={600}
                                        onClose={()=>setVisible(false)}
                                        visible={visible}
                                        bodyStyle={{ paddingBottom: 0,paddingTop:12 }}
                                        destroyOnClose={true}

                                    >

                                      <Formemploye roles={roles} branches={branches} close={close}/>

                                    </Drawer>



                                </div>

                                <Table columns={columns} dataSource={staffs} size="default" pagination={{showSizeChanger:false,size:"small"}} showSizeChanger={false}  />,


                            </div>

                            </Spin>


                        </div>


                    </Content>
                </Layout>
            </Content>
        </Layout>



    );


}
