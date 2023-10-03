import React, { useEffect, useState } from 'react'
import './Viewform.css'
import Navbar from '../Navbar/Navbar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Viewform() {
    const [state,setState]=useState([])
    const [smallstate,setsmall]=useState([])
    const navigate=useNavigate()
    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/api/GetCombinedData').then((response)=>{
            console.log(response.data.data);
            setState(response.data.data)
        }).catch((error)=>{
            console.log(error);
        })
    },[])

    const deletemethod=(logid)=>{
        console.log(logid);
        axios.delete(`http://127.0.0.1:8000/api/Deleteproduct/${logid}`).then((response)=>{
            window.location.reload()
            console.log(response);
        }).catch((error)=>{
            console.log(error);
        })

    }
    const editmethod=(logid)=>{
        localStorage.setItem('id',logid)
        navigate('/Trial')

    }
    const reversedState = [...state].reverse();



  return (
    <>
    <Navbar></Navbar>
    <div className="bigbox">
    <div className="box">

    {reversedState.map((value,key)=>(
         <div class="card" style={{width:'22rem'}}>'
        <div class="card-body">
          <h5 class="card-title">id:{value.id}</h5>
          <h5 class="card-title">Name:{value.Name}</h5>
          <h5 class="card-title">Email:{value.Email}</h5>
          {value.education.map((val,key)=>(<>
          <div className="box2">
             <h6 class="card-subtitle mb-2 ">Course.:{val.Course}</h6>
             <h6 class="card-subtitle mb-2 ">University:{val.University}</h6>
             <h6 class="card-subtitle mb-2 ">Date:{val.date}</h6>            
             </div>
             </>

          ))}
           <input type="button" value='Edit' onClick={()=>editmethod(value.id)} className='mr-3 buttons'/>
             <input type="button" className='buttons' onClick={()=>deletemethod(value.id)} value='Delete'/>
         
        </div>
      </div>

    ))}
             </div>
             </div>

  
    </>
  )
}
