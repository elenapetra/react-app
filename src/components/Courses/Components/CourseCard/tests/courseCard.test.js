import { render, screen } from '@testing-library/react';
import { CourseCard } from '../CourseCard.tsx';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { getCourseDuration } from 'helpers/getCourseDuration.ts';
import { formatCreationDate } from 'helpers/formatCreationDate.ts';
import * as mockData from 'helpers/mockData.json';

const sampleAuthors = mockData.mockAuthors;
const sampleCourse = mockData.mockCourses[0];
const mockStore = configureStore();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

const renderCourseCard = (initialState = {}) => {
  const store = mockStore({
    authors: [],
    courses: [],
    user: {
      isAuth: false,
      name: '',
      email: '',
      token: '',
      role: '',
    },
    ...initialState,
  });

  render(
    <Provider store={store}>
      <CourseCard course={sampleCourse} authors={sampleAuthors} />
    </Provider>
  );
};

describe('CourseCard', () => {
  it('should display title', () => {
    renderCourseCard();
    const titleElement = screen.getByText(sampleCourse.title);
    expect(titleElement).toBeInTheDocument();
  });

  it('should display description', () => {
    renderCourseCard();
    const descriptionElement = screen.getByText(sampleCourse.description);
    expect(descriptionElement).toBeInTheDocument();
  });

  it('should display duration in the correct format', () => {
    renderCourseCard();
    const formattedDuration = screen.getByText(
      getCourseDuration(sampleCourse.duration)
    );
    expect(formattedDuration).toBeInTheDocument();
  });

  it('should display authors list', () => {
    renderCourseCard({ authors: sampleAuthors });
    const expectedAuthorsList = sampleCourse.authors
      .map((authorId) => {
        const author = sampleAuthors.find((a) => a.id === authorId);
        if (!author) {
          throw new Error(`Author not found for ID ${authorId}`);
        }
        return author.name;
      })
      .join(', ');
    const authorsListElement = screen.getByText(expectedAuthorsList);
    expect(authorsListElement).toBeInTheDocument();
  });

  it('should display created date in the correct format', () => {
    renderCourseCard();
    const formattedCreationDate = screen.getByText(
      formatCreationDate(sampleCourse.creationDate)
    );
    expect(formattedCreationDate).toBeInTheDocument();
  });
});
