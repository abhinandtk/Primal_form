import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';
import './Trial.css'

export default function Trial() {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [update, setUpdate] = useState({
    Name: '',
    Email: '',
    abc: [
      {
        Course: '',
        University: '',
        date: '',
      },
    ],
  });

  const submit = () => {
    const id = localStorage.getItem('id');
    console.log(id);
    axios.put(`http://127.0.0.1:8000/api/Updatetwo/${id}`, update).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error);
    });
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

        setData(responseData.data);
        setName(responseData.data.user.Name);
        setEmail(responseData.data.user.Email);
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
    updatedEducation.splice(index, 1);
    setUpdate({ ...update, abc: updatedEducation });
  };
  console.log(update);

  return (
    <>
    <Navbar></Navbar>

    <div className='mmdiv'>
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
        {update.abc.map((educationItem, index) => (
            <>
                  <div className='seconddiv' >

            <div key={index}>
              <label >Course</label>
              <input type="text"  value={educationItem.Course}
              onChange={(e) => handleEducationChange(e, index)} name='Course'  required></input>
            </div>
             <div className='text-center'>
              <label >University</label>
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
                   <i class="bi bi-x-square" onClick={(e)=>{removeEducationField(e,index)}}></i>
                 </div>
                 </div>

                 </>
        ))}


        <button onClick={submit}>Submit</button>
    </div>
    </>
  );
}
