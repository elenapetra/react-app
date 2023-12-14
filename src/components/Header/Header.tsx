import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'common/Button/Button';
import { Logo } from './components/Logo/Logo';
import { removeUserAction } from 'store/user/actions';
import { getUserName } from 'store/selectors';
import './Header.css';

export const Header = () => {
  const [isLogedIn, setIsLogedIn] = useState(false);

  let token = localStorage.getItem('token');
  const userName = useSelector(getUserName);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(removeUserAction());
    navigate('/login');
  };

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
          {isLogedIn && (
            <div>
              <div className='userName'>{userName}</div>
              <div className='btn'>
                <Button label='LOGOUT' size='small' onClick={handleLogout} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
