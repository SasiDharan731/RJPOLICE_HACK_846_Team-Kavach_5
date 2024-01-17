'use client'
import Image from 'next/image';
import Navbar from '../../../components/NavBar';
import { useState } from 'react';
import { useRouter } from 'next/navigation'
import Link from 'next/link';
import axios from 'axios';

import Dropzone from 'react-dropzone'
import '../landing/page.css'
import upload from '../../../public/images/upload.png'

import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LandingPage() {
  const[input,setInput] = useState()
  const[toastLoading,setToastLoading] = useState(false)
  const router = useRouter()

  function handleStartProcessing() {
    const url_regex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(input)
    const mobileNumber_regex = /^(\+91-|\+91|0)?[6789]\d{9}$/.test(input);
    if (url_regex){
      const encodedInput = encodeURIComponent(input);
        router.push(`/websiteResult/${encodedInput}`)
        // axios.post('http://localhost:5000/scrapHtml',{
        //   "url" : `${input}`
        // },

        axios.post('http://localhost:8080/scrapHtml',{
          "url" : `${input}`
        },

        ).then(res =>{
          console.log(res)
        })

    }
    else if(mobileNumber_regex){
      router.push(`/phoneNumberResult/${input}`)
    }
    else{
      setToastLoading(true)
    }
}
const notify = () => toast("Wow so easy!");
toast.error('Provide the correct input ⚡', {
  // position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  });

  return (
    <div>
      <Navbar/>
      
      <div style={{ justifyContent: 'center', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        
        <Image src='/images/landing_2.jpg' width={500} height={500} style={{marginRight:90,marginTop:30 }} />
        
        <div style={{flexDirection:'column',display:'flex',alignItems:'center'}}>
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
            <button 
              onClick={() => handleStartProcessing()}
              style={{cursor:'pointer',width:200,height:60,borderRadius:40,marginTop:50,background:'#333', borderWidth:0,color:'white',fontSize:19,alignSelf:'center',fontWeight:600}}>
                Start Processing
            </button>

            <div className='videoUpload__or'>
              <hr width="80"/>
              <h3>OR</h3>
              <hr width="80"/>
            </div>

          <div style={{alignSelf:'center'}}>
            <div className='videoUpload__upload'>
              <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
                    {({getRootProps, getInputProps}) => (
                      <section>
                        <div {...getRootProps()}>
                          <input {...getInputProps()} />
                          <Image className='videoUpload__upload__icon' src={upload}/> 
                          <p style={{color:'white',fontWeight:600}}>Drag 'n' drop image to validate</p>
                        </div>
                      </section>
                    )}
               </Dropzone>
                <Link href='/imageAnalysis'>
                  <div className='right-arrow-container'>
                    <Image
                      src='/images/right_arrow.png'
                      width={20}
                      height={20}
                    />
                  </div>
                </Link>
          </div>
         </div>

        </div>
      </div>

      { toastLoading ?  
        <div>
          <ToastContainer
          position="down-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          />
        </div> : null
      }

    </div>
  );
}
