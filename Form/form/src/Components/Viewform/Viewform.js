import React, { useEffect, useState } from 'react'
import './Viewform.css'
import Navbar from '../Navbar/Navbar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';
import { ToastContainer, toast } from 'react-toastify'



export default function Viewform() {
    const [state,setState]=useState([])
    const navigate=useNavigate()
    useEffect(()=>{
        axios.get('https://abhinand.9pc.in/api/GetCombinedData').then((response)=>{
            console.log(response.data.data);
            setState(response.data.data)
        }).catch((error)=>{
            console.log(error);
        })
    },[])

    const deletemethod=(logid)=>{
        console.log(logid);
        axios.delete(`https://abhinand.9pc.in/api/Deleteproduct/${logid}`).then((response)=>{
          toast.success('Deleted successfully!', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        
          });
          setInterval(set,700)
          function set(){
              
              window.location.reload()
          
          }
         
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
    {/* <div className='smallbox'>
      <input placeholder='search' style={{width:'125px',height:'40px'}} type="text" />
    <button className="searchbutton">Search</button>


    </div> */}



  

    <div className="box">
      <ToastContainer></ToastContainer>

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
          <Button style={{marginTop:'10px'}}onClick={()=>editmethod(value.id)} className='mr-3 buttons' variant="outlined">Edit</Button>
<Button 
type='submit'
  style={{marginTop:'10px'}} onClick={()=>deletemethod(value.id)} value='Delete' variant="outlined">Delete</Button>
         
        </div>
      </div>

    ))}
             </div>
             </div>

  
    </>
  )
}
