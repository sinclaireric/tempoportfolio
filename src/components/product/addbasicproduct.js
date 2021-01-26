
import React, {Fragment, useEffect, useState} from 'react';
import moment from 'moment';
import 'moment/locale/fr';
import { TwitterPicker } from 'react-color';

import Header from '../header';
import LeftSide from '../sider/sider'
import {Upload, Layout, Form, Col, Row,Divider,Checkbox,Tabs,Switch,Button, Select, Spin, Input, message} from 'antd';
import ImgCrop from 'antd-img-crop';

import axios from "axios";
import {URL} from "../../urlapi";
import { Link } from "react-router-dom";


const {  Content } = Layout;
const {Option} = Select;
const { TabPane } = Tabs;
export default function  AddBasicProduct () {

    const [loading,setLoading] = useState(false)
    const [reload,setReload] = useState(1)
    const [visible,setVisible] = useState(false)
    const [onStock,setOnStock] = useState(false)
    const [key,setKey] = useState('1')
    const [background,setBackground] = useState('#ABB8C3')
    const [loadingcategories,setLoadingcategories] = useState(true)
    const [loadingbranches,setLoadingbranches] = useState(true)
    const token = JSON.parse(localStorage.getItem('user')).token;
    const [form] = Form.useForm();

    const [categories,setCategories] = useState(null)
    const [branches,setBranches] = useState(null)


    useEffect(() => {



        const getCategories = async () => {


            const result = await axios.get(URL+'/api/category/all', {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })

            setCategories(result.data);
            setLoadingcategories(false)
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

        getCategories();
        getBranches();

    }, []);


    const [fileList, setFileList] = useState([
        {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
    ]);




    async function onSubmit ( values )  {


        values.color = background;

        console.log(values)



        try {
            setLoading(true)
            const result = await axios.post(URL + '/api/product/create',
                values,{
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                }
            )

            message.success('Enregistrement réussi!!')
            setLoading(false)

        } catch(e) {
            setLoading(false)
            message.warning('Erreur enregistrement!')

        }

    }






   const onAdd = (val) => {

        setOnStock(val)

    }

    const onPreview = async file => {
        let src = file.url;
        if (!src) {
            src = await new Promise(resolve => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow.document.write(image.outerHTML);
    };






    return (





        <Layout className=" bgapp">
            <Header />

            <Content style={{ padding: '0 50px 0 100px' }} className="u-mar-top-xl">

                <Layout className="bgapp" >
                    <LeftSide />
                    <Content style={{ padding: '0 0 24px 24px'}}>


                        <div className="flex column">


                            {/*<h1 className="fs30 color-0d0 av-heavy u-mar-top-xs ">Employes</h1>*/}

                            <div className="flex u-mar-top-xs">
                            <div className="bmc-dash-pill p-relative cursor-pointer bmc-dash-pill-active  cursor rel" onClick={() => window.history.back()}
                            >
                                <span className=" xs-text-fs-14 av-heavy color-6E6 fs18">Nouveau produit basique</span>

                            </div>



                            </div>

                            <Spin tip="Chargment..." size="large" spinning={loadingcategories && loadingbranches }>



                                <Row gutter={32} className=" w100  u-pad-top-s u-pad-horizontal-s u-mar-top-m  h100  u-mar-top-xl-res nopadres noradres ">

                                <Col span={16} className=" w100  u-pad-top-s u-pad-horizontal-s   h100 blok rad16 u-mar-top-xl-res nopadres noradres ">


                                    <div className="flex u-mar-left-m u-mar-top-s justbtw rad8 grille25 bgwhite  nomarres u-pad-s-res" style={{height:'max-content'}}>



                                        <Form layout="vertical" className="w100" form={form}  onFinish={onSubmit} >

                                            {key == "1" &&

                                           <Fragment>
                                            <Row gutter={16}>
                                                <Col span={12}>
                                                    <Form.Item
                                                        name="designation"
                                                        label="Désignation"
                                                        rules={[{ required: true, message: 'entrez la Désignation' }]}
                                                    >
                                                        <Input  />
                                                    </Form.Item>
                                                </Col>

                                                <Col span={12}>
                                                    <Form.Item
                                                        name="barcode"
                                                        label="Code barre"
                                                    >
                                                        <Input  />
                                                    </Form.Item>
                                                </Col>

                                            </Row>

                                            <Row gutter={16}>
                                                <Col span={12}>
                                                <Form.Item
                                                name="category"
                                                label="Catégorie"
                                                rules={[{ required: true, message: 'choisir une categorie' }]}
                                                >
                                                <Select>

                                            {  categories != null &&

                                                categories.map(categorie=>(


                                                <option  value={categorie._id} > {categorie.name} </option>


                                                ))   }


                                                </Select>
                                                </Form.Item>
                                                </Col>

                                                <Col span={12}>
                                                <Form.Item
                                                name="unite"
                                                label="Unite"
                                                >
                                                <Select >

                                                <Option value="unité">unité</Option>
                                                <Option value="gramme">g</Option>
                                                <Option value="Kg">Kg</Option>
                                                <Option value="litre">Litre</Option>
                                                <Option value="Tas">Tas</Option>



                                                </Select>
                                                </Form.Item>
                                                </Col>

                                                </Row>


                                               {branches != null && branches.length > 1 &&
                                               <Row gutter={16}>
                                                   <Col span={12}>
                                                       <Form.Item
                                                           name="branches"
                                                           label="Branches"
                                                           rules={[{
                                                               required: true,
                                                               message: 'selectionner une branche'
                                                           }]}
                                                       >
                                                           <Select mode="multiple" allowClear>
                                                               { branches.map(u =>
                                                                   <Option value={u._id}>{u.name}</Option>
                                                               )
                                                               }
                                                           </Select>
                                                       </Form.Item>
                                                   </Col>

                                                   <Col span={12}>
                                                       <Form.Item shouldUpdate={true}
                                                                  name="addauto"
                                                                  label="Ajouter  aux nouvelles branches"

                                                       >
                                                           <Switch/>
                                                       </Form.Item>
                                                   </Col>

                                               </Row>
                                               }



                                               <Row gutter={16} className="u-mar-bottom-l">
                                                   <Col span={12}>
                                                       <Form.Item
                                                           name="saleprice"
                                                           label="Prix de vente"
                                                           rules={[
                                                               {
                                                                   required: true,
                                                                   message: 'Entrez le prix de vente en chiffre',
                                                               },
                                                           ]}
                                                       >
                                                           <Input type={"number"} />
                                                       </Form.Item>
                                                   </Col>

                                                   <Col span={12}>
                                                       <Form.Item
                                                           name="suplyprice"
                                                           label="prix d'achat"
                                                           rules={[{ message: "entrez le prix d'achat en chiffre"  }]}

                                                       >
                                                           <Input  />
                                                       </Form.Item>
                                                   </Col>

                                                   {branches != null && branches.length > 1 &&
                                                   <span className="av-heavy"> + Ajouter un prix different pour une branche </span>
                                                   }
                                               </Row>



                                               <div className="grille u-mar-top-s flex u-pad-xs  order2 rad8" style={{height:'max-content',backgroundColor:background }} >


                                                   <div className=" flex column  w100">



                                                       <ImgCrop rotate>
                                                           <Upload
                                                               action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                                               listType="picture-card"
                                                               fileList={fileList}
                                                               onPreview={onPreview}
                                                           >
                                                               {fileList.length < 5 && '+ Upload'}
                                                           </Upload>
                                                       </ImgCrop>




                                                       <h4 className="u-mar-top-xs">Choisir une couleur </h4>
                                                       <TwitterPicker
                                                           color={ background }
                                                           onChangeComplete={ (color) => setBackground(color.hex) }
                                                       />

                                                   </div>


                                               </div>


                                           </Fragment>
                                            }



                                            {key == "2" &&

                                            <Fragment>


                                                <Row gutter={16}>
                                                    <Col span={12}>
                                                        <Form.Item
                                                            name="brand"
                                                            label="Marque"
                                                        >
                                                            <Select  >

                                                                <Option  value={''} > -- </Option>



                                                            </Select>
                                                        </Form.Item>
                                                    </Col>

                                                    <Col span={12}>
                                                        <Form.Item
                                                            name="suplier"
                                                            label="Fournisseur"
                                                        >
                                                            <Select mode="multiple" allowClear  >

                                                                <Option value="">--</Option>




                                                            </Select>
                                                        </Form.Item>
                                                    </Col>

                                                </Row>
                                                <Row gutter={16}>
                                                    <Col span={24}>
                                                        <Form.Item
                                                            name="description"
                                                            label="Description"
                                                        >
                                                            <Input.TextArea />
                                                        </Form.Item>
                                                    </Col>


                                                </Row>

                                            </Fragment>

}


                                            {key == "3" &&
<Fragment>
                                            <Row gutter={16}>
                                                <Col span={12}>
                                                    <Form.Item
                                                        name="forStock"
                                                        label="Gérer le stock"

                                                    >
                                                        <Switch onChange={onAdd}/>
                                                    </Form.Item>
                                                </Col>




                                            </Row>

                                            {onStock &&
                                                <Row gutter={16} className="u-mar-bottom-l">
                                                <Col span={12}>
                                                <Form.Item
                                                name="inStock"
                                                label="Stock actuel"
                                                rules={[
                                                {
                                                    required: onStock,
                                                    message: 'Entrez le stock en chiffre',
                                                },
                                            ]}
                                                >
                                                <Input type={"number"} />
                                                </Form.Item>
                                                </Col>

                                                <Col span={12}>
                                                <Form.Item
                                                name="stockAlert"
                                                label="stock mininale"
                                                >
                                                <Input  />
                                                </Form.Item>
                                                </Col>


                                                </Row>

                                            }
</Fragment>
                                            }







                                            <Form.Item className="w100 " >




                                                <Divider/>
                                                <div style={{textAlign:'right'}}>

                                                    <Button  size={'large'} loading={loading} type="primary" htmlType="submit" className="rad8 u-pad-horizontal-l" type="primary">
                                                        Enregistrer
                                                    </Button>
                                                </div>



                                            </Form.Item>

                                        </Form>
















                                    </div>



                                </Col>

                                    <Col span="7" offset={1} className="blok rad16 h100  optprod">

                                        <Tabs tabPosition="right" onChange={(key)=>setKey(key)}>
                                            <TabPane tab="Infos générales" style={{color:'red'}} key="1">
                                            </TabPane>
                                            <TabPane tab="Détails" key="2">
                                            </TabPane>
                                            <TabPane tab="Stock" key="3">
                                            </TabPane>
                                        </Tabs>
                                    </Col>
                                </Row>

                            </Spin>


                        </div>


                    </Content>
                </Layout>
            </Content>
        </Layout>



    );


}
