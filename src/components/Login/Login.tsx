import { useEffect, useState } from 'react';
import { Button } from 'common/Button/Button';
import { Input } from 'common/Input/Input';
import { Link } from 'react-router-dom';
import { ErrorsParam } from 'helpers/Types';
import './Login.css';

export const Login = () => {
  const initialValues = { email: '', password: '', name: '' };
  const [user, setUser] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({ email: '', password: '' });
  const [isSubmit, setIsSubmit] = useState(false);
  const [loginError, setLoginError] = useState('');
  /////////////////////////////////////////////////

  async function login() {
    try {
      const res = await fetch('http://localhost:4000/login', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const content = await res.json();
      console.log(content);

      if (content.successful === true) {
        localStorage.setItem('token', content.result);
        localStorage.setItem('userName', content.user.name);

        window.location.pathname = '/courses';
      } else {
        setLoginError('');
        console.log('Login data is wrong!');
      }
    } catch (error) {
      setLoginError('');
      console.error('Error');
    }
  }
  /////////////////////////////////
  const handleInput = (e: any) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  /////////////////////////////
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setFormErrors(validation(user));
    setIsSubmit(true);
    setUser(initialValues);
  };
  /////////////////////////////
  const validation = (user: ErrorsParam) => {
    const errors = {} as ErrorsParam;
    if (user.email === '') {
      errors.email = 'Email is required.';
    }
    if (user.password.length < 6) {
      errors.password = 'Password must have at least 6 characters. ';
    }
    return errors;
  };
  //////////////////////////////////////////
  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
    }
  }, [formErrors]);
  //////////////////////////////
  return (
    <div className='login-wrapper'>
      <h3 className='login-title'>Login</h3>
      <form className='login-form' onSubmit={handleSubmit}>
        <div className='login-row'>
          <Input
            onChange={handleInput}
            name='email'
            value={user.email}
            type='email'
            required={true}
            labelText='Email'
            className='login-email'
          />
          {formErrors.email && (
            <span style={{ color: 'red' }}>{formErrors.email}</span>
          )}
        </div>
        <div className='login-row'>
          <Input
            onChange={handleInput}
            name='password'
            value={user.password}
            type='password'
            required={true}
            labelText='Password'
            className='login-name'
          />
          {formErrors.password && (
            <span style={{ color: 'red' }}>{formErrors.password}</span>
          )}
        </div>
        <div className='login-row'>
          <Button
            buttonText='LOGIN'
            onClick={login}
            style={{ width: '286px', height: '50px' }}
          />

          <div className='register-link'>
            If you don't have an account you may
            <Link to='/registration'>
              <strong> Registration</strong>
            </Link>
          </div>
        </div>
      </form>
      {loginError && <span>{loginError}</span>}
    </div>
  );
};
