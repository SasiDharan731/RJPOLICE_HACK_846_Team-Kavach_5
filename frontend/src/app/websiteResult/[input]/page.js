'use client'
import CustomTable from "../../../../components/Table";
import Navbar from "../../../../components/NavBar"
import Image from 'next/image'
import { useEffect, useState } from "react";
import Loading from "../../../../components/loading";
import axios from "axios";
import Component from "../../../../components/moreDetailsTable";
import '../[input]/page.css'

export default function WebsiteResultPage({params}) {

    const url = params.input
    const decodedInput = decodeURIComponent(url);
    console.log(decodedInput);

    const [loading,setLoading] = useState(true)
    const [details,setDetails] = useState()
    const [buttonClicked,setButtonClicked] = useState(false)
    const[textColor,setTextColor] = useState(false)

    useEffect(() => {
            axios.post('http://localhost:8080/getUrlScore',{
                "url" : `${decodedInput}`
            })
            .then(res =>{ 
                console.log(res.data);
                setLoading(false)
                setDetails(res.data)
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
        <div className="centered-text container">
            <h1 className="green-text">{details.message.toUpperCase()}</h1>
            <p className="underline-text">{details.report.UsingIp.value}</p>
        </div>

        <div style={{display:'flex',justifyContent:'center'}}> 
            <div style={{height:1.5,width:950,backgroundColor:'grey',display:'flex',alignItems:'center',justifyContent:'center'}}></div>
        </div>

        <div className="score-section container">
            <h1 className={`score-value ${textColor ? 'green-text' : 'red-text'}`}>
                {(details.url_score * 100).toFixed(1)}%
            </h1>
            <p className="score-label">Score</p>
        </div>

        <div style={{display:'flex',justifyContent:'center'}}> 
            <div style={{height:1.5,width:650,backgroundColor:'grey',display:'flex',alignItems:'center',justifyContent:'center'}}></div>
        </div>

        <h4 className="basic-info-heading">Basic Info</h4>

        <div className="info-section">
            <div className="screenshot-container">
                <Image className="screenshot-image" src="/images/website_shots.png" height={350} width={500} />
                <p className="screenshot-label">ScreenShot</p>
            </div>
            <div className="custom-table-container">
                <CustomTable nodes={[details]} />
            </div>
        </div>

        <div className="more-details-section" id="moreDetailsButton">
            <button
                className="more-details-button"
                onClick={() => handleMoreDetails()}
            >
            More Details
            </button>

        {buttonClicked ? (
            <div className="more-details-component">
            <Component nodes={[details]} />
            </div>
        ) : null}
        </div>

    </>
    }
        </div>

    )}