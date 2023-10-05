import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';
import './Trial.css'
import { ToastContainer, toast } from 'react-toastify';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { Add } from '@mui/icons-material';



export default function Trial() {
  const [update, setUpdate] = useState({});

  const submit = () => {
    const id = localStorage.getItem('id');
    console.log(update);
    console.log(id);
    axios.put(`https://abhinand.9pc.in/api/Updatetwo/${id}`, update).then((response) => {
      console.log(response);
      toast.success('Updated successfully', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      });
    }).catch((error) => {
      console.error('Error:', error);
     

    });
    if (!update.Name || !update.Email || update.abc.some((item) => !item.Course || !item.University || !item.date)) {
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
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = localStorage.getItem('id');
        const response = await fetch(`https://abhinand.9pc.in/api/Getsingleproduct/${id}`);
        const responseData = await response.json();

        // Initialize update state with existing data
        setUpdate({
          Name: responseData.data.user.Name,
          Email: responseData.data.user.Email,
          abc: responseData.data.education,
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handlesChange = (event) => {
    const { name, value } = event.target;
    setUpdate({ ...update, [name]: value });
  };

  const handleEducationChange = (event, index) => {
    const { name, value } = event.target;
    const updatedEducation = [...update.abc];
    updatedEducation[index][name] = value;
    setUpdate({ ...update, abc: updatedEducation });
  };

  const addEducationField = () => {
    setUpdate((prevState) => ({
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
  };

  const removeEducationField = (index) => {
    const updatedEducation = [...update.abc];
    console.log(index);
    updatedEducation.splice(index, 1);
    console.log(updatedEducation);
    setUpdate({ ...update, abc: updatedEducation });
  };
  console.log(update);

  return (
    <>
    <Navbar></Navbar>
    <div className="bdiv">
    <div className='mmdiv'>
      <ToastContainer></ToastContainer>
      <div className="firstrow">
      <div>
        <label>Name:</label>
        <TextField    type="text"
          name="Name"
          value={update.Name}
          onChange={handlesChange}/>
      </div>
      <div>
        <label>Email:</label>
        <TextField  name="Email"
          type="email"
          value={update.Email}
          onChange={handlesChange}></TextField>
      </div>
      </div>
        {update.abc?.map((educationItem, index) => (
            <>
                  <div className='seconddiv' >


            <div className='' key={index}>
              <TextField  id="standard-basic"   variant="standard" placeholder='Course'  type="text"   value={educationItem.Course}
              onChange={(e) => handleEducationChange(e, index)}  name='Course'  required/>
            </div>
             <div className='text-center'>
              <TextField id="standard-basic"    variant="standard" placeholder='University'  type="text"   value={educationItem.University}
              onChange={(e) => handleEducationChange(e, index)}  name='University'  required/>
            </div>
            <div className='text-center'>
              <TextField id="standard-basic"   variant="standard" placeholder='Year'  type="date"   value={educationItem.date}
              onChange={(e) => handleEducationChange(e, index)}  name='date'  required/>
            </div>
            <div className='buttonns' >
                   <Button  style={{padding:'3px 12px',minWidth:'39px'}} variant="outlined"onClick={(e)=>{removeEducationField(index)}} startIcon={<DeleteIcon />}></Button>
                 </div>
                 </div>

                 </>
        ))}


<Button  variant="contained" onClick={submit}>Update</Button>
        <Button  variant="outlined"onClick={addEducationField} startIcon={<Add />}></Button>
    </div>
    </div>

    </>
  );
}
