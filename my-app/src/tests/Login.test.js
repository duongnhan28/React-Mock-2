import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import Login from '../views/pages/Login';
import { store } from '../redux/store';
import { checkLogin } from '../redux/utils/loginAPI';
import { setLogin } from '../redux/loginSlice';

jest.mock('../redux/utils/loginAPI', () => ({
  checkLogin: jest.fn(),
}));

describe('Login Component', () => {
  let component;

  beforeEach(() => {
    checkLogin.mockClear();
    component = render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );
  });

  it('renders the login form correctly', () => {
    const { getByTestId } = component;

    expect(getByTestId('submit-btn')).toBeInTheDocument();
    expect(getByTestId('username')).toBeInTheDocument();
    expect(getByTestId('password')).toBeInTheDocument();
  });

  it('submits the form with valid credentials', async () => {
    const { getByTestId } = component;

    checkLogin.mockResolvedValue(true);

    fireEvent.change(getByTestId('username').querySelector('input'), {
      target: { value: 'sarahedo' },
    });
    fireEvent.change(getByTestId('password').querySelector('input'), {
      target: { value: 'password123' },
    });

    fireEvent.click(getByTestId('submit-btn'));

    await waitFor(() => {
      expect(store.getState().login.authedUser).toEqual('sarahedo');
    });
  });

  it('displays error message for invalid credentials', async () => {
    const { getByTestId, findByText } = component;

    checkLogin.mockResolvedValue(false);

    fireEvent.change(getByTestId('username').querySelector('input'), {
      target: { value: 'test' },
    });
    fireEvent.change(getByTestId('password').querySelector('input'), {
      target: { value: 'test' },
    });

    fireEvent.click(getByTestId('submit-btn'));

    await waitFor(async () => {
      expect(await findByText('Invalid username or password')).toBeInTheDocument();
    });
  });
});
