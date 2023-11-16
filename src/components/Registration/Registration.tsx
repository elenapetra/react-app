import { Button } from 'common/Button/Button';
import { Input } from 'common/Input/Input';

export const Registration = () => {
  return (
    <div>
      <form>
        <div>
          <Input
            type='text'
            required={true}
            labelText='Name'
            errorMessage='Name is required'
          />
        </div>
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
          style={{ width: '286px', height: '50px' }}
          buttonText='LOGIN'
          onClick={() => console.log('Login button was clicked')}
        />
      </form>

      <div>If you have an account you may Login</div>
    </div>
  );
};
