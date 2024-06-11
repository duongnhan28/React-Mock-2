import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import Dashboard from '../views/pages/Dashboard';
import { store } from '../redux/store';
import { setLogin } from '../redux/loginSlice';
import { getAllPolls } from '../redux/pollSlice';
import { getAllUsers } from '../redux/userSlice';
import { BrowserRouter as Router } from 'react-router-dom';

const renderWithProviders = (ui) => {
  return render(
    <Provider store={store}>
      <Router>
        {ui}
      </Router>
    </Provider>
  );
};

describe('Dashboard Component', () => {
  beforeAll(async () => {
    await store.dispatch(getAllPolls());
    await store.dispatch(getAllUsers());
    await store.dispatch(setLogin({ id: 'sarahedo' }));
  });

  it('renders questions correctly', async () => {
    renderWithProviders(<Dashboard />);
    await waitFor(() => {
      const allQuestions = Object.keys(store.getState().polls.polls).length;
      expect(screen.queryAllByText(/Show/i).length).toEqual(allQuestions);
    });
  });

  it('renders question types correctly', async () => {
    renderWithProviders(<Dashboard />);
    await waitFor(() => {
      expect(screen.getByText(/New Questions/i)).toBeInTheDocument();
      expect(screen.getByText(/Completed Questions/i)).toBeInTheDocument();
    });
  });
});
