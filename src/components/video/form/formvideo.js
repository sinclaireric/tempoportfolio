
import React, {useState, Fragment} from 'react';
import moment from 'moment';
import 'moment/locale/fr';
import axios from "axios";

import {Button, Layout,Select, Form,Col,message,Input,Row,Divider} from 'antd';



const token = localStorage.getItem('token');


const {  Content } = Layout;
const {Option} = Select;
export default function  FormVideo({close}) {


    const [loading,setLoading] = useState(false)
    const [urlvideo,setUrlvideo] = useState(null)
    const [urlthumb,setUrlthumb] = useState(null)
    const [thumbimage,setThumbimage] = useState(null)




    async function onSubmit ( values )  {


        try {

            if (urlvideo != null ) {

                values.url = urlvideo;
                values.thumb = urlthumb;
                values.thumbimage = thumbimage;
                console.log(values)
            setLoading(true)
            const result = await axios.post('https://ey8x98as8g.execute-api.eu-central-1.amazonaws.com/dev/categories',
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

  const  showwidget = (widget) => {

    myWidget.open()
  }


  const  showwidgetimage = (widget) => {

    myWidgetimage.open()
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



      let myWidgetimage = window.cloudinary.createUploadWidget({
        cloudName: 'dbxswktcp', 
        resourceType:'image',
        uploadPreset: 'p8ppgwkh'}, (error, result) => { 
          if (!error && result && result.event === "success") { 
            console.log('Done! Here is the image info: ', result.info); 
            setThumbimage(result.info.url)
          }
        }
      )




    return (

                                <div className="flex  column rel h100">

                                    <div
                                        className="justcenter itemcenter flex column  w100 abs  w100" style={{top:0}}

                                    >

                                        <span className="av-heavy fs22"> Ajouter une vidéo </span>

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
                                                        <Select>

                                                                <Option value={'Food-Boisson'}> Food / Boisson </Option>
                                                                <Option value={'Service'}> Service </Option>
                                                                <Option value={'Education-Formation'}>  Education / Formation </Option>
                                                                <Option value={'Mode-Luxe'}> Mode / Luxe </Option>
                                                                <Option value={'Sante-Social'}> Santé / Social </Option>
                                                      
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
                                                        <Select>


                                                                <Option value="Stop motion"> Stop motion </Option>
                                                                <Option value="Motion Design"> Motion Design </Option>
                                                                <Option value="3D"> 3D </Option>
                                                                <Option value="Tournage"> Tournage </Option>
                                                                <Option value="GIF"> GIF </Option>

                                                           

                                                        </Select>
                                                    </Form.Item>   
                                                        </Fragment>
</Col>


<Col span={24}>


<Fragment>
                                                    <Form.Item
                                                        name="description"
                                                        label="Description"
                                                    >
                                                        <Input.TextArea row={7}/>
                                                    </Form.Item>   
                                                        </Fragment>
</Col>




<Col span={12}>

{thumbimage != null ?

<div className="flex itemcenter column">

<img src={thumbimage} className="rad4" style={{width:'30%',height:'150px'}} />

<Button  onClick={showwidgetimage}  className="rad16 u-pad-horizontal-l u-mar-top-s" type="primary">
                                                            Modifier
                                                        </Button>

</div>
:
<div style={{width:'100%',backgroundColor:'#edf2f8',border:'2px  dashed gray',height:150}} className="flex justcenter itemcenter">


    

<Button  onClick={showwidgetimage}  className="rad16 u-pad-horizontal-l" type="primary">
                                                            Image de couverture
                                                        </Button>

</div>
}
</Col>






<Col span={12}>

{urlvideo != null ?

<div className="flex itemcenter column">

<img src={urlthumb} className="rad4" style={{width:'30%',height:'150px'}} />

<Button  onClick={showwidget}  className="rad16 u-pad-horizontal-l u-mar-top-s" type="primary">
                                                            Modifier
                                                        </Button>

</div>
:
<div style={{width:'100%',backgroundColor:'#edf2f8',border:'2px  dashed gray',height:150}} className="flex justcenter itemcenter">


    

<Button  onClick={showwidget}  className="rad16 u-pad-horizontal-l" type="primary">
                                                            Ajouter une vidéo
                                                        </Button>

</div>
}
</Col>


                                            </Row>







                                            <Form.Item className="w100 abs " style={{bottom:0,right:0}}>




                                                    <Divider/>
                                                    <div style={{textAlign:'right'}}>
                                                        <Button onClick={close} size={'large'} className="rad8 u-pad-horizontal-l" style={{ marginRight: 12 }}>
                                                            Annuler
                                                        </Button>
                                                        <Button  size={'large'} disabled={urlvideo != null ? false : true} loading={loading} type="primary" htmlType="submit" className="rad8 u-pad-horizontal-l" type="primary">
                                                            Enregistrer
                                                        </Button>
                                                    </div>



                                            </Form.Item>




                                        </Form>







                                </div>




    );


}
