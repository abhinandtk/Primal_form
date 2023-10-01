import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';

export default function Newhome() {
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
    <div className="divv">
    <form>
     
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="inputEmail4">Email</label>
      <input
          type="text"
          name="Name"
          value={update.Name}
          onChange={handlesChange}
        />    </div>
    <div class="form-group col-md-6">
      <label for="inputPassword4">Password</label>
      <input
          name="Email"
          type="text"
          value={update.Email}
          onChange={handlesChange}
        />    </div>
  </div>
  {update.abc.map((educationItem,index)=>(
    <>
    <div class="form-row">
 
 <div class="form-group col-md-3">
   <label for="inputZip">Zip</label>
   <input type="text"  value={educationItem.Course}
           onChange={(e) => handleEducationChange(e, index)} class="form-control" id="validationDefault03"   name='Course'  required></input>    </div>
 <div class="form-group col-md-3">
   <label for="inputZip">Zip</label>
   <input type="text" class="form-control"  value={educationItem.Uni}
           onChange={(e) => handleEducationChange(e, index)} id="validationDefault05"  name='University'  required></input>    </div>
 <div class="form-group col-md-3">
   <label for="inputZip">Zip</label>
   <input type="date" class="form-control"  value={educationItem.date}
           onChange={(e) => handleEducationChange(e, index)} id="validationDefault05" name='date'  required></input>    </div>
           <div class="col-md-1 mb-3">
                   <i class="bi bi-plus-square" onClick={addEducationField}></i>
                   <i class="bi bi-x-square" onClick={(e)=>{removeEducationField(e,index)}}></i>
                 </div>
</div>
    
    </>
            
            ))}
  
  

  <button type="button" class="btn btn-primary">Sign in</button>
</form>
    </div>
    </>
  )
}
