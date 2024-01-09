import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Courses } from '../Courses';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import { CourseAdd } from 'components/CourseForm/CourseAdd';
import * as mockData from 'helpers/mockData.json';

const sampleAuthors = mockData.mockAuthors;
const sampleCourse = mockData.mockCourses;
const mockStore = configureStore();

const renderCourses = () => {
  const store = mockStore({
    courses: sampleCourse,
    user: {
      isAuth: true,
    },
    authors: sampleAuthors,
  });

  render(
    <Provider store={store}>
      <MemoryRouter>
        <Courses />
      </MemoryRouter>
    </Provider>
  );
};

const renderCourseAdd = (userRole) => {
  const store = mockStore({
    user: {
      isAuth: true,
      role: userRole,
    },
    authors: sampleAuthors,
  });

  render(
    <Provider store={store}>
      <MemoryRouter>
        <CourseAdd />
      </MemoryRouter>
    </Provider>
  );
};

describe('Courses Component', () => {
  it('Displays the correct number of CourseCard components', () => {
    renderCourses();
    const courseCardElements = screen.getAllByTestId('course-card');
    expect(courseCardElements.length).toBe(sampleCourse.length);
  });

  it('Shows CourseForm after clicking "ADD NEW COURSE" button for admin role', async () => {
    renderCourses();
    const addCourseButton = screen.getByText('ADD NEW COURSE');
    fireEvent.click(addCourseButton);

    await waitFor(() => {
      renderCourseAdd('admin');
      expect(screen.getByTestId('course-form')).toBeInTheDocument();
    });
  });

  it('Does not show CourseForm after clicking "ADD NEW COURSE" button for non-admin role', async () => {
    renderCourses();
    const addCourseButton = screen.getByText('ADD NEW COURSE');
    fireEvent.click(addCourseButton);

    await waitFor(() => {
      expect(screen.queryByTestId('course-form')).toBeNull();
    });
  });
});
