'use client'
import CustomTable from "../../../components/Table";
import Navbar from '../../../components/NavBar'
import Image from 'next/image'
import { useState } from "react";

export default function WebsiteResultPage() {
    const [websiteStatus , setWebsiteStatus] = useState()
    
    return (

        <div>

            <Navbar/>
            
            <div style={{lineHeight:0.5,marginTop:50,marginBottom:50}}>
                <h1 style={{display:'flex',flexDirection:'column',alignItems:'center',color:'green'}}>WEBSITE IS SAFE</h1>
                <p style={{display:'flex',flexDirection:'column',alignItems:'center',color:'blue',textDecoration:'underline',cursor:'pointer'}}>www.google.com</p>
            </div>

            <div style={{display:'flex',justifyContent:'center'}}> 
                <div style={{height:1.5,width:850,backgroundColor:'grey',display:'flex',alignItems:'center',justifyContent:'center'}}></div>
            </div>

            <div style={{lineHeight:0.3 , marginTop:50,marginBottom:50}}>
                <h1 style={{display:'flex',flexDirection:'column',alignItems:'center',color:'green'}}>90.2%</h1>
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

                <div style={{width : 600,boxShadow:'0 4px 8px rgba(0, 0, 0, 0.1)',borderRadius:10}}>
                    <CustomTable/>
                </div>
            </div>

            <div style={{display:'flex',justifyContent:'center',padding:70}}>
              <button style={{width:200,height:45,borderRadius:50,backgroundColor:'#333',color:'white',cursor:'pointer',fontSize:17,fontWeight:520}}> More Details</button>
            </div>

        </div>

    )}