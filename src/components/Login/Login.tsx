import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Button from 'common/Button/Button';
import { Input } from 'common/Input/Input';
import { ErrorsParam } from 'helpers/Types';
import { storeUserAction } from 'store/user/actions';
import './Login.css';

export const Login = () => {
  const initialValues = { email: '', password: '', name: '' };
  const [user, setUser] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function login() {
    try {
      const res = await fetch('http://localhost:4000/login', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) {
        if (res.status === 400) {
          throw new Error(
            'Invalid credentials. Please check your username and password.'
          );
        }
      }
      const content = await res.json();
      localStorage.setItem('token', content.result);

      dispatch(
        storeUserAction({
          isAuth: true,
          name: content.user.name,
          email: content.user.email,
          token: content.result,
        })
      );

      navigate('/courses');
    } catch (error: any) {
      setLoginError(error.message);
      if (error.message === 'Failed to fetch') {
        setLoginError(
          'Unable to connect to the server. Please try again later.'
        );
      } else {
        setLoginError(error.message);
      }
    }
  }

  const handleInput = (e: any) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setFormErrors(validation(user));
  };

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
            <span className='login-error'>{formErrors.email}</span>
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
            <span className='login-error'>{formErrors.password}</span>
          )}
        </div>
        <div className='login-row'>
          <Button label='LOGIN' onClick={login} size='extra-large' />
          {/* {!formErrors && <p className='login-error'>{loginError}</p>} */}
          {Object.keys(formErrors).length === 0 && (
            <p className='login-error'>{loginError}</p>
          )}
          <div className='register-link'>
            If you don't have an account you may
            <Link to='/registration'>
              <strong> Registration</strong>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};
