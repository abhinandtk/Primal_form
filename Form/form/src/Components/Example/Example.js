import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import './Example.css'





export default function Example() {
    const navigate=useNavigate()
    const [state,setState]=useState({
        Name:"",
        Email:"",
        abc:
        [

        {Course:'',
        University:'',
        date:'',
     }
    ]})
    const inputchange=(e)=>{
        const {name,value}=e.target
        console.log(e.target);
        setState({...state,[name]:value})
      
    }
    
    const handleformchange=(event,index)=>{
        console.log(index,event.target.value);
        let data=[...state.abc]
        data[index][event.target.name]=event.target.value
        setState({ ...state, abc: data })

    }

    const validateEmail = (email) => {
        // Regular expression for email validation
        const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        console.log(validRegex.test(email));
        return validRegex.test(email);
      };
    const submit=(event)=>{
        event.preventDefault()
        
        if (!validateEmail(state.Email)) {
            toast.error('Invalid or error email address!', {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'light',
            });
            return;
          }

          toast.dismiss();

          // Check for empty fields
          if (!state.Name || !state.Email || state.abc.some((item) => !item.Course || !item.University || !item.date)) {
            toast.error('Empty field!', {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'light',
            });
            return;
          }


        console.log(state);
        axios.post('https://abhinand.9pc.in/api/Register',state).then((response)=>{
            toast('User registered successfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            setInterval(set,700)
            function set(){
                
                window.location.reload()
            
            
            
                            
                        console.log(response);

            }
           
        }).catch((error)=>{
            console.log(error);
        })
    }
    const addfields=()=>{
      setState((prevState) => ({
        ...prevState,
        abc: [
          ...prevState.abc,
          {
            Course: '',
            University: '',
            date: '',
  
          },
        ],
      }));
    }
      const removefields = (index) => {
        if(state.abc.length > 1 ){
          const updatedEducation = [...state.abc]; // Create a copy of the original array

          updatedEducation.splice(index, 1); // Remove one element at the specified index
          console.log(index);
          console.log(updatedEducation);
  
          setState({ ...state, abc: updatedEducation });

        }
       
      };
      

    
    console.log(state);
    
   
  return (
<>
    <Navbar></Navbar>
        <div className='maindiv'>
            <ToastContainer></ToastContainer>
        <div className="form">
        <form onSubmit={submit} >
                <>
                 <div class="form-row first">
                 <div class="col-md-6 mb-3">
                   <input type="text" class="form-control" id="validationDefault01" name='Name'  onChange={inputchange}  placeholder='Name'  required></input>
                 </div>
                 <div class="col-md-6 mb-3">
                   <input type="Email" class="form-control" id="validationDefault02" name='Email' onChange={inputchange}  placeholder='Email'  required></input>
                 </div>
                 <div class="col-md-4 mb-3">
             
                 </div>
               </div>
               <div class="form-row second">
               {state.abc.map((value,index)=>(

                     <>
                     <div key={index} class="col-md-3 mb-3">
                       <label for="validationDefault03">Course</label>
                       <input type="text" class="form-control" id="validationDefault03" value={value.Course} onChange={(event)=>{handleformchange(event,index)}} name='Course'  required></input>
                     </div>
                      <div class="col-md-3 mb-3">
                       <label for="validationDefault05">University</label>
                       <input type="text" class="form-control" id="validationDefault05" value={value.University} onChange={(event)=>{handleformchange(event,index)}} name='University'  required></input>
                     </div>
                     <div class="col-md-3 mb-3">
                       <label for="validationDefault05">Date</label>
                       <input type="date" class="form-control" id="validationDefault05" value={value.date} onChange={(event)=>{handleformchange(event,index)}} name='date'  required></input>
                     </div>
                     <div class="col-md-2 mb-3 buttonn">
                            <button class="btn btn-outline-primary" type='button'  onClick={(e) =>{removefields(index)}}>Remove</button>
                          </div>
                          </>
                          ))}

               </div>
               <button class="btn btn-primary subb"  type="submit" onClick={submit} >Submit</button>
               <button class="btn addb btn-outline-primary "   onClick={addfields}>Add Course</button>

               </>

 
</form>
        </div>
        </div>

    </>  )
}
