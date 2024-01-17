'use client'
import Navbar from '../../../../components/NavBar'
import { useEffect, useState } from "react";
import Loading from "../../../../components/loading";
import axios from "axios";
import Component from '../../../../components/phoneNumberTable';

export default function PhoneNumberResultPage({params}) {
    
    const phoneNumber = params.input
    console.log(phoneNumber);

    const [loading,setLoading] = useState(true)
    const [details,setDetails] = useState()

    let textColor

    useEffect(() => {
        axios.post('http://localhost:8080/getPhoneNumberDetails',{
            "phoneNumber" : `${phoneNumber}`
      })
        .then(res =>{ 
            console.log(res);
            setLoading(false)
            setDetails(res.data)
            // textColor = details.data[0].value.score * 100 > 70 ? 'green' : 'red' 
        })
},[])

    return (

        <div>
            <Navbar/>

            {   
                loading ? 
                <Loading/> : 
                
            <> 

            <div style={{lineHeight:0.5,marginTop:50,marginBottom:50}}>
                
                <h1 style={{display:'flex',flexDirection:'column',alignItems:'center',color:'green'}}>{
                    details.data[0].value.score * 100 > 70 ? "PHONE NUMBER IS SAFE" : "PHONE NUMBER IS NOT SAFE"
                }</h1>
                <p style={{display:'flex',flexDirection:'column',alignItems:'center',color:'blue',textDecoration:'underline',cursor:'pointer'}}>{details.data[0].key}</p>
            </div>

            <div style={{display:'flex',justifyContent:'center'}}> 
                <div style={{height:1.5,width:850,backgroundColor:'grey',display:'flex',alignItems:'center',justifyContent:'center'}}></div>
            </div>

            <div style={{lineHeight:0.3 , marginTop:50,marginBottom:50}}>
                <h1 style={{display:'flex',flexDirection:'column',alignItems:'center',color:'green'}}>{(details.data[0].value.score * 100).toFixed(1)}% </h1>
                <p style={{display:'flex',flexDirection:'column',alignItems:'center',color:'grey',fontWeight:600}}>Score</p>
            </div>

            <div style={{display:'flex',justifyContent:'center'}}> 
                <div style={{height:1.5,width:650,backgroundColor:'grey',display:'flex',alignItems:'center',justifyContent:'center'}}></div>
            </div>

            <h4 style={{display:'flex',justifyContent:'center',padding:50,fontSize:25}} >Basic Info</h4>

            <div style={{display:'flex',alignItems:'center',justifyContent:'space-evenly'}}>
                <div style={{width : 600,boxShadow:'0 4px 8px rgba(0, 0, 0, 0.1)',borderRadius:10}}>
                    <Component nodes={[details]} />
                </div>
            </div>

            <div style={{display:'flex',justifyContent:'center',padding:70}}>
              <button style={{width:200,height:45,borderRadius:50,backgroundColor:'#333',color:'white',cursor:'pointer',fontSize:17,fontWeight:520}}> More Details</button>
            </div>

        </>
        }
        </div>
    )}