'use client'
import React from "react"
import Navbar from "../../../components/NavBar"
import CustomTable from "../../../components/Table"


export default function moreDetails() {
    return (
        <div>
            <Navbar /> 
            <h3 style={{display:'flex',justifyContent:'center'}}>Sufficient details</h3>
            <div style={{display:'flex',justifyContent:'center',marginTop:50}}>
                <div style={{width : 1200,boxShadow:'0 4px 8px rgba(0, 0, 0, 0.1)',borderRadius:10}}> 
                    <CustomTable/>
                </div>
            </div>
        </div>
    )
}