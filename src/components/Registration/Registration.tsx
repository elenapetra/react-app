import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'common/Button/Button';
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
  const [registerError, setRegisterError] = useState('');

  const navigate = useNavigate();

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

      if (!res.ok) {
        if (res.status === 400) {
          throw new Error(
            'Invalid credentials. Please enter a valid email address'
          );
        }
      }
      const content = await res.json();
      if (content.successful === true) {
        navigate('/login');
      }
    } catch (error: any) {
      setRegisterError(error.message);
      if (error.message === 'Failed to fetch') {
        setRegisterError(
          'Unable to connect to the server. Please try again later.'
        );
      }
    }
  }

  const handleInput = (e: any) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setFormErrors(validation(newUser));
  };

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
            <span className='registration-error'>{formErrors.name}</span>
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
            <span className='registration-error'>{formErrors.email}</span>
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
            <span className='registration-error'>{formErrors.password}</span>
          )}
        </div>
        <div className='reg-row'>
          <Button label='REGISTRATION' onClick={register} size='extra-large' />
          {Object.keys(formErrors).length === 0 && (
            <p className='registration-error'>{registerError}</p>
          )}
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
