import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { Header } from '../Header';

const mockStore = configureStore([]);
localStorage.setItem('token', '12345');
describe('Header component', () => {
  it('should render logo and user name when logged in', () => {
    const initialState = {
      user: {
        name: 'elena',
        isAuth: true,
      },
    };
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    const logoElement = screen.getByTestId('logo');
    expect(logoElement).toBeInTheDocument();

    const userNameElement = screen.queryByText('elena');
    expect(userNameElement).toBeInTheDocument();
  });

  it('should render logo when not logged in', async () => {
    const initialState = {
      user: {
        name: null,
        isAuth: false,
      },
    };
    const store = mockStore(initialState);

    const { getByAltText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    const logo = getByAltText('logo');
    const name = screen.queryByText('elena');

    expect(logo).toBeInTheDocument();
    expect(name).toBeNull();
  });
});
