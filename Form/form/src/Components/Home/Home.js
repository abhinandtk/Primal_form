import React, { useState } from 'react';
import './Home.css'

export default function Home() {
  const [formData, setFormData] = useState({
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

  const handleChange = (event, index, field) => {
    const { name, value } = event.target;
    if (field === 'abc') {
      const updatedAbc = [...formData.abc];
      updatedAbc[index][name] = value;
      setFormData({
        ...formData,
        abc: updatedAbc,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const addRow = () => {
    setFormData({
      ...formData,
      abc: [
        ...formData.abc,
        {
          Course: '',
          University: '',
          date: '',
        },
      ],
    });
  };

  const removeRow = (index) => {
    const updatedAbc = [...formData.abc];
    updatedAbc.splice(index, 1);
    setFormData({
      ...formData,
      abc: updatedAbc,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here, you can access the form data in `formData`
    console.log(formData);
  };

  return (
    <div className='bigb'>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="Name"
            value={formData.Name}
            onChange={(e) => handleChange(e, null, 'Name')}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="text"
            name="Email"
            value={formData.Email}
            onChange={(e) => handleChange(e, null, 'Email')}
          />
        </div>
        {formData.abc.map((field, index) => (
          <div key={index}>
            <label>Course</label>
            <input
              type="text"
              name="Course"
              value={field.Course}
              onChange={(e) => handleChange(e, index, 'abc')}
            />
            <label>University</label>
            <input
              type="text"
              name="University"
              value={field.University}
              onChange={(e) => handleChange(e, index, 'abc')}
            />
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={field.date}
              onChange={(e) => handleChange(e, index, 'abc')}
            />
            <button type="button" onClick={() => removeRow(index)}>
              Remove Row
            </button>
          </div>
        ))}
        <button type="button" onClick={addRow}>
          Add Row
        </button>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
