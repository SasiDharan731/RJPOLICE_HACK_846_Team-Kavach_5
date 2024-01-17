// ReportPage.js
'use client'
import Navbar from '../../../components/NavBar'
import '../report/page.css'
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';

export default function ReportPage() {

    const recorderControls = useAudioRecorder()
    const addAudioElement = (blob) => {
      const url = URL.createObjectURL(blob);
      const audio = document.createElement("audio");
      audio.src = url;
      audio.controls = true;
      document.getElementById('recorded_audio').appendChild(audio) 
    }

    return (
        <>
            <Navbar />
        <div className="container">
                <div style={{display:'flex',flexDirection:'row',justifyContent:'space-evenly',marginTop:15}}>
                            <button style={{padding:15,borderRadius:15,fontSize:18,fontWeight:550,backgroundColor:'#333',color:'white', border: '#ffffff80'}}>
                                Complient Details
                            </button>
                </div>

            <div className="form-container">
                <div className="form-input-container">
                        <div style={{display:'flex',justifyContent:'space-evenly'}}>
                            <div style={{marginTop:0,lineHeight:2,display:'flex',flexDirection:'column'}} >
                                    <label for='name' style={{fontWeight:500}}> Category of complaint : </label>
                                    <select style={{width:300,padding:8,borderRadius:10,borderWidth:0.3,fontSize:18}}>
                                        <option>Phishing attack using url</option>
                                        <option>Speaking vulnerabily in call</option>
                                        <option>Sending vulnerable messages</option>
                                    </select>
                                    <label for='name' style={{marginTop:10 , fontWeight:500}}>Approximate date & time of Incident :  </label>
                                    <input style={{width:300,padding:8,borderRadius:10,fontSize:18}} type='date'/>   
                                    <label for='name' style={{marginTop:10 ,fontWeight:500}}> Provide any proof : </label>
                                    <input style={{width:300,padding:8,borderRadius:10,fontSize:18}} type='file'/>   
                                    <label for='name' style={{marginTop:10,fontWeight:500}}>URL/Phone Number/Email : </label>
                                    <input style={{width:300,padding:8,borderRadius:10,fontSize:18}} type='text'/>   
                            </div>
                            <div style={{marginLeft : 50,marginTop:0,lineHeight:1.5,display:'flex',flexDirection:'column'}} >
                                    <label for='name' style={{marginTop:10,fontWeight:500}}> State : </label>
                                    <input style={{width:300,padding:8,borderRadius:10,borderWidth:0.3}} type='text'/>
                                    <label for='name' style={{marginTop:10,fontWeight:500}}> District : </label>
                                    <input style={{width:300,padding:8,borderRadius:10}} type='text'/>   
                                    <label for='name' style={{marginTop:10,fontWeight:500}}> Where did the incident occur? : </label>
                                    <input style={{width:300,padding:8,borderRadius:10}} type='text'/>
                                    <label for='name'style={{width:300,marginTop:10,fontWeight:500}}>Provide additional information about the incident : </label>
                                    <textarea style={{width:300,padding:8,borderRadius:10,borderWidth:0.3}} />
                            </div>
                        </div>
                        
                <h2 className="voice-report-heading" style={{alignSelf:'center'}}>Voice Report:</h2>

                <div className="voice-report-section">
                    <AudioRecorder
                        onRecordingComplete={(blob) => addAudioElement(blob)}
                        recorderControls={recorderControls}
                        className="voice-recorder"
                    />
                    <button
                        className="stop-recording-button"
                        onClick={recorderControls.stopRecording}
                    >
                        Stop recording
                    </button>
                    <div className="recorded-audio" id="recorded_audio"></div>
                </div>
            </div>
        </div>
        <button className="save-button">Save</button>
    </div>
    </>
    )
}
