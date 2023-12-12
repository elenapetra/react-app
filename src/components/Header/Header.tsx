import { useState, useEffect } from 'react';
import Button from 'common/Button/Button';
import { Logo } from './components/Logo/Logo';
import './Header.css';
import { useNavigate, useLocation } from 'react-router-dom';

export const Header = () => {
  const [isLogedIn, setIsLogedIn] = useState(false);

  let token = localStorage.getItem('token');
  const userName = localStorage.getItem('userName');

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setIsLogedIn(!!token);
  }, []);

  const hideLogButton =
    location.pathname === '/login' || location.pathname === '/registration';

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
                  label='LOGOUT'
                  size='small'
                  onClick={() => {
                    localStorage.removeItem('token');
                    navigate('/login');
                  }}
                />
              </div>
            </div>
          ) : (
            <Button
              label='LOGIN'
              size='small'
              onClick={() => navigate('/login')}
            />
          )}
        </div>
      )}
    </div>
  );
};
