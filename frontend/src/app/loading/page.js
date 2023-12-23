'use client'
import Navbar from '../../../components/NavBar';
import Lottie from 'lottie-react';
import animationData from '../../../lottie-animation/loading_animation_2.json';
import Typewriter from 'typewriter-effect';


export default function loading() {
    return (
        <div style={{display:'flex',flexDirection:'column'}}>
          <Navbar/>
            
          <Lottie
            animationData={animationData}
            loop={true}
            autoplay={true}
            style={{width:450,height:450,display:'flex',alignSelf:'center',marginTop:30}}
          />

            <div style={{display:'flex',alignSelf:'center',fontSize:20,fontWeight:700}} onClick={() => navigate('/result')} >

            <Typewriter
                options={{
                    deleteSpeed:60,
                    strings: ['Gathering Informations🔍', 'Analayzing the potential threats...🕵🏽','Detecting the potential threats...⚡'],
                    autoStart: true,
                    loop: true,
                }}
            />
            
            </div>

        </div>
    )
}