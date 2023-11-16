import { Button } from 'common/Button/Button';
import { Input } from 'common/Input/Input';

export const Login = () => {
  return (
    <div>
      <form action=''>
        <div>
          <Input
            type='email'
            required={true}
            labelText='Email'
            errorMessage='Email is required'
          />
        </div>
        <div>
          <Input
            type='password'
            required={true}
            labelText='Password'
            errorMessage='Password is required'
          />
        </div>
        <Button
          buttonText='LOGIN'
          onClick={() => console.log('LOGIN button was clicked')}
          style={{ width: '286px', height: '50px' }}
        />
      </form>
    </div>
  );
};
