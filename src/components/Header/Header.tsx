import { useNavigate, useLocation } from 'react-router-dom';

import Button from 'common/Button/Button';
import { Logo } from './components/Logo/Logo';
import { getUserName } from 'store/selectors';
import { logoutThunk } from 'store/user/thunk';
import { useAppDispatch, useAppSelector } from 'helpers/hooks';
import './Header.css';

export const Header = () => {
  let token = localStorage.getItem('token');
  const isLoggedIn = !!token;
  const userName = useAppSelector(getUserName);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logoutThunk());
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const hideLogButton =
    location.pathname === '/login' || location.pathname === '/registration';

  return (
    <div className='header'>
      <div className='logo'>
        <Logo />
      </div>
      {!hideLogButton && (
        <div className='right-elements'>
          {isLoggedIn ? (
            <div>
              <div className='userName'>{userName}</div>
              <div className='btn'>
                <Button label='LOGOUT' size='small' onClick={handleLogout} />
              </div>
            </div>
          ) : (
            <div>
              {' '}
              <Button label='LOGIN' size='small' onClick={handleLogin} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
