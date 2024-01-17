'use client'
import Image from 'next/image';
import Navbar from '../../../components/NavBar';
import '../imageAnalysis/page.css'

export default function ImageAnalysis() {
    return(
        <>
        <Navbar/>
        <div className='container'>
            <div className='center' style={{flexDirection:'column',lineHeight:0.2,marginTop:25}}>
                <h1 className='good-score-text-color'>92%</h1>
                <p className='under-text-color'>Overall Image Score </p>
            </div>

            <div style={{width:550,height:1.5,backgroundColor:'grey',margin:18}} ></div>
            <div className='image-details-container center' style={{justifyContent:'space-evenly'}}>
                    <Image
                        src= '/images/rajasthan_police_banner.jpeg'
                        width={300}
                        height={330}
                        style={{borderRadius:15}}
                    />
                    <div>
                        <h3 >Image Score : <span className='good-score-text-color'>98.9% </span></h3>
                        <h3>Phone Number in Image Score : <span className='null-text'>--Null--</span> </h3>
                        <h3>URL in Image Score : <span className='good-score-text-color'>94.8% </span></h3>
                    </div>
            </div>
            <button className='more-details-button' style={{marginTop:30}}>More Details</button>
        </div>
        </>
    )
}