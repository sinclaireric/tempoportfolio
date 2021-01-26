
import React, {useState, useEffect, Fragment} from 'react';
import moment from 'moment';
import 'moment/locale/fr';
import axios from "axios";

import {Button, Layout,Select,Switch, Form,Col,message, Row,Divider,Input} from 'antd';
import {URL} from "../../../urlapi";

const token = localStorage.getItem('user') != null && JSON.parse(localStorage.getItem('user')).token;


const {  Content } = Layout;
const {Option} = Select;
export default function  FormCategory ({close,categories}) {


    const [loading,setLoading] = useState(false)
    const [visible,setVisible] = useState(false)




    async function onSubmit ( values )  {


        console.log(values)



        try {
            setLoading(true)
            const result = await axios.post(URL + '/api/category/create',
                values,{
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                }
            )


            close()
            message.success('Enregistrement réussi!!')
            setLoading(false)

        } catch(e) {
            setLoading(false)
            message.warning('Erreur enregistrement!')

        }

    }








    return (

                                <div className="flex  column rel h100">

                                    <div
                                        className="justcenter itemcenter flex column  w100 abs  w100" style={{top:0}}

                                    >

                                        <span className="av-heavy fs22"> Ajouter une catégorie </span>

                                        <Divider/>

                                    </div>



                                        <Form layout="vertical" style={{marginTop:80}} onFinish={onSubmit} >
                                            <Row gutter={16}>
                                                <Col span={24}>
                                                    <Form.Item
                                                        name="name"
                                                        label="Nom "
                                                        rules={[{ required: true, message: 'Veuillez entre le nom' }]}
                                                    >
                                                        <Input  />
                                                    </Form.Item>
                                                </Col>



                                                <Col span={24}>
                                                    <Form.Item
                                                        name="description"
                                                        label="Description"
                                                    >
                                                        <Input  />
                                                    </Form.Item>
                                                </Col>

                                                <Col span={24}>

                                                    {categories != null &&
                                                        <Fragment>
                                                    <span className="flex u-mar-right-s"> <span>Selectionner une catégorie parente</span>  <Switch /> </span>
                                                    <Form.Item
                                                        name="parentId"
                                                        label="Catégorie parente"
                                                    >
                                                        <Select>

                                                            {categories.map(u=>

                                                                <Option value={u._id}> {u.name} </Option>

                                                            )}

                                                        </Select>
                                                    </Form.Item>
                                                        </Fragment>
                                                    }
                                                </Col>

                                            </Row>







                                            <Form.Item className="w100 abs " style={{bottom:0,right:0}}>




                                                    <Divider/>
                                                    <div style={{textAlign:'right'}}>
                                                        <Button onClick={close} size={'large'} className="rad8 u-pad-horizontal-l" style={{ marginRight: 12 }}>
                                                            Annuler
                                                        </Button>
                                                        <Button  size={'large'} loading={loading} type="primary" htmlType="submit" className="rad8 u-pad-horizontal-l" type="primary">
                                                            Enregistrer
                                                        </Button>
                                                    </div>



                                            </Form.Item>




                                        </Form>







                                </div>




    );


}
