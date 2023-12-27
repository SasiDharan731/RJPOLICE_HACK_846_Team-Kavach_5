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
        
        <div>
            <Navbar/>
            <div style={{display:'flex',flexDirection:'column',justifyContent:'center',marginTop:20}}>
                        <div style={{display:'flex',flexDirection:'row',justifyContent:'space-evenly',marginTop:0}}>
                            <button style={{padding:15,borderRadius:15,fontSize:18,fontWeight:550,backgroundColor:'#333',color:'white', border: '#ffffff80'}}>
                                Complient Details
                            </button>
                        </div>

                        <div style={{width: '50%',height: 590,display:'flex',justifyContent:'space-evenly',flexDirection:'column',alignSelf:'center',marginTop:30,borderRadius:30,backgroundColor: 'white',boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)'}}>
                            <div style={{display:'flex',justifyContent:'space-evenly'}}>
                            <div style={{marginTop:25,lineHeight:2,display:'flex',flexDirection:'column'}} >
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
                            <div style={{marginLeft : 50,marginTop:25,lineHeight:1.5,display:'flex',flexDirection:'column'}} >
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
                        
                        <h2 style={{alignSelf:'center',color:'grey'}}>Voice Report:</h2>

                        <div style={{justifyContent:'center',display:'flex',marginBottom:40}}>
                                <AudioRecorder
                                    onRecordingComplete={(blob) => addAudioElement(blob)}
                                    recorderControls={recorderControls}
                                />
                                <button
                                style={{padding:15,borderRadius:15,fontSize:18,marginLeft:10,fontWeight:550,backgroundColor:'#333',color:'white', border: '#ffffff80'}}
                                onClick={recorderControls.stopRecording}>Stop recording</button>
                                <div style={{marginLeft : 5}} id='recorded_audio' ></div>
                        </div>

                    </div>
                        
                    <button 
                    style={{alignSelf:'center',marginTop:20,padding:15,width:180,backgroundColor:'#0045f5',color:'white',borderWidth:0,borderRadius:40,fontWeight:550,fontSize:18}}>
                        Save
                    </button>
                
                </div>            
        </div>
    )}