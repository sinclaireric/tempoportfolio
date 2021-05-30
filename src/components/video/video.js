
import React, {useEffect, useState} from 'react';
import moment from 'moment';
import 'moment/locale/fr';

import Header from '../header';
import {Button, Layout,Drawer,Select,Spin, Menu,Tag, Table,Input} from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import Formvideo from './form/formvideo';
import Formvideoedit from './form/formvideoedit';
import axios from "axios";
import {URL} from "../../urlapi";
import { Link } from "react-router-dom";
import {Logout} from "../../helpers/logout";


const {  Content } = Layout;
export default function  Videos () {

    const [loading,setLoading] = useState(true)
    const [reload,setReload] = useState(1)
    const [visible,setVisible] = useState(false)
    const [record,setRecord] = useState(null)
    const [visibleEdit,setVisibleEdit] = useState(false)
    const token = localStorage.getItem('token');

    const [Videos,setVideos] = useState(null)



    useEffect(() => {


        const getVideos = async () => {
            try {
            const result = await axios.get('https://21p779smo7.execute-api.eu-west-3.amazonaws.com/dev/videos', {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })

            setVideos(result.data);
            setLoading(false)

        } catch (e) {
            if(e.response && e.response.status == 401){
                Logout()
            }
        }



        };




        getVideos();


    }, [reload]);



   const selectRow = (record) => {
setRecord(record)
setVisibleEdit(true)
console.log(record)
    }


    const close = () => {

        setVisible(false)
        setVisibleEdit(false)
        setReload(reload+1)

    }



    const columns = [

        {
            title: '',
            dataIndex: 'thumbimage',
            width: 150,
            render: text =>
                <>
<img src={text} width="60" height="60" />
                </>

        },

        {
            title: 'Secteur',
            dataIndex: 'secteur',
        },

        {
            title: 'Style',
            dataIndex: 'style',
        },

        {
            title: 'Description',
            dataIndex: 'description',
        },


        



    ];







    return (





        <Layout className=" bgapp">
            <Header show={true} />

            <Content style={{ padding: '0 100px' }} className="u-mar-top-xl">

                <Layout className="bgapp" >
                    <Content style={{ padding: '0 0 24px 24px'}}>


                        <div className="flex column">


                            {/*<h1 className="fs30 color-0d0 av-heavy u-mar-top-xs ">Employes</h1>*/}

                            <div className="flex u-mar-top-xs">
                            <div className="bmc-dash-pill p-relative  cursor bmc-dash-pill-active  rel">
                                <span className=" xs-text-fs-14 av-heavy color-6E6 fs18">Videos</span>
                                <Link to={'/'} className="ab-link t-0">
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
                                    <span className="fs18 av-heavy">  Ajouter une video </span>
                                </Button>


                                    <Drawer

                                        width={550}
                                        onClose={()=>setVisible(false)}
                                        visible={visible}
                                        bodyStyle={{ paddingBottom: 0,paddingTop:12 }}
                                        destroyOnClose={true}

                                    >

                                     <Formvideo close={close}  />

                                    </Drawer>




                                    <Drawer

width={550}
onClose={()=>setVisibleEdit(false)}
visible={visibleEdit}
bodyStyle={{ paddingBottom: 0,paddingTop:12 }}
destroyOnClose={true}

>

<Formvideoedit close={close} record={record} />

</Drawer>




                                    



                                </div>

                                <Table columns={columns} dataSource={Videos}
                                onRow={(record, rowIndex) => {
                                    return {
                                      onClick: event => {selectRow(record)}, // click row
            
                                    };
                                  }}
                                
                                 size="default" pagination={{showSizeChanger:false,size:"small"}} showSizeChanger={false}  />,


                            </div>

                            </Spin>


                        </div>


                    </Content>
                </Layout>
            </Content>
        </Layout>



    );


}
