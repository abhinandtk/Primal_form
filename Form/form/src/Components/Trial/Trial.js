import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';
import './Trial.css'
import { ToastContainer, toast } from 'react-toastify';


export default function Trial() {
  const [update, setUpdate] = useState({
  });

  const submit = () => {
    const id = localStorage.getItem('id');
    console.log(update);
    console.log(id);
    axios.put(`http://127.0.0.1:8000/api/Updatetwo/${id}`, update).then((response) => {
      console.log(response);
      toast.success('Emaiil updated successfully', {
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
        const response = await fetch(`http://127.0.0.1:8000/api/Getsingleproduct/${id}`);
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
        <input
          type="text"
          name="Name"
          value={update.Name}
          onChange={handlesChange}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          name="Email"
          type="text"
          value={update.Email}
          onChange={handlesChange}
        />
      </div>
      </div>
        {update.abc?.map((educationItem, index) => (
            <>
                  <div className='seconddiv' >

            <div key={index}>
              <label >Course</label>
              <input type="text"  value={educationItem.Course}
              onChange={(e) => handleEducationChange(e, index)} name='Course'  required></input>
            </div>
             <div className='text-center'>
              <label >University{index}</label>
              <input type="text"   value={educationItem.University}
              onChange={(e) => handleEducationChange(e, index)}  name='University'  required></input>
            </div>
            <div className='text-center'>
              <label >Date</label>
              <input type="date"   value={educationItem.date}
              onChange={(e) => handleEducationChange(e, index)} id="validationDefault05" name='date'  required></input>
            </div>
            <div className='button' >
                   <i class="bi bi-plus-square" onClick={addEducationField}></i>
                   <i class="bi bi-x-square" onClick={(e)=>{removeEducationField(index)}}></i>
                 </div>
                 </div>

                 </>
        ))}


        <button onClick={submit}>Submit</button>
    </div>
    </div>

    </>
  );
}
