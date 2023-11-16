import { Button } from '../../common/Button/Button';
import { Logo } from './components/Logo/Logo';
import './Header.css';

export const Header = () => {
  return (
    <div className='header'>
      <div className='logo'>
        <Logo />
      </div>
      <div className='button'>
        <Button
          style={{
            width: '140px',
            height: '50px',
          }}
          buttonText='SIGN IN'
          onClick={() => console.log('Sign in button was clicked')}
        />
      </div>
    </div>
  );
};
