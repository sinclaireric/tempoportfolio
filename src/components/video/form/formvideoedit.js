
import React, {useState, useEffect, Fragment} from 'react';
import moment from 'moment';
import 'moment/locale/fr';
import axios from "axios";

import {Button, Layout,Select, Form,Col,message, Row,Divider,Input} from 'antd';


const token = localStorage.getItem('token');


const {  Content } = Layout;
const {Option} = Select;
export default function  FormVideo({close,record}) {


    const [loading,setLoading] = useState(false)
    const [loadingEdit,setLoadingEdit] = useState(false)
    const [urlvideo,setUrlvideo] = useState(null)
    const [urlthumb,setUrlthumb] = useState(record.thumb)




    async function onSubmit ( values )  {


        try {

            if (urlvideo != null ) {

                values.url = urlvideo;
                values.thumb = urlthumb;
                console.log(values)
            setLoading(true)
            const result = await axios.post('https://21p779smo7.execute-api.eu-west-3.amazonaws.com/dev/videos',
                values,{
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                }
            )

            close()
            message.success('Enregistrement réussi!!')
            setLoading(false)
        }else{

            message.warning('Veuillez uploader une vidéo')

            return 

        }
           

        } catch(e) {
            setLoading(false)
            message.warning('Erreur enregistrement!')

        }

        


    }




    async function onDelete ()  {


        try {

               
            setLoadingEdit(true)
            const result = await axios.delete('https://21p779smo7.execute-api.eu-west-3.amazonaws.com/dev/videos/'+record.PK,
                {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                }
            )

            close()
            message.success('Supression réussie!!')
            setLoadingEdit(false)
       

        } catch(e) {
            setLoadingEdit(false)
            message.warning('Erreur suppression!')

        }

        


    }



  const  showwidget = (widget) => {

    myWidget.open()
  }


   let myWidget = window.cloudinary.createUploadWidget({
        cloudName: 'dbxswktcp', 
        resourceType:'video',
        uploadPreset: 'p8ppgwkh'}, (error, result) => { 
          if (!error && result && result.event === "success") { 
            console.log('Done! Here is the image info: ', result.info); 
            setUrlvideo(result.info.url)
            setUrlthumb(result.info.thumbnail_url)


          }
        }
      )




    return (

                                <div className="flex  column rel h100">

                                    <div
                                        className="justbtw itemcenter flex column  w100 abs  w100" style={{top:0}}

                                    >

                                        <span className="av-heavy fs22"> Details vidéo </span>


                                        

                                        <Divider/>

                                    </div>



                                        <Form layout="vertical"  onFinish={onSubmit} >
                                            <Row gutter={16} style={{marginTop:'80px'}}>
                                           
                                                <Col span={12}>

                                                        <Fragment>
                                                    <Form.Item
                                                        name="secteur"
                                                        label="Secteur"
                                                    >
                                                        <Select defaultValue={record.secteur}>
                                                                <Option value={'Food / Boisson'}> Food / Boisson </Option>
                                                                <Option value={'Service'}> Service </Option>
                                                                <Option value={'Education / Formation'}>  Education / Formation </Option>
                                                                <Option value={'Mode / Luxe'}> Mode / Luxe </Option>
                                                                <Option value={'Santé / Social'}> Santé / Social </Option>
                                                        </Select>
                                                    </Form.Item>
                                                        </Fragment>
                                                    
                                                </Col>

                      


<Col span={12}>


<Fragment>
                                                    <Form.Item
                                                        name="style"
                                                        label="style"
                                                    >
                                                        <Select defaultValue={record.style}>


                                                                <Option value="Stop motion"> Stop motion </Option>
                                                                <Option value="Stop motion"> Motion Design </Option>
                                                                <Option value="3D"> 3D </Option>
                                                                <Option value="Tournage"> Tournage </Option>
                                                                <Option value="Tournage"> GIF </Option>

                                                           

                                                        </Select>
                                                    </Form.Item>
                                                        </Fragment>
</Col>




<Col span={24}>


<div className="flex itemcenter column">

<img src={urlthumb} className="rad4" style={{width:'30%',height:'250px'}} />

<Button  onClick={showwidget}  className="rad16 u-pad-horizontal-l u-mar-top-s" type="primary">
                                                            Modifier la vidéo
                                                        </Button>

</div>

</Col>


                                            </Row>







                                            <Form.Item className="w100 abs " style={{bottom:0,right:0}}>




                                                    <Divider/>
                                                    <div style={{textAlign:'right'}}>
                                                        <Button onClick={close} size={'large'} className="rad8 u-pad-horizontal-l" style={{ marginRight: 12 }}>
                                                            Annuler
                                                        </Button>


                                                        <Button  size={'large'}  loading={loadingEdit} style={{ marginRight: 12 }} type="danger" onClick = {onDelete} className="rad8 u-pad-horizontal-l" >
                                                            Suprimmer
                                                        </Button>

                                                        <Button  size={'large'}  loading={loading} type="primary" htmlType="submit" className="rad8 u-pad-horizontal-l" >
                                                            Enregistrer
                                                        </Button>
                                                    </div>



                                            </Form.Item>




                                        </Form>







                                </div>




    );


}
