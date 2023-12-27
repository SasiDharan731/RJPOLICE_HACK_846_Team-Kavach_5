'use client'
import CustomTable from "../../../../components/Table";
import Navbar from "../../../../components/NavBar"
import Image from 'next/image'
import { useEffect, useState } from "react";
import Loading from "../../../../components/loading";
import axios from "axios";

import Link from "next/link";
import Component from "../../../../components/moreDetailsTable";



export default function WebsiteResultPage({params}) {

    const url = params.input
    const decodedInput = decodeURIComponent(url);
    console.log(decodedInput);

    const [loading,setLoading] = useState(true)
    const [details,setDetails] = useState()
    const [buttonClicked,setButtonClicked] = useState(false)
    const[textColor,setTextColor] = useState(false)

    let dataArray = []

    useEffect(() => {
            axios.post('http://localhost:8080/getUrlScore',{
                "url" : `${decodedInput}`
            })
            .then(res =>{ 
                console.log(res.data);
                setLoading(false)
                setDetails(res.data)
                // if(res.data.url_score * 100 > 70){
                //     setTextColor(true)
                // }
            })
            
    },[])
    
    function handleMoreDetails() {
        const moreDetailsButton =  document.getElementById('moreDetailsButton')
        moreDetailsButton.textContent = 'More Details'
        setButtonClicked(true)
        console.log(details.url_score*100);
     
    }
    return (
        <div>
            <Navbar/>
            { loading ?
                <Loading/> :    
                
            <>
            
            <div style={{lineHeight:0.5,marginTop:50,marginBottom:50}}>
                <h1 style={{display:'flex',flexDirection:'column',alignItems:'center',color: 'green'}}>{details.message.toUpperCase()}</h1>
                <p style={{display:'flex',flexDirection:'column',alignItems:'center',color:'blue',textDecoration:'underline',cursor:'pointer'}}>{details.report.UsingIp.value}</p>
            </div>

            <div style={{display:'flex',justifyContent:'center'}}> 
                <div style={{height:1.5,width:950,backgroundColor:'grey',display:'flex',alignItems:'center',justifyContent:'center'}}></div>
            </div>

            <div style={{lineHeight:0.3 , marginTop:50,marginBottom:50}}>
                <h1 style={{display:'flex',flexDirection:'column',alignItems:'center',color: textColor ? 'green' : 'red'}}>{(details.url_score * 100).toFixed(1)}%</h1>
                <p style={{display:'flex',flexDirection:'column',alignItems:'center',color:'grey',fontWeight:600}}>Score</p>
            </div>

            <div style={{display:'flex',justifyContent:'center'}}> 
                <div style={{height:1.5,width:650,backgroundColor:'grey',display:'flex',alignItems:'center',justifyContent:'center'}}></div>
            </div>

            <h4 style={{display:'flex',justifyContent:'center',padding:50,fontSize:25}} >Basic Info</h4>

            <div style={{display:'flex',alignItems:'center',justifyContent:'space-evenly'}}>
                <div>
                    <Image style={{}} src="/images/website_shots.png" height={350} width={500}  />
                    <p style={{color:'grey',fontWeight:600,display:'flex',justifyContent:'center'}}>ScreenShot</p>
                </div>
                <div style={{width : 800,height:280,boxShadow:'0 4px 8px rgba(0, 0, 0, 0.1)',borderRadius:10}}>
               
                    <CustomTable nodes={[details]}/>
                </div>
            </div>

            <div id="moreDetailsButton" style={{display:'flex',justifyContent:'center',padding:70,flexDirection:'column',alignItems:'center'}}>

                <button 
                    onClick={() => handleMoreDetails()}
                    style={{width:200,height:45,borderRadius:50,backgroundColor:'#333',color:'white',cursor:'pointer',fontSize:17,fontWeight:520}}>
                    More Details
                </button>

                {
                    buttonClicked ? 
                    <div style={{width : 1000,height:1580,marginTop:40,borderWidth:2,borderColor:"black",boxShadow:'0 4px 8px rgba(0, 0, 0, 0.1)',borderRadius:10}}>
               
                    <Component nodes={[details]}/>
                </div>: null
                }
            </div>
            </>
    }
        </div>

    )}