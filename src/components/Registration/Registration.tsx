import { useState, useEffect } from 'react';
import { Button } from 'common/Button/Button';
import { Input } from 'common/Input/Input';
import { Link } from 'react-router-dom';
import './Registration.css';
import { ErrorsParam } from 'helpers/Types';

export const Registration = () => {
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '' });
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [isSubmit, setIsSubmit] = useState(false);
  ////////////////////////
  async function register() {
    try {
      const res = await fetch('http://localhost:4000/register', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
      const content = await res.json();
      if (content.successful === true) {
        window.location.pathname = '/login';
      }
    } catch (error) {
      console.error('error');
    }
  }

  ///////////////
  const handleInput = (e: any) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };
  ///////////////////////
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setFormErrors(validation(newUser));
    setIsSubmit(true);
  };
  //////////////
  const validation = (newUser: {
    name: string;
    email: string;
    password: string;
  }) => {
    const errors = {} as ErrorsParam;
    if (newUser.name === '') {
      errors.name = 'Name is required.';
    }
    if (newUser.email === '') {
      errors.email = 'Email is required. ';
    }
    if (newUser.password.length < 6) {
      errors.password = 'Password must have at least 6 characters.';
    }
    return errors;
  };
  /////////////////////////
  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
    }
  }, [formErrors]);

  return (
    <div>
      <h3 className='title'>Registration</h3>
      <form className='registration-form' onSubmit={handleSubmit}>
        <div className='reg-row'>
          <Input
            value={newUser.name}
            type='text'
            required={true}
            labelText='Name'
            name='name'
            onChange={handleInput}
            className='regist-name'
          />
          {formErrors.name && (
            <span style={{ color: 'red' }}>{formErrors.name}</span>
          )}
        </div>
        <div className='reg-row'>
          <Input
            value={newUser.email}
            type='email'
            required={true}
            labelText='Email'
            name='email'
            onChange={handleInput}
            className='regist-email'
          />
          {formErrors.email && (
            <span style={{ color: 'red' }}>{formErrors.email}</span>
          )}
        </div>
        <div className='reg-row'>
          <Input
            value={newUser.password}
            type='password'
            required={true}
            labelText='Password'
            name='password'
            onChange={handleInput}
            className='regist-password'
          />
          {formErrors.password && (
            <span style={{ color: 'red' }}>{formErrors.password}</span>
          )}
        </div>
        <div className='reg-row'>
          <Button
            style={{ width: '286px', height: '50px' }}
            buttonText='REGISTRATION'
            onClick={register}
          />
          <div className='login-link'>
            If you have an account you may
            <Link to='/login'>
              <strong> Login</strong>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};
