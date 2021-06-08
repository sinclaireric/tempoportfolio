
import React, {useEffect, useState} from 'react';
import moment from 'moment';
import 'moment/locale/fr';

import Header from '../header';
import {Button, Layout,Modal,Spin,Dropdown, Menu,Tag, Table,Input} from 'antd';
import axios from "axios";
import { Link } from "react-router-dom";
import Videoplayer from "./videoplayer";
import {Logout} from "../../helpers/logout";
import HoverVideoPlayer from 'react-hover-video-player';

const {  Content } = Layout;
export default function  Home () {

    const [loading,setLoading] = useState(true)
    const [reload,setReload] = useState(1)
    const [visible,setVisible] = useState(false)
    const [record,setRecord] = useState(null)
    const [videodetail,setVideodetail] = useState(null)
    const token = localStorage.getItem('token');
    const [filteredArray,setFilteredArray] = useState([])
    const [filteredOptions,setFilteredOptions] = useState([])
    const [filteredStyleOptions,setFilteredStyleOptions] = useState([])

    const [videos,setVideos] = useState(null)



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



  const filterAction = (option) => {
    

// pas d'options
   if( filteredOptions.filter(u => u == option).length == 0 ) {
    let options = filteredOptions.concat(option)
    setFilteredOptions(options)



    options.map((option)=>{

        let fil =  videos.filter(((i) => i.secteur == option ))
  
        let newarr = filteredArray.concat(fil)
        setFilteredArray(newarr)

    
      })

    } else {

        // on retire l'element
let options = filteredOptions.filter(u => u != option ) 

if(options.length == 0) {
    setFilteredArray([])
    setFilteredOptions([])
    return;
}

console.log(options)
setFilteredOptions(options)        





///


if(options.length > 1 ){

let arrt = []
    options.map((option)=>{
        console.log(filteredArray)
        if(filteredArray.length == 0 ) {


        let fil =  videos.filter(((i) => i.secteur == option ))
  
        let newarr = filteredArray.concat(fil)
        setFilteredArray(newarr)

        }else{
            console.log(filteredArray)
console.log(option)
console.log(filteredArray.filter(((i) => i.secteur == option)) )
            let fil =  filteredArray.filter(((i) => i.secteur == option ))
  

            fil.map(u=>{
                console.log(u)
                arrt.push(u)
            })
   

console.log(arrt)

        }





      })
      console.log(arrt)

      setFilteredArray(arrt)




}else{



    options.map((option)=>{
        console.log(filteredArray)
        if(filteredArray.length == 0 ) {


        let fil =  videos.filter(((i) => i.secteur == option ))
  
        let newarr = filteredArray.concat(fil)
        setFilteredArray(newarr)

        }else{
            console.log(filteredArray)
console.log(option)
console.log(filteredArray.filter(((i) => i.secteur == option)) )
            let fil =  filteredArray.filter(((i) => i.secteur == option ))
  


            setFilteredArray(fil)


        }



      })







}


   






    }

   




    

  }


  const filterStyleAction = (option) => {
    

    // pas d'options
       if( filteredStyleOptions.filter(u => u == option).length == 0 ) {
        let options = filteredStyleOptions.concat(option)
        setFilteredStyleOptions(options)
    
    
    
        options.map((option)=>{
    

            if(filteredOptions.length > 0) {

                let fil =  filteredArray.filter(((i) => i.style == option ))
      
                let newarr = filteredArray.concat(fil)
                setFilteredArray(newarr)



            }else{


                let fil =  videos.filter(((i) => i.style == option ))
      
                let newarr = filteredArray.concat(fil)
                setFilteredArray(newarr)

            }
            
    
        
          })
    
        } else {
    
            // on retire l'element
    let options = filteredStyleOptions.filter(u => u != option ) 
    
    if(options.length == 0 && filteredOptions.length == 0) {
        setFilteredArray([])
        setFilteredStyleOptions([])
        return;
    }
    
    setFilteredStyleOptions(options)        
    
    
    
    
    
    ///
    
    
    if(options.length > 1 ){
    
    let arrt = []
        options.map((option)=>{
            console.log(filteredArray)
            if(filteredArray.length == 0 ) {
    
    
            let fil =  videos.filter(((i) => i.style == option ))
      
            let newarr = filteredArray.concat(fil)
            setFilteredArray(newarr)
    
            }else{
                let fil =  filteredArray.filter(((i) => i.style == option ))
      
    
                fil.map(u=>{
                    arrt.push(u)
                })
       
    
            }
    
    
    
    
    
          })
    
          setFilteredArray(arrt)
    
    
    
    
    }else{
    
    
    
        options.map((option)=>{
            console.log(filteredArray)
            if(filteredArray.length == 0 ) {
    
    
            let fil =  videos.filter(((i) => i.style == option ))
      
            let newarr = filteredArray.concat(fil)
            setFilteredArray(newarr)
    
            }else{
                console.log(filteredArray)
    console.log(option)
    console.log(filteredArray.filter(((i) => i.style == option)) )
                let fil =  filteredArray.filter(((i) => i.style == option ))
      
    
    
                setFilteredArray(fil)
    
    
            }

          })
    
    
    }
    
    
       
    
    
    
    
    
    
        }
    
       
    
    
    
    
        
    
      }

    const detailsVideo = (vid) => {

        setVisible(true)
        setVideodetail(vid)

    }


      const close = () => {

        setVisible(false)

    }


    const menu = (
        <Menu style={{width:'200px',marginTop:'60px',maxHeight:400 }} >
            <Menu.Item key="0" className={"flex itemcenter" + (filteredOptions.includes('Food-Boisson') ? ' activefilter' : '' )} onClick = {()=>filterAction("Food-Boisson")}  >


            <div className={"itemcenter flex"}>


<span className="av-heavy fs14">Food / Boisson</span>


</div>

            </Menu.Item>
            <Menu.Divider />

         
            <Menu.Item key="1" className={"flex itemcenter" + (filteredOptions.includes('Service') ? ' activefilter' : '' )} onClick = {()=>filterAction("Service")}  >


<div className="  itemcenter flex">


<span className="av-heavy fs14">Service</span>

</div>

</Menu.Item>
<Menu.Divider />

<Menu.Item key="2" className={"flex itemcenter" + (filteredOptions.includes('Education-Formation') ? ' activefilter' : '' )} onClick = {()=>filterAction("Education-Formation")}  >


<div className="  itemcenter flex">


<span className="av-heavy fs14">Education / Formation</span>


</div>

</Menu.Item>
<Menu.Divider />


<Menu.Item key="3" className={"flex itemcenter" + (filteredOptions.includes('Mode-Luxe') ? ' activefilter' : '' )} onClick = {()=>filterAction("Mode-Luxe")}  >


<div className="  itemcenter flex">


<span className="av-heavy fs14">Mode / Luxe </span>

</div>

</Menu.Item>
<Menu.Divider />


<Menu.Item key="4" className={"flex itemcenter" + (filteredOptions.includes('Sante-Social') ? ' activefilter' : '' )} onClick = {()=>filterAction("Sante-Social")}  >


<div className="  itemcenter flex">



<span className="av-heavy fs14">Santé / Social</span>

</div>

</Menu.Item>


        </Menu>
    );



    const menuStyle = (
        <Menu style={{width:'200px',marginTop:'60px',maxHeight:400 }}   >
            <Menu.Item key="0" className={"flex itemcenter" + (filteredStyleOptions.includes('Stop-Motion') ? ' activefilter' : '' )} onClick = {()=>filterStyleAction("Stop-Motion")}  >


            <div className="  itemcenter flex">


<span className="av-heavy fs14">Stop motion</span>


</div>

            </Menu.Item>
            <Menu.Divider />

         
            <Menu.Item key="1" className={"flex itemcenter" + (filteredStyleOptions.includes('Motion-Design') ? ' activefilter' : '' )} onClick = {()=>filterStyleAction("Motion-Design")}  >


<div className="  itemcenter flex">


<span className="av-heavy fs14">Motion Design</span>

</div>

</Menu.Item>
<Menu.Divider />

<Menu.Item key="2" className={"flex itemcenter" + (filteredStyleOptions.includes('3D') ? ' activefilter' : '' )} onClick = {()=>filterStyleAction("3D")}  >


<div className="  itemcenter flex">


<span className="av-heavy fs14"> 3D </span>


</div>

</Menu.Item>
<Menu.Divider />


<Menu.Item key="3" className={"flex itemcenter" + (filteredStyleOptions.includes('Tournage') ? ' activefilter' : '' )} onClick = {()=>filterStyleAction("Tournage")}  >


<div className="itemcenter flex">


<span className="av-heavy fs14">Tournage </span>

</div>

</Menu.Item>
<Menu.Divider />


<Menu.Item key="4" className={"flex itemcenter" + (filteredStyleOptions.includes('GIF') ? ' activefilter' : '' )} onClick = {()=>filterStyleAction("GIF")}  >

<div className="itemcenter flex">



<span className="av-heavy fs14">GIF</span>

</div>

</Menu.Item>


        </Menu>
    );

    



    return (

        <Layout className=" bgapp">
            <Header show={false} />

            <Content  style={{marginTop:'50px'}}>

                <Layout className="bgapp" >
                    <Content >


                        <div className="flex column">



                            <div className="flex u-mar-top-xs">
                            

                            </div>

                            <Spin tip="Chargment..." size="large" spinning={loading }>

<div className="flex justbtw">
<div className="u-pad-horizontal-s u-pad-vertical-sm flex w100res justbtwres">
                            <Dropdown overlay={menu} class="cursor" trigger={['click']}>


<div className="flex itemcenter cursor justcenter rad4 u-pad-horizontal-l u-mar-right-m nomarres filter"  >

    <span className="fs14 fW600 u-mar-right-xs"> Secteur </span>

   { filteredOptions.length > 0 &&
    <span style={{backgroundColor:'#30cecf',color:'white',padding:5,borderRadius:'50%',height:'20px',
    width:'20px',
    marginLeft:'10px'}} className="flex justcenter itemcenter"> {filteredOptions.length}
     </span>
     }
</div>


</Dropdown>




<Dropdown overlay={menuStyle} class="cursor" trigger={['click']}>


<div className="flex itemcenter cursor justcenter rad4 u-pad-horizontal-l u-mar-right-m nomarres filter"  >

    <span className="fs14 fW600 u-mar-right-xs"> Style</span>


    { filteredStyleOptions.length > 0 &&
    <span style={{backgroundColor:'#30cecf',color:'white',padding:5,borderRadius:'50%',height:'20px',
    width:'20px',
    marginLeft:'10px'}} className="flex justcenter itemcenter"> {filteredStyleOptions.length}
     </span>
     }

</div>


</Dropdown>


</div>

<div className="flex justcenter itemcenter u-pad-horizontal-l nonedisplayres" style={{borderLeft:'1px solid #ccc'}}>
    <span className="fs18 av-heavy flex">
{videos != null && filteredArray.length == 0 ? videos.length :filteredArray.length > 0 ? filteredArray.length : '--' }
 <span className="u-mar-left-xs"> résultats </span>
</span>
</div>

</div>
                              <div className="masonry">
                             { console.log(filteredOptions) }
                             { console.log(filteredArray) }

{ videos != null &&  filteredArray.length == 0 ?  videos.map( (vid) =>  


<div onClick={()=>detailsVideo(vid)}>
   
    <HoverVideoPlayer
         videoSrc={vid.url}
         pausedOverlay={
   
           <img src={vid.thumbimage} alt="" style={{width:'100%',height: "100%"}} />
           
         }
         restartOnPaused
         loadingOverlay={
           <div className="loading-spinner-overlay" style={{width:'100%',
               height: '100%',
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center'}} >
   Chargement...
               </div>
         }
       />   
   
   </div>



)

:videos != null && filteredArray.length > 0 ?


filteredArray.map( (vid) =>  


<div onClick={()=>detailsVideo(vid)}>
   
   <HoverVideoPlayer
         videoSrc={vid.url}
         pausedOverlay={
   
           <img src={vid.thumbimage} alt="" style={{width:'100%',height: "100%"}} />
           
         }
         restartOnPaused
         loadingOverlay={
           <div className="loading-spinner-overlay" style={{width:'100%',
               height: '100%',
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center'}} >
   Chargement...
               </div>
         }
       /> 
   
   </div>
)

:
<></>
        }




                              </div>


                   
                       
                   <Modal destroyOnClose={true}  visible={visible} footer={null} onCancel={close} width={'100%'}>
      
      <Videoplayer videodetail={videodetail} autoplay={true} />
   
      </Modal>     
                       
                               
                          

                            </Spin>


                        </div>


                    </Content>
                </Layout>
            </Content>
        </Layout>



    );


}
