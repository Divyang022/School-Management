import { useState } from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import axios from 'axios';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from 'mdb-react-ui-kit';

import { BASE_URL } from './helper';

function Login() {

  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [type, setType] = useState(''); 
  const [gender, setGender] = useState('');  
  const [city, setCity] = useState('');
  const [state, setState] = useState(''); 
  const [password, setPassword] = useState('');


  const handleSave = async () => {
    try {

      if (!name || !email || !phone || !password | !type) {
        alert('Name, Email, and Phone are required fields.');
        return;
      }

      if (!name.match(/^[A-Za-z ]+$/)) {
        alert('Name should contain only alphabets.');
        return;
      }

      if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
        alert('Invalid email format.');
        return;
      }

      if (!phone.match(/^[0-9]+$/)) {
        alert('Phone should contain only numbers.');
        return;
      }

      

      const formData = {
        name,
        email,
        phone,
        gender,
        type,
        city,
        state,
        password,
      };
  
      // Make a POST request to the backend
      await axios.post(`${BASE_URL}signup`, formData);
  
      // Display a success message
      alert('Signup successful!');

      // Redirect to the signup page using navigate
      navigate('/');
    } catch (error) {
      
        if (error.response && error.response.status === 400 && error.response.data.error === 'Email is already in use') {
        alert('Email is already in use');
      } 
    }
  };

  

  return (
    <MDBContainer fluid>
      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>
          <MDBCard
            className='bg-dark text-white my-5 mx-auto'
            style={{ borderRadius: '1rem', maxWidth: '400px' }}
          >
            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
              <h2 className='fw-bold mb-2 text-uppercase'>Sign Up</h2>
              <p className='text-white-50 mb-5'>Please fill in the details to create an account!</p>

              <MDBInput
                wrapperClass='mb-4 mx-5 w-100'
                labelClass='text-white'
                label='Name'
                id='name'
                type='text'
                size='lg'
                onChange={(e) => setName(e.target.value)}
                value={name}
                pattern="[A-Za-z ]+"
              />
              <MDBInput
                wrapperClass='mb-4 mx-5 w-100'
                labelClass='text-white'
                label='Email address'
                id='email'
                type='email'
                size='lg'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
              />
              <MDBInput
                wrapperClass='mb-4 mx-5 w-100'
                labelClass='text-white'
                label='Phone'
                id='phone'
                type='tel'
                size='lg'
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                pattern="[0-9]+"
              />

            <div className='mb-4 mx-5 w-100'>
            <label className='text-white'>Gender</label>
            <div className='d-flex'>
            <div className='form-check form-check-inline'>
             <input
                 className='form-check-input'
                 type='radio'
                 name='gender'
                 id='male'
                 value='male'
                 checked={gender === 'male'}
                 onChange={() => setGender('male')}
             />
           <label className='form-check-label text-white' htmlFor='male'>
             Male
            </label>
            </div>
            <div className='form-check form-check-inline'>
             <input
                 className='form-check-input'
                 type='radio'
                 name='gender'
                 id='female'
                 value='female'
                 checked={gender === 'female'}
                 onChange={() => setGender('female')}
            />
            <label className='form-check-label text-white' htmlFor='female'>
             Female
            </label>
            </div>
             <div className='form-check form-check-inline'>
             <input
                 className='form-check-input'
                 type='radio'
                 name='gender'
                 id='others'
                 value='others'
                 checked={gender === 'others'}
                 onChange={() => setGender('others')}
            />
            <label className='form-check-label text-white' htmlFor='others'>
             Others
            </label>
            </div>
            </div>
            </div>

            <div className='mb-4 mx-5 w-100'>
  
</div>

<div className='mb-4 mx-5 w-100'>
            <label className='text-white'>Type</label>
            <div className='d-flex'>
            <div className='form-check form-check-inline'>
             <input
                 className='form-check-input'
                 type='radio'
                 name='teacher'
                 id='teacher'
                 value='teacher'
                 checked={type === 'teacher'}
                 onChange={() => setType('teacher')}
            />
            <label className='form-check-label text-white' htmlFor='teacher'>
             Teacher
            </label>
            </div>
             <div className='form-check form-check-inline'>
             <input
                 className='form-check-input'
                 type='radio'
                 name='type'
                 id='student'
                 value='student'
                 checked={type === 'student'}
                 onChange={() => setType('student')}
            />
            <label className='form-check-label text-white' htmlFor='student'>
             Student
            </label>
            </div>
            <div className='form-check form-check-inline'>
             <input
                 className='form-check-input'
                 type='radio'
                 name='Management'
                 id='Management'
                 value='Management'
                 checked={type === 'Management'}
                 onChange={() => setType('Management')}
            />
            <label className='form-check-label text-white' htmlFor='Management'>
             Management
            </label>
            </div>
            </div>
            </div>

            <div className='mb-4 mx-5 w-100'>
  
</div>




            <MDBInput
                wrapperClass='mb-4 mx-5 w-100'
                labelClass='text-white'
                label='City'
                id='city'
                type='text'
                size='lg'
                onChange={(e) => setCity(e.target.value)}
                value={city}
              />



              <MDBInput
                wrapperClass='mb-4 mx-5 w-100'
                labelClass='text-white'
                label='State'
                id='state'
                type='text'
                size='lg'
                onChange={(e) => setState(e.target.value)}
                value={state}
              />


              <MDBInput
                wrapperClass='mb-4 mx-5 w-100'
                labelClass='text-white'
                label='Password'
                id='password'
                type='password'
                size='lg'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />

        <button onClick={handleSave} className='btn btn-primary'>
        Save
         </button>

        <br></br>
              <div>
                <p className='mb-0'>
                  Already have an account? <Link to='/' className='text-white-50 fw-bold'>Log In</Link>
                </p>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
  }


export default Login;

