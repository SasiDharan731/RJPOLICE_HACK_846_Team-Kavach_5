'use client'
import Image from 'next/image';
import Navbar from '../../../components/NavBar';
import Link from 'next/link';
import { useState } from 'react';
import axios from 'axios';


export default function LandingPage() {
  const[input,setInput] = useState()
  const[fullInput,setFullInput] = useState()
  
  function handleStartProcessing() {

    setFullInput(input)

    axios.post('http://localhost:6000/getPhoneNumberDetails',{
      "phoneNumber" : "+919080111914"
    })
    .then(res =>{console.log(res)})
    
  }
  // console.log(fullInput);

  return (
    <div>
      <Navbar/>
      
      <div style={{ justifyContent: 'center', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        
        <Image src='/images/landing_2.jpg' width={500} height={500} style={{marginRight:90,marginTop:30 }} />
        
        <div style={{flexDirection:'column',display:'flex'}}>
          <input
            type='text'
            onChange={(e) => setInput(e.target.value)}
            placeholder={"Enter URL or Phone Number or Email ID"}
            style={{
              width: 600,
              height: 40,
              borderRadius: 10,
              marginTop: 80,
              borderWidth: 0.5,
              fontSize:15,
              padding:10,
              color:'grey'
            }}
          />

          <Link href="/loading" style={{display:'flex',alignSelf:'center',textDecoration:'none'}}>
            <button 
              onClick={() => handleStartProcessing()}
              style={{cursor:'pointer',width:200,height:60,borderRadius:40,marginTop:50,background:'#333', borderWidth:0,color:'white',fontSize:19,alignSelf:'center',fontWeight:600}}>Start Processing</button>
          </Link>

        </div>
      
      </div>
    </div>
  );
}
