
import React, { useState } from 'react';
import moment from 'moment';
import 'moment/locale/fr';
import {DateRangePicker} from "react-dates";


import { Layout, Menu,Dropdown } from 'antd';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';


export default function  DatePick () {

    const [activedate,setActivedate] = useState(1)
    const [startDate,setStartDate] = useState(moment().hours(0).minutes(0))
    const [endDate,setEndDate] = useState(moment().hours(23).minutes(59).seconds(59))
    const [focusedInput,setFocusedInput] = useState(null)






    const handleDate = (startDate, endDate) => {


        setStartDate(startDate);
        setEndDate(endDate)

    }

   const handleFocusChange = focusedInput => setFocusedInput(focusedInput);




    const headmenu = () => {


        return (
            <div className="abs datecarddetail z999 bgwhite rad12 u-pad-m">


                <div className="encart abs"></div>


                <div className="u-pad-bottom-s u-mar-bottom-s " style={{borderBottom: '1px solid #eff4fa'}}>
                    <div className="Datesel">
                        <DateRangePicker showDefaultInputIcon isOutsideRange autoFocus calendarInfoPosition="before"
                                         small displayFormat="D MMM YYYY"
                                         isOutsideRange={() => false}
                                         numberOfMonths={1}
                                         orientation="vertical"
                                         endDate={endDate}
                                         endDateId="endDate"
                                         focusedInput={focusedInput}
                                         onDatesChange={handleDate}
                                         onFocusChange={handleFocusChange}
                                         startDate={startDate}
                                         startDateId="startDate"
                        />

                    </div>

                </div>




                <div className="simplegrid">
                    <button
                        className="rad8 w100 btn-default u-mar-right-s colhead justcenter cursor semiboldfibra"
                        // onClick={() => this.onChangeDate(1)}
                        style={{height: '40px'}}> Aujourdhui
                    </button>
                    <button
                        className="rad8 w100 btn-default u-mar-right-s colhead justcenter cursor semiboldfibra"
                        // onClick={() => this.onChangeDate(2)}
                        style={{height: '40px'}}> Hier
                    </button>

                    <button
                        className="rad8 w100 btn-default u-mar-right-s colhead justcenter cursor semiboldfibra"
                        // onClick={() => this.onChangeDate(3)}
                        style={{height: '40px'}}> Cette semaine
                    </button>
                    <button
                        className="rad8 w100 btn-default u-mar-right-s colhead justcenter cursor semiboldfibra"
                        // onClick={() => this.onChangeDate(4)}
                        style={{height: '40px'}}> Semaine passée
                    </button>

                    <button
                        className="rad8 w100 btn-default u-mar-right-s justcenter colhead cursor semiboldfibra"
                        // onClick={() => this.onChangeDate(5)}
                        style={{height: '40px'}}> Ce mois
                    </button>
                    <button
                        className="rad8 w100 btn-default u-mar-right-s justcenter colhead cursor semiboldfibra"
                        // onClick={() => this.onChangeDate(6)}
                        style={{height: '40px'}}> Mois passé
                    </button>

                    <button
                        className="rad8 w100  btn-default u-mar-right-s justcenter colhead cursor semiboldfibra"
                        // onClick={() => this.onChangeDate(7)}
                        style={{height: '40px'}}> Cette année
                    </button>

                    <button
                        className="rad8 w100  btn-default u-mar-right-s justcenter colhead cursor semiboldfibra"
                        // onClick={() => this.onChangeDate(7)}
                        style={{height: '40px'}}>  Année passée
                    </button>
                </div>

            </div>

        )


    }




    return (





        <Dropdown overlay={headmenu} trigger={['click']} placement="bottomLeft">

            <div
                className="rad8 bgwhite flex itemcenter justbtw  datecard justcenterres cursor "
            >

                <div className="info-icon u-mar-left-s nomarres flex itemcenter">
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none"
                         stroke="#0075ff" stroke-width="2" stroke-linecap="round"
                         stroke-linejoin="round" className="icon">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>

                </div>



                <div className=" u-mar-right-s fs15 nonedisplayres"> {activedate == 1 ? 'Aujourdhui' : activedate == 2 ? 'Hier' : activedate == 3 ? 'Cette semaine' : activedate == 4 ? 'Semaine passée' :  activedate == 5 ?  'Ce mois' : activedate == 6 ?  'Mois passé' : 'Cette année'}
                </div>




            </div>
        </Dropdown>





    );


}
