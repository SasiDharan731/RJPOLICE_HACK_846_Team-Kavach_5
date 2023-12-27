'use client'
import Lottie from 'lottie-react';
import animationData from '../lottie-animation/loading_animation_2.json';
import Typewriter from 'typewriter-effect';

export default function Loading() {

    return (
        <div style={{display:'flex',flexDirection:'column'}}>
        
          <Lottie
            animationData={animationData}
            loop={true}
            autoplay={true}
            style={{width:450,height:450,display:'flex',alignSelf:'center',marginTop:30}}
          />

            <div style={{display:'flex',alignSelf:'center',fontSize:20,fontWeight:700,color:'grey'}} onClick={() => navigate('/result')} >

            <Typewriter
                options={{
                    delay :30,
                    deleteSpeed:10,
                    strings: ['Gathering Informations🔍', 'Analayzing the potential threats...🕵🏽','Detecting the potential threats...⚡'],
                    autoStart: true,
                    loop: true,
                    skipAddStyles:true
                }}
            />
            
            </div>

        </div>
    )
}