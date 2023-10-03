import React, { useEffect, useState } from 'react';
import './Edit_page.css';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

export default function Edit_page() {
  const [user, setuser] = useState([]);
  const [educations, seteducations] = useState([]);
  const [update, setupdate] = useState({
    Name: '',
    Email: '',
    abc: [], // Initialize it as an empty array
  });

  const navigate = useNavigate();
  const [state, setState] = useState({
    Name: '',
    Email: '',
    abc: [],
  });

  useEffect(() => {
    const id = localStorage.getItem('id');
    console.log(id);
    axios
      .get(`http://127.0.0.1:8000/api/Getsingleproduct/${id}`)
      .then((response) => {
        console.log(response.data.data.education);
        setuser(response.data.data.user);
        
        // Ensure that abc is an array
        const abcArray = Array.isArray(response.data.data.abc)
          ? response.data.data.abc
          : [];
  
        setupdate({
          Name: response.data.data.Name,
          Email: response.data.data.Email,
          abc: abcArray,
        });
  
        seteducations(response.data.data.education);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  

  const inputchange = (e, field) => {
    const { name, value } = e.target;
    setupdate((prevState) => ({
      ...prevState,
      [field]: value
    }));

  };

  const handleformchange = (event, index, field) => {
    const { name, value } = event.target;
    const data = [...state[field]];
    data[index][name] = value;
    setState((prevState) => ({
      ...prevState,
      [field]: data
    }));
  };

  const removefields=(e,index)=>{
    e.preventDefault()
      console.log(index);
      let data=[...state.abc]
      console.log([...state.abc]);
      console.log(data);

      data.splice(index,1)
      console.log(data);

      setState((prev) => ({ ...prev, abc: data }));

  }

  const validateEmail = (email) => {
    // Regular expression for email validation
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zAZ0-9-]+)*$/;
    return validRegex.test(email);
  };

  const submit = (event) => {
    event.preventDefault();

    if (!validateEmail(update.Email)) {
      toast.error('Invalid or error email address!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      });
      return;
    }

    toast.dismiss();

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

    console.log(state);
  };

  const addField = () => {
    // Append an empty row to the abc array
    const newField = {
      Course: '',
      University: '',
      date: ''
    };
    setState((prevState) => ({
      ...prevState,
      abc: [...prevState.abc, newField]
    }));
  };
  const updatemethod=()=>{
    const id=localStorage.getItem('id')

    axios.put(`http://127.0.0.1:8000/api/Updatetwo/${id}`,update).then((response)=>{
      console.log(response);
      toast.success('Updated successfully!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      });

    }).catch((error)=>{
      console.log(error);
    })
  }
  const handleupdate = (event, index) => {
    const { name, value } = event.target;
    const updatedEducations = [...update.abc]; // Make a copy of the educations array
    updatedEducations[index] = {
      ...updatedEducations[index],
      [name]: value, // Update the specific field (Course, University, or Date)
    };
    setupdate({
      ...update,
      abc: updatedEducations, // Update the educations array in the update state
    });
  };
  
console.log(update);

  // console.log(state);
  // console.log(user.Email);
  // console.log(update.Email);

  return (
    <>
      <Navbar></Navbar>
      <div className="maindiv">
        <ToastContainer></ToastContainer>
        <div className="form">
          <form onSubmit={submit}>
            <>
              <div className="form-row">
                <div className="col-md-6 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="validationDefault01"
                    name="Name"
                    onChange={(e) => inputchange(e, 'Name')}
                    placeholder="Name"
                    defaultValue={user.Name}
                    required
                  ></input>
                </div>
                <div className="col-md-6 mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="validationDefault02"
                    name="Email"
                    onChange={(e) => inputchange(e, 'Email')}
                    placeholder="Email"
                    defaultValue={user.Email}
                    required
                  ></input>
                </div>
                <div className="col-md-4 mb-3"></div>
              </div>
              {educations.map((value, index) => (
                <div key={index} className="form-row">
                  <div className="col-md-4 mb-3">
                    <label htmlFor={`Course_${index}`}>Course</label>
                    <input
                      type="text"
                      className="form-control" 
                      name="Course"
                      defaultValue={value.Course}
                      onChange={(event) => handleupdate(event, index, 'abc')}

                    ></input>
                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor={`University_${index}`}>University</label>
                    <input
                      type="text"
                      className="form-control"
                      name="University"
                      onChange={(event) => handleupdate(event, index, 'abc')}
                      defaultValue={value.University}
                    ></input>
                  </div>
                  <div className="col-md-3 mb-3">
                    <label htmlFor={`Date_${index}`}>Date</label>
                    <input
                      onChange={(event) => handleupdate(event, index, 'abc')}
                      type="date"
                      className="form-control"
                      name="date"
                      defaultValue={value.date}
                    ></input>
                  </div>
                
                  <div className="col-md-1 mb-3">
                    <i class="bi bi-plus-square" onClick={addField}></i>
                            <i class="bi bi-x-square" onClick={(e)=>{removefields(e,index)}}></i>
                  </div>
                
                </div>
              ))}

              {state.abc.map((field, index) => (
                
                <div key={index} className="form-row">
                  <div></div>
                  <div className="col-4 mb-3">
                    <label htmlFor={`Course_${index}`}>Course</label>
                    <input
                      onChange={(event) => handleupdate(event, index)}
                      type="text"
                      className="form-control"
                      name="Course"
                      defaultValue={field.Course}
                      required
                    ></input>
                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor={`University_${index}`}>University</label>
                    <input
                      type="text"
                      className="form-control"
                      name="University"
                      onChange={(event) => handleupdate(event, index)}
                      defaultValue={field.University}
                      required
                    ></input>
                  </div>
                  <div className="col-md-3 mb-3">
                    <label htmlFor={`Date_${index}`}>Date</label>
                    <input
                      type="date"
                      className="form-control"
                      name="date"
                      onChange={(event) => handleupdate(event, index)}
                      defaultValue={field.date}
                      required
                    ></input>
                  </div>
                  <div className="col-md-1 mb-3">
                  <i class="bi bi-plus-square" onClick={addField}></i>
                            <i class="bi bi-x-square" onClick={(e)=>{removefields(e,index)}}></i>
                  
                  </div>
                </div>
              ))}

             
                <button className="btn btn-primary" type="submit" onClick={updatemethod}>
                Submit form
              </button>
              {/* <button className="btn btn-success" type="button" onClick={addField}>
                Add
              </button> */}

           
            </>
          </form>
        </div>
      </div>
    </>
  );
}

