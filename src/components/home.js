
import React, { useState } from 'react';
import moment from 'moment';
import 'moment/locale/fr';

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import Header from './header';
import LeftSide from './sider/sider'
import { Layout, Menu,Dropdown } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import DatePick from './DatePick';



const { SubMenu } = Menu;
const {  Content } = Layout;
export default function  Home () {

 const [loading,setLoading] = useState(false)
    const [activedate,setActivedate] = useState(1)

const [chartOptions,setChartOptions] = useState(

     {
        chart: {
            height: '50%',
                backgroundColor: 'transparent',

        },

        title: {
            text: '',
                enabled:false,
        },

        legend:{
            enabled: false,
        },


        yAxis: {
            gridLineColor: 'rgba(0,0,0,0.05)',
                allowDecimals: false,
                title: {
                enabled:false,
            },
            labels: {
                style: {
                    color: 'rgba(0,0,0,0.8)'
                }
            }
        },


        xAxis: {
            categories: ['0', '0', '0','0','0','0','0'],
                labels: {
                style: {
                    color: 'rgba(0,0,0,0.8)'
                }
            }
        },
        series: [
            { data: [0,0,0,0,0,0,0],
                color:'rgba(0,0,0,0)'
            },
        ],


    }


)


    return (





            <Layout className=" bgapp">
                <Header />

                <Content style={{ padding: '0 100px' }} className="u-mar-top-xl">

                    <Layout className="bgapp" style={{ padding: '24px 0' }}>
                        <LeftSide />
                        <Content style={{ padding: '0 0 24px 24px'}}>


                            <div className="flex column">

                                <div className="flex itemcenter h100 justbtw u-pad-s-res u-mar-bottom-l justcenterres ">


                                    <div className="textcenterres">
                                        <h2 className=" u-mar-right-s colhead av-roman u-mar-top-xxs fs24 fs18res u-mar-bottom-xxs nomarres"> Bienvenue, <span
                                            className="av-heavy"> Sinclair </span></h2>
                                        <span
                                            className="fs15 fs12res colhead"> {moment().format('dddd , Do MMMM  YYYY')} </span>
                                    </div>


                                    <div className="flex itemcenter " >
                                        <div className="separator nonedisplayres"></div>

                                            <DatePick />

                                    </div>
                                </div>





                                <div className="grille blokdash flex  itemcenter column ">

                                    <div className=" flex  order2  itemcenter justbtw w100">


                                        <div className=" w100 simplegrid grap32" >

                                            <div className="block cardtot u-pad-horizontal-s flex justbtw u-pad-vertical-s rad12 rad8res " >

                                                <div>
                                                    <h4 className="nomar  lightfibra collab whiteres">Ventes totales</h4>

                                                    <h2 className=" u-mar-top-xs u-mar-bottom-xs-res  fs24 fs15res semiboldfibra colhead whiteres" >
                                                     {/*   {this.state.weekdata != null  &&
                                                        <NumberFormat value={this.state.weekdata.salesweek}  displayType={'text'} thousandSeparator={true}  />

                                                        }*/}

                                                        --

                                                        <span className="fs15 u-mar-left-xs ">Fcfa</span></h2>
                                                </div>


                                                <div  className="cardicon flex itemcenter rad8 justcenter" style={{backgroundColor: 'rgb(243, 249, 255)'}}>
                                                    <svg viewBox="0 0 18 20"  stroke="#0075FF" ><path d="M4.29004069 17.1983319l-2.50896858 2.0071749c-.38194528.3055562-.94773878.0336218-.94773878-.4555068V2.41666667c0-.96616611.7838339-1.75 1.75-1.75H15.4166667c.9661661 0 1.75.78383389 1.75 1.75V18.75c0 .4891286-.5657935.761063-.9477388.4555068l-2.5089686-2.0071749-1.964147 1.9641471c-.2278058.2278058-.5971521.2278058-.8249579 0L9 17.2416246 7.0791456 19.162479c-.22780581.2278058-.59715205.2278058-.82495789 0l-1.96414702-1.9641471zM16 17.5363022V2.41666667c0-.3218339-.2614994-.58333334-.5833333-.58333334H2.58333333C2.26149944 1.83333333 2 2.09483277 2 2.41666667V17.5363022l1.96892789-1.5751423c.23210314-.1856825.56670607-.1671505.7768844.0430278l1.92085438 1.9208544L8.587521 16.0041877c.2278059-.2278058.5971521-.2278058.824958 0l1.9208543 1.9208544 1.9208544-1.9208544c.2101783-.2101783.5447813-.2287103.7768844-.0430278L16 17.5363022zM4.91666667 7.66666667c-.32216611 0-.58333334-.26116723-.58333334-.58333334 0-.3221661.26116723-.58333333.58333334-.58333333h8.16666663c.3221661 0 .5833334.26116723.5833334.58333333 0 .32216611-.2611673.58333334-.5833334.58333334H4.91666667zm0 4.66666663c-.32216611 0-.58333334-.2611672-.58333334-.5833333 0-.3221661.26116723-.5833333.58333334-.5833333h8.16666663c.3221661 0 .5833334.2611672.5833334.5833333 0 .3221661-.2611673.5833333-.5833334.5833333H4.91666667z"></path></svg>
                                                </div>



                                            </div>



                                            <div className="block cardbenef u-pad-horizontal-s flex justbtw u-pad-vertical-s rad12 rad8res"  >

                                                <div>
                                                    <h4 className="nomar collab lightfibra whiteres">Bénéfice Nette</h4>


                                                    <h2 className=" u-mar-top-xs u-mar-bottom-xs-res  fs24 fs15res semiboldfibra colhead whiteres" >

                                                        {/*<NumberFormat value={this.state.weekdata.salesachatweek}  displayType={'text'} thousandSeparator={true}  />*/}

                                                    --
                                                        <span className="fs15 u-mar-left-xs ">Fcfa</span></h2>


                                                </div>


                                                <div  className="cardicon flex itemcenter rad8 justcenter" style={{backgroundColor: 'rgb(233, 251, 245)'}}>

                                                    <svg viewBox="0 0 20 20" stroke="#26D49B" ><path d="M8.0833333.66666667c.3221661 0 .5833334.26116723.5833334.58333333v7c0 .3221661-.2611673.5833333-.5833334.5833333H1.08333333C.76116723 8.8333333.5 8.5721661.5 8.25.5 4.06150056 3.8948339.66666667 8.0833333.66666667zm-.5833333 7V1.85948424c-3.07860905.27735172-5.52983071 2.72857338-5.80718242 5.80718243H7.5zM2.86419079 11.7943817c-.02451132-.3212323.21602857-.6015129.53726088-.6260242.3212323-.0245114.60151289.2160285.6260242.5372608C4.30474827 15.3394031 7.33739318 18.1666667 11 18.1666667c3.8661672 0 7-3.1338328 7-7 0-3.66260685-2.8272636-6.69525176-6.4610483-6.97252416-.3212323-.02451132-.5617722-.3047919-.5372609-.62602421.0245113-.3212323.3047919-.56177219.6260242-.53726087 4.240381.32355813 7.5389517 3.86174734 7.5389517 8.13580924 0 4.5104994-3.6561673 8.1666666-8.1666667 8.1666666-4.27406187 0-7.81225107-3.2985706-8.13580921-7.5389516z"></path></svg>
                                                </div>


                                            </div>



                                            <div className="block cardvente u-pad-horizontal-s flex  justbtw u-pad-top-s rad12 rad8res"  >

                                                <div className="w100">
                                                    <h4 className="nomar collab lightfibra whiteres">Commandes</h4>

                                                    <h2 className="u-mar-top-xs u-mar-bottom-xs-res u-mar-bottom-xs  fs24 fs15res semiboldfibra colhead whiteres" style={{borderBottom:'1px solid #eff4fa'}}>
                                                        {/*<NumberFormat value={this.state.weekdata.totalcmd}  displayType={'text'} thousandSeparator={true}  />*/}
--
                                                    </h2>

                                                    <div className="flex nonedisplayres">
                                                        <h2 className="u-mar-top-xs u-mar-bottom-xs-res u-mar-right-s fs13 flex itemcenter justcenter nomarvertical fs15res semiboldfibra  whiteres rad16" style={{background:'#dfe3e8',color:'#454f5b',padding:'1px 10px'}}>
        <span>
                {/*<NumberFormat value={this.state.weekdata.paycmd}  displayType={'text'} thousandSeparator={true}  />*/}
--
        </span>

                                                            <span className="fs11  lightfibra u-pad-left-xxs">payées</span>

                                                        </h2>

                                                        <h2 className="u-mar-top-xs u-mar-bottom-xs-res u-mar-right-s fs13 flex itemcenter justcenter nomarvertical fs15res semiboldfibra  whiteres rad16" style={{background:'#ffc58b',color:'#594430',padding:'1px 10px'}}>
  <span>
                      {/*<NumberFormat value={this.state.weekdata.unpaycmd}  displayType={'text'} thousandSeparator={true}  />*/}
--
  </span>

                                                            <span className="fs11  lightfibra u-pad-left-xxs">impayée(s)</span>

                                                        </h2>

                                                        <h2 className="u-mar-top-xs u-mar-bottom-xs-res u-mar-right-s fs13 flex itemcenter justcenter nomarvertical fs15res semiboldfibra  whiteres rad16" style={{background:'#ffea8a',color:'#595130',padding:'1px 10px'}}>
  <span>
                        {/*<NumberFormat value={this.state.weekdata.untraitcmd}  displayType={'text'} thousandSeparator={true}  />*/}
--
  </span>

                                                            <span className="fs11  lightfibra u-pad-left-xxs">à traiter</span>

                                                        </h2>

                                                    </div>
                                                </div>


                                                <div  className="cardicon flex itemcenter rad8 justcenter" style={{backgroundColor: 'rgb(255, 247, 234)'}} >



                                                    <svg  width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path  d="M4 16V4H2V2H5C5.26522 2 5.51957 2.10536 5.70711 2.29289C5.89464 2.48043 6 2.73478 6 3V15H18.438L20.438 7H8V5H21.72C21.872 5 22.022 5.03466 22.1586 5.10134C22.2952 5.16801 22.4148 5.26495 22.5083 5.38479C22.6019 5.50462 22.6668 5.6442 22.6983 5.79291C22.7298 5.94162 22.7269 6.09555 22.69 6.243L20.19 16.243C20.1358 16.4592 20.011 16.6512 19.8352 16.7883C19.6595 16.9255 19.4429 17 19.22 17H5C4.73478 17 4.48043 16.8946 4.29289 16.7071C4.10536 16.5196 4 16.2652 4 16ZM6 23C5.46957 23 4.96086 22.7893 4.58579 22.4142C4.21071 22.0391 4 21.5304 4 21C4 20.4696 4.21071 19.9609 4.58579 19.5858C4.96086 19.2107 5.46957 19 6 19C6.53043 19 7.03914 19.2107 7.41421 19.5858C7.78929 19.9609 8 20.4696 8 21C8 21.5304 7.78929 22.0391 7.41421 22.4142C7.03914 22.7893 6.53043 23 6 23ZM18 23C17.4696 23 16.9609 22.7893 16.5858 22.4142C16.2107 22.0391 16 21.5304 16 21C16 20.4696 16.2107 19.9609 16.5858 19.5858C16.9609 19.2107 17.4696 19 18 19C18.5304 19 19.0391 19.2107 19.4142 19.5858C19.7893 19.9609 20 20.4696 20 21C20 21.5304 19.7893 22.0391 19.4142 22.4142C19.0391 22.7893 18.5304 23 18 23Z" fill="#FFAC2F"></path></svg>

                                                </div>


                                            </div>



                                            <div className="block cardpour u-pad-horizontal-s  flex justbtw u-pad-vertical-s rad12 rad8res"  >

                                                <div>
                                                    <h4 className="nomar collab lightfibra whiteres">Visiteurs</h4>

                                                    <h2 className=" u-mar-top-xs u-mar-bottom-xs-res  fs24 fs15res semiboldfibra colhead whiteres" >
                                                        - </h2>

                                                </div>


                                                <div  className="cardicon flex itemcenter rad8 justcenter" style={{backgroundColor: 'rgba(255, 87, 87, 0.1)'}}>

                                                    <svg  width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path  d="M12 14V16C10.4087 16 8.88258 16.6321 7.75736 17.7574C6.63214 18.8826 6 20.4087 6 22H4C4 19.8783 4.84285 17.8434 6.34315 16.3431C7.84344 14.8429 9.87827 14 12 14ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11ZM18 21.5L15.061 23.045L15.622 19.773L13.245 17.455L16.531 16.977L18 14L19.47 16.977L22.755 17.455L20.378 19.773L20.938 23.045L18 21.5Z" fill="#FF5757"></path></svg>

                                                </div>


                                            </div>




                                        </div>


                                    </div>








                                    <div className="blok nopadres u-mar-top-m u-mar-bottom-s hauto rad16">

                                        <div className="flex justbtw itemcenter">
                                            <h2 className="colhead u-pad-left-m" >Ventes</h2>
                                            <h5 className="  fs12 resdisplay colhead u-pad-right-s"> {activedate == 1 ? 'Cette semaine' : activedate == 2 ? 'Ce mois' : 'Cette année'}</h5>

                                        </div>
                                        <div className="u-pad-horizontal-l u-pad-top-xs nopadres" >
                                          <HighchartsReact
                                                highcharts={Highcharts}
                                                options={chartOptions}
                                            />
                                    </div>








                                </div>



                                </div>
                            </div>


                        </Content>
                    </Layout>
                </Content>
            </Layout>



            );


}
