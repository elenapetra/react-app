import { useState, useEffect } from 'react';
import { Button } from '../../common/Button/Button';
import { Logo } from './components/Logo/Logo';
import './Header.css';

export const Header = () => {
  const [isLogedIn, setIsLogedIn] = useState(false);
  let token = localStorage.getItem('token');
  const userName = localStorage.getItem('userName');

  const checkLogin = () => {
    if (token) {
      setIsLogedIn(true);
    } else {
      setIsLogedIn(false);
    }
  };
  ///////////////
  useEffect(() => {
    checkLogin();
  }, [isLogedIn]);

  const hideLogButton =
    window.location.pathname === '/login' ||
    window.location.pathname === '/registration';

  return (
    <div className='header'>
      <div className='logo'>
        <Logo />
      </div>

      {!hideLogButton && (
        <div className='right-elements'>
          {isLogedIn ? (
            <div>
              <div className='userName'>{userName}</div>
              <div className='btn'>
                <Button
                  style={{
                    width: '140px',
                    height: '50px',
                  }}
                  buttonText='LOGOUT'
                  onClick={() => {
                    localStorage.removeItem('token');
                    window.location.pathname = '/login';
                  }}
                />
              </div>
            </div>
          ) : (
            <Button
              style={{
                width: '140px',
                height: '50px',
              }}
              buttonText='LOGIN'
              onClick={() => (window.location.pathname = '/login')}
            />
          )}
        </div>
      )}
    </div>
  );
};
