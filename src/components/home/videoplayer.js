
import React, {useEffect, useState} from 'react';

import {Divider} from 'antd';

import HoverVideoPlayer from 'react-hover-video-player';

export default function  Videoplayer ({videodetail}) {

   


  
    



    return (

        <div className="flex h100  ">
        <div className="grille h100 justcenter itemcenter u-pad-horizontal-s" style={{backgroundColor:'#f0f0f0',height:'100%'}}>

<div className="hover h100 justcenter itemcenter flex" style={{width:'100%',height:'100%'}}>
        <HoverVideoPlayer
      videoSrc={videodetail.url}
     
      restartOnPaused
      muted={false}
      focused={true}
      loop={true}
      sizingMode="container"
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
    
        </div>
        
        <div className="flex  column u-pad-m justcenter grille">

      <h1 className="av-heavy">Details du contenu </h1>

<div className="flex justcenter w50"> <span className="av-light " style={{textAlign:'right',width:'50px'}}> Secteur</span> <span className="av-heavy u-mar-left-m grille" style={{color:'green'}}> {videodetail?.secteur}</span> </div>             
<div className="flex justcenter w50"> <span className="av-light " style={{textAlign:'right',width:'50px'}}> Style</span> <span className="av-heavy u-mar-left-m grille" style={{color:'green'}}> {videodetail?.style}</span> </div>             

           <h3 className="av-medium u-mar-top-s"> {videodetail?.description} </h3>
           <Divider/>
        </div>
        
               </div>

    );


}
